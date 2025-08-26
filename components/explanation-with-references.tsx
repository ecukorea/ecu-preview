"use client"

import { useState } from "react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

interface Reference {
  book: string
  content?: string
}

interface ExplanationWithReferencesProps {
  explanation: string
  references: Reference[]
  className?: string
}

export function ExplanationWithReferences({
  explanation,
  references,
  className = "",
}: ExplanationWithReferencesProps) {
  // Initialize with first reference that has content
  const firstReferenceWithContent = references.find(ref => ref.content && ref.content.trim())
  const [expandedReference, setExpandedReference] = useState<string | null>(
    firstReferenceWithContent?.book || null
  )
  const renderExplanationWithTooltips = () => {
    let processedText = explanation

    // Create a map for quick reference lookup
    const referenceMap = new Map(references.map(ref => [ref.book, ref.content]))

    // Find all Bible references in the explanation text
    const referencePattern = /([가-힣]+서?\s+\d+:\d+(?:-\d+)?)/g

    return processedText.split(referencePattern).map((part, index) => {
      const content = referenceMap.get(part)

      if (content && content.trim()) {
        // This is a Bible reference with content - wrap in tooltip
        return (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              <span className="text-blue-600 hover:text-blue-800 cursor-help underline decoration-dotted underline-offset-2">
                {part}
              </span>
            </TooltipTrigger>
            <TooltipContent className="max-w-sm p-3">
              <div className="space-y-1">
                <div className="font-semibold text-sm">{part}</div>
                <div className="text-xs leading-relaxed">{content}</div>
              </div>
            </TooltipContent>
          </Tooltip>
        )
      } else {
        // Regular text
        return <span key={index}>{part}</span>
      }
    })
  }

  return (
    <div className={className}>
      <p className="text-base text-muted-foreground leading-relaxed mb-3">
        {renderExplanationWithTooltips()}
      </p>
      {references.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium">참고 말씀:</span>{" "}
            {references.map((ref, index) => (
              <span key={index}>
                {ref.content && ref.content.trim() ? (
                  <>
                    {/* Desktop: Tooltip */}
                    <span className="hidden md:inline">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="text-blue-600 hover:text-blue-800 cursor-help underline decoration-dotted underline-offset-2">
                            {ref.book}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-sm p-3">
                          <div className="space-y-1">
                            <div className="font-semibold text-sm">{ref.book}</div>
                            <div className="text-sm leading-relaxed">{ref.content}</div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </span>
                    {/* Mobile: Clickable */}
                    <span className="md:hidden">
                      <button
                        onClick={() =>
                          setExpandedReference(expandedReference === ref.book ? null : ref.book)
                        }
                        className="text-blue-600 hover:text-blue-800 underline decoration-dotted underline-offset-2"
                      >
                        {ref.book}
                      </button>
                    </span>
                  </>
                ) : (
                  <span className="text-muted-foreground">{ref.book}</span>
                )}
                {index < references.length - 1 && " "}
              </span>
            ))}
          </p>
          {/* Expanded content (always visible on mobile, initially shows first reference) */}
          {expandedReference && (
            <div className="md:hidden bg-muted/50 p-3 rounded-lg border">
              <div className="font-semibold text-sm mb-1">{expandedReference}</div>
              <div className="text-sm leading-relaxed">
                {references.find(ref => ref.book === expandedReference)?.content}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}