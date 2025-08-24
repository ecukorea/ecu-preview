#!/bin/bash

set -e  # Exit on any error

# Configuration
S3_BUCKET="${S3_BUCKET:-preview.ecukorea.com}"
AWS_REGION="${AWS_REGION:-ap-northeast-2}"
CLOUDFRONT_DISTRIBUTION_ID="${CLOUDFRONT_DISTRIBUTION_ID:-E43967L3135CV}"
BUILD_DIR="./out"
AWS_PROFILE="${AWS_PROFILE:-personal}"

echo "🚀 Starting deployment for ECU Preview..."

# Set AWS profile
export AWS_PROFILE="$AWS_PROFILE"
echo "🔧 Using AWS profile: $AWS_PROFILE"

# Build the project first
echo "🔨 Building the project..."
if ! pnpm build; then
    echo "❌ Build failed. Please fix build errors first."
    exit 1
fi

# Check if build directory exists
if [ ! -d "$BUILD_DIR" ]; then
    echo "❌ Build directory '$BUILD_DIR' not found after build."
    exit 1
fi

# Check AWS CLI installation
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI is not installed. Please install it first."
    exit 1
fi

# Check AWS credentials
if ! aws sts get-caller-identity &> /dev/null; then
    echo "❌ AWS credentials not configured properly for profile: $AWS_PROFILE"
    exit 1
fi

# Create S3 bucket if it doesn't exist
echo "📦 Checking if S3 bucket exists..."
if ! aws s3api head-bucket --bucket "$S3_BUCKET" 2>/dev/null; then
    echo "🆕 Creating S3 bucket: $S3_BUCKET"
    aws s3api create-bucket \
        --bucket "$S3_BUCKET" \
        --region "$AWS_REGION" \
        --create-bucket-configuration LocationConstraint="$AWS_REGION"
    
    echo "✅ S3 bucket created!"
fi

echo "📦 Syncing files to S3 bucket: s3://$S3_BUCKET"

# Sync files to S3 with proper headers
aws s3 sync "$BUILD_DIR" "s3://$S3_BUCKET" \
    --region "$AWS_REGION" \
    --delete \
    --exclude "*.DS_Store" \
    --cache-control "public,max-age=31536000,immutable" \
    --metadata-directive "REPLACE"

# Set specific cache headers for different file types
echo "🔧 Setting cache headers and content type for HTML files..."
aws s3 cp "s3://$S3_BUCKET" "s3://$S3_BUCKET" \
    --recursive \
    --exclude "*" \
    --include "*.html" \
    --content-type "text/html; charset=utf-8" \
    --cache-control "public,max-age=0,must-revalidate" \
    --metadata-directive "REPLACE"

aws s3 cp "s3://$S3_BUCKET" "s3://$S3_BUCKET" \
    --recursive \
    --exclude "*" \
    --include "*.txt" \
    --content-type "text/plain; charset=utf-8" \
    --cache-control "public,max-age=0,must-revalidate" \
    --metadata-directive "REPLACE"

echo "🔧 Setting cache headers and content type for JSON files..."
aws s3 cp "s3://$S3_BUCKET" "s3://$S3_BUCKET" \
    --recursive \
    --exclude "*" \
    --include "*.json" \
    --content-type "application/json; charset=utf-8" \
    --cache-control "public,max-age=300" \
    --metadata-directive "REPLACE"

echo "🔧 Setting cache headers and content type for JavaScript files..."
aws s3 cp "s3://$S3_BUCKET" "s3://$S3_BUCKET" \
    --recursive \
    --exclude "*" \
    --include "*.js" \
    --content-type "application/javascript; charset=utf-8" \
    --cache-control "public,max-age=31536000,immutable" \
    --metadata-directive "REPLACE"

echo "🔧 Setting cache headers and content type for CSS files..."
aws s3 cp "s3://$S3_BUCKET" "s3://$S3_BUCKET" \
    --recursive \
    --exclude "*" \
    --include "*.css" \
    --content-type "text/css; charset=utf-8" \
    --cache-control "public,max-age=31536000,immutable" \
    --metadata-directive "REPLACE"

echo "🔧 Setting cache headers for images, fonts, and Lottie files..."
aws s3 cp "s3://$S3_BUCKET" "s3://$S3_BUCKET" \
    --recursive \
    --exclude "*" \
    --include "*.png" \
    --include "*.jpg" \
    --include "*.jpeg" \
    --include "*.gif" \
    --include "*.svg" \
    --include "*.webp" \
    --include "*.ico" \
    --include "*.woff" \
    --include "*.woff2" \
    --include "*.lottie" \
    --cache-control "public,max-age=31536000,immutable" \
    --metadata-directive "REPLACE"

