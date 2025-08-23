# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 React application called "ECU 맛보기" (ECU Preview) - an interactive Bible study application for Christianity learning. The app features three distinct interaction types: scenario-based questions with multiple choice answers, branching conversations, and presentation-style slides with Lottie animations. It includes a comprehensive gamification system with badges and streaks.

## Development Commands

- `pnpm dev` - Start development server
- `pnpm build` - Build production application (outputs to `out/` directory for static export)
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint (note: errors ignored during builds via next.config.mjs)
- `pnpm lint:fix` - Run ESLint with automatic fixes
- `pnpm format` - Format code with Prettier
- `pnpm format:check` - Check code formatting with Prettier
- `pnpm type-check` - Run TypeScript type checking without emitting files

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
├── question-component.tsx # Interactive question display component
├── conversation-component.tsx # Conversation-based learning component
├── presentation-component.tsx # Lottie-enhanced presentation slides with advanced UI
└── theme-provider.tsx # next-themes integration

data/
├── index.ts           # Main data export with auto-assigned IDs (currently only presentation data active)
├── presentation.ts    # Romans 8 theological presentation content
├── quiz.ts           # Question-based interactions (commented out in index.ts)
└── conversation.ts   # Branching conversation interactions (commented out in index.ts)

lib/
├── types.ts           # TypeScript interfaces for all interaction types
└── utils.ts           # Tailwind utility functions (cn helper)

public/assets/lottie/  # Lottie animation files for character representations

hooks/                 # Custom React hooks
public/                # Static assets
```

### Design System

- **Color Scheme**: Custom blue-harmonized color palette matching company branding
- **Typography**: DM Sans font family (400, 500, 600, 700 weights)
- **Theming**: Light/dark mode support via next-themes
- **Components**: Comprehensive shadcn/ui component set including forms, navigation, data display, and overlays

### Application Features

- **Three Interaction Types**: Questions, branching conversations, and Lottie-animated presentations
- **Advanced Presentation System**: Toss-inspired slide presentations with multiple Lottie character animations
- **Interactive Learning**: Scenario-based Christian learning with Romans 8 deep theological content
- **Gamification**: Score tracking, streak counters, achievement-based badge system
- **Enhanced UI/UX**: Glass morphism effects, smooth transitions, keyboard navigation
- **Progress Tracking**: Visual progress indicators and completion states
- **Responsive Design**: Mobile-first approach with fixed header/footer
- **Korean Language**: All content and UI text in Korean

## Key Configuration

### TypeScript

- Strict mode enabled
- Path aliases: `@/*` maps to project root
- ES6 target with bundler module resolution

### Next.js Configuration

- **Static Export**: Configured for GitHub Pages deployment with `output: 'export'`
- **Base Path**: `/ecu-preview` for GitHub Pages subdirectory hosting (currently commented out in next.config.mjs)
- **Build Output**: Custom `distDir: 'out'` for static files
- **ESLint and TypeScript**: Errors ignored during builds for deployment flexibility
- **Images**: Unoptimized for static export compatibility
- **Trailing Slash**: Enabled for static hosting compatibility

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

- **InteractionItem**: Union type supporting Question, Conversation, and Presentation types
- **Question Interface**: scenario, friendQuestion, options, correctAnswer, explanation, category, emoji
- **Conversation Interface**: Multi-step dialogue with branching choices and outcomes
- **Presentation Interface**: title, description, chapter, slides with Lottie animation support
- **UserProgress**: score, streak, totalQuestions, correctAnswers, badges, level tracking
- **Badge System**: Achievement-based rewards with specific requirements (First Steps, Bible Scholar, Faithful Learner, Devoted Student)

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

## Key Dependencies

### UI & Styling
- **@radix-ui/react-\***: Comprehensive primitive component library (40+ components)
- **class-variance-authority**: Type-safe variant API for component styling
- **tailwind-merge**: Conflict resolution for Tailwind classes
- **tailwindcss-animate + tw-animate-css**: Enhanced animation support

### Forms & Validation
- **react-hook-form**: Form state management and validation
- **@hookform/resolvers**: Validation resolvers for react-hook-form
- **zod**: TypeScript-first schema validation

### Animation & Media
- **@lottiefiles/dotlottie-react**: Lottie animation rendering for character presentations

### Other Notable Libraries
- **next-themes**: Theme switching functionality (though not actively used in current implementation)
- **lucide-react**: Consistent icon library
- **sonner**: Toast notifications
- **vaul**: Drawer component library
