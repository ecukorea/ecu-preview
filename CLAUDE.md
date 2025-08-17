# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 React application called "ECU 맛보기" (ECU Preview) - an interactive Bible study application for Christianity learning. The app presents scenario-based questions with multiple choice answers, provides explanations, and includes a gamification system with badges and streaks.

## Development Commands

- `pnpm dev` - Start development server
- `pnpm build` - Build production application  
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint (note: errors ignored during builds via next.config.mjs)

## Architecture & Tech Stack

### Core Technologies
- **Next.js 15** with App Router (`app/` directory structure)
- **React 19** with TypeScript
- **Tailwind CSS 4** with custom design system
- **shadcn/ui** component library with Radix UI primitives
- **Lucide React** for icons
- **pnpm** for package management

### Project Structure
```
app/                    # Next.js App Router
├── layout.tsx         # Root layout with DM Sans font
├── page.tsx           # Main application component
└── globals.css        # Tailwind CSS with custom design system

components/
├── ui/                # shadcn/ui components (40+ components)
└── theme-provider.tsx # next-themes integration

lib/
└── utils.ts           # Tailwind utility functions (cn helper)

hooks/                 # Custom React hooks
public/                # Static assets
```

### Design System
- **Color Scheme**: Custom blue-harmonized color palette matching company branding
- **Typography**: DM Sans font family (400, 500, 600, 700 weights)
- **Theming**: Light/dark mode support via next-themes
- **Components**: Comprehensive shadcn/ui component set including forms, navigation, data display, and overlays

### Application Features
- **Interactive Quiz System**: Scenario-based Christian learning questions
- **Gamification**: Score tracking, streak counters, badge system
- **Progress Tracking**: Visual progress indicators and completion states
- **Responsive Design**: Mobile-first approach with fixed header/footer
- **Korean Language**: All content and UI text in Korean

## Key Configuration

### TypeScript
- Strict mode enabled
- Path aliases: `@/*` maps to project root
- ES6 target with bundler module resolution

### Next.js Configuration
- ESLint and TypeScript errors ignored during builds
- Unoptimized images for static export compatibility

### Styling
- Tailwind CSS 4 with PostCSS integration
- Custom CSS variables for consistent theming
- Extensive design token system in globals.css
- Animation support via tailwindcss-animate and tw-animate-css

## Development Notes

### Component Patterns
- All UI components follow shadcn/ui patterns with Radix UI primitives
- State management via React useState (no external state library)
- Event handlers use consistent naming (handle[Action])
- Conditional styling with clsx/tailwind-merge utility

### Data Structure
- Questions array with scenario, options, correct answers, and explanations
- User progress tracking with score, streak, badges, and level
- Badge system with achievement requirements and notifications

### Styling Conventions
- Use `cn()` utility from lib/utils.ts for conditional classes
- Follow shadcn/ui component API patterns
- Leverage CSS variables for consistent theming
- Mobile-first responsive design approach

## Adding New Features

When extending the application:
1. Follow existing shadcn/ui component patterns
2. Use the established color design system
3. Maintain Korean language consistency
4. Consider mobile-first responsive design
5. Update badge/achievement system if adding gamification features
6. Use existing TypeScript interfaces for type safety