echo "✅ Files successfully uploaded to S3!"

# Create CloudFront distribution if not provided
if [ -z "$CLOUDFRONT_DISTRIBUTION_ID" ]; then
    echo "🌐 Creating CloudFront distribution..."
    
    # Create CloudFront distribution
    DISTRIBUTION_CONFIG="{
        \"CallerReference\": \"ecu-preview-$(date +%s)\",
        \"Comment\": \"ECU Preview Static Site Distribution\",
        \"DefaultCacheBehavior\": {
            \"TargetOriginId\": \"S3-$S3_BUCKET\",
            \"ViewerProtocolPolicy\": \"redirect-to-https\",
            \"MinTTL\": 0,
            \"ForwardedValues\": {
                \"QueryString\": false,
                \"Cookies\": {\"Forward\": \"none\"}
            },
            \"TrustedSigners\": {
                \"Enabled\": false,
                \"Quantity\": 0
            }
        },
        \"Origins\": {
            \"Quantity\": 1,
            \"Items\": [{
                \"Id\": \"S3-$S3_BUCKET\",
                \"DomainName\": \"$S3_BUCKET.s3.$AWS_REGION.amazonaws.com\",
                \"S3OriginConfig\": {
                    \"OriginAccessIdentity\": \"\"
                }
            }]
        },
        \"Enabled\": true,
        \"PriceClass\": \"PriceClass_100\",
        \"DefaultRootObject\": \"index.html\",
        \"CustomErrorResponses\": {
            \"Quantity\": 1,
            \"Items\": [{
                \"ErrorCode\": 404,
                \"ResponsePagePath\": \"/index.html\",
                \"ResponseCode\": \"200\",
                \"ErrorCachingMinTTL\": 300
            }]
        }
    }"
    
    CLOUDFRONT_DISTRIBUTION_ID=$(aws cloudfront create-distribution \
        --distribution-config "$DISTRIBUTION_CONFIG" \
        --query 'Distribution.Id' \
        --output text)
    
    echo "✅ CloudFront distribution created: $CLOUDFRONT_DISTRIBUTION_ID"
    echo "⏳ Waiting for CloudFront distribution to deploy..."
    
    aws cloudfront wait distribution-deployed \
        --id "$CLOUDFRONT_DISTRIBUTION_ID"
    
    echo "✅ CloudFront distribution deployed!"
    
    # Save the distribution ID for future use
    echo "📋 CloudFront Distribution ID: $CLOUDFRONT_DISTRIBUTION_ID"
fi

# Invalidate CloudFront if distribution ID is available
if [ -n "$CLOUDFRONT_DISTRIBUTION_ID" ]; then
    echo "🔄 Invalidating CloudFront distribution: $CLOUDFRONT_DISTRIBUTION_ID"
    
    INVALIDATION_ID=$(aws cloudfront create-invalidation \
        --distribution-id "$CLOUDFRONT_DISTRIBUTION_ID" \
        --paths "/*" \
        --query 'Invalidation.Id' \
        --output text)
    
    echo "📋 CloudFront invalidation created: $INVALIDATION_ID"
    echo "⏳ Waiting for invalidation to complete..."
    
    aws cloudfront wait invalidation-completed \
        --distribution-id "$CLOUDFRONT_DISTRIBUTION_ID" \
        --id "$INVALIDATION_ID"
    
    echo "✅ CloudFront invalidation completed!"
fi

# Get URLs
echo ""

if [ -n "$CLOUDFRONT_DISTRIBUTION_ID" ]; then
    CLOUDFRONT_DOMAIN=$(aws cloudfront get-distribution \
        --id "$CLOUDFRONT_DISTRIBUTION_ID" \
        --query 'Distribution.DomainName' \
        --output text 2>/dev/null || echo "")
    
    if [ -n "$CLOUDFRONT_DOMAIN" ]; then
        echo "🌐 CloudFront URL: https://$CLOUDFRONT_DOMAIN"
    fi
fi

echo ""
echo "🎉 ECU Preview deployment completed successfully!"
echo ""
echo "📝 Environment variables for future deployments:"
echo "   export S3_BUCKET=$S3_BUCKET"
echo "   export AWS_REGION=$AWS_REGION"
if [ -n "$CLOUDFRONT_DISTRIBUTION_ID" ]; then
    echo "   export CLOUDFRONT_DISTRIBUTION_ID=$CLOUDFRONT_DISTRIBUTION_ID"
fi
echo "   export AWS_PROFILE=$AWS_PROFILE"