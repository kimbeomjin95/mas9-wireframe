# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**MAS9 Wireframe** is a React-based tool for generating wireframes and UI components using Claude AI. Built with Turborepo, it's currently a single-app monorepo structure with shared packages for types, utilities, and UI components.

**Tech Stack:**
- React 18 + TypeScript 5.x
- Material-UI (MUI) v5 for design system
- Vite for build tooling
- Zustand for state management
- React Router v6 for routing
- Supabase for authentication
- Turborepo for monorepo management
- pnpm as package manager (required)

## Common Development Commands

### Development
```bash
# Start development server
pnpm dev                    # All packages
pnpm dev --filter=fr       # Just the fr app
pnpm start:fr              # Alias for fr app

# Build commands  
pnpm build                 # All packages
pnpm build --filter=fr     # Just the fr app
pnpm build:fr              # Alias for fr app
```

### Code Quality
```bash
pnpm lint                  # Lint all packages
pnpm lint:fix              # Auto-fix linting issues
pnpm format                # Format with Prettier
pnpm type-check            # TypeScript type checking
```

### Testing
```bash
pnpm test                  # Run tests (Playwright configured)
node e2e-test.js           # End-to-end tests
node final-test.js         # Final integration tests
```

## Architecture & Structure

### Monorepo Structure
```
apps/
└── fr/                    # Main application (French/Frontend)
    ├── src/
    │   ├── components/     # UI components (auth, layout, wireframe)
    │   ├── pages/         # Page components
    │   ├── services/      # Business logic & API integration
    │   ├── hooks/         # Custom React hooks
    │   ├── store/         # Zustand state management
    │   └── types/         # App-specific TypeScript types
    └── public/

packages/
├── shared-types/          # Common TypeScript definitions
├── shared-utils/          # Utility functions
├── shared-ui/             # Reusable UI components & theme
└── typescript-config/     # Shared TypeScript configurations
```

### Key Architectural Patterns

**Service Layer Pattern:**
- Services in `src/services/` handle business logic
- `supabase.ts` - Authentication and database
- `wireframe.ts` - AI wireframe generation
- `auth.ts` - Authentication logic

**Component Organization:**
- `components/auth/` - Authentication related components
- `components/layout/` - Layout components (AdminHeader, AdminSidebar, AdminLayout)
- `components/wireframe/` - Core wireframe generation UI

**State Management:**
- Zustand store in `src/store/authStore.ts`
- Custom hooks in `src/hooks/` (useAuth, useView)

## Environment Configuration

The project supports both demo mode and production mode:

**Demo Mode** (no API keys required):
```env
VITE_DEMO_MODE="true"
VITE_APP_TITLE="MAS9 Wireframe"
```

**Production Mode**:
```env
VITE_DEMO_MODE="false"
VITE_CLAUDE_API_KEY="your-claude-api-key"
VITE_CLAUDE_API_URL="https://api.anthropic.com/v1/messages"
VITE_SUPABASE_URL="your-supabase-url"
VITE_SUPABASE_ANON_KEY="your-supabase-anon-key"
```

## Build & Deployment

### Vite Configuration
- Base path: `/mas9-wireframe/` (for GitHub Pages)
- Code splitting configured for vendor libraries (React, MUI, etc.)
- Development server on port 3000
- TypeScript strict mode enabled

### Turbo Configuration
- `dev` command runs with cache disabled for hot reloading
- `build` depends on workspace dependencies
- `lint` and `type-check` depend on build completion

### GitHub Pages Deployment
- Automatic deployment via GitHub Actions on main branch push
- SPA routing handled with 404.html fallback
- Production builds to `apps/fr/dist/`

## Authentication System

**Demo Mode Login:**
- Email: `admin@demo.com`
- Password: `123456`

**Production Mode:**
- Uses Supabase authentication
- User data stored in Zustand authStore
- Protected routes via ProtectedRoute component

## Key Components

**WireframeRequestForm** - Main AI generation interface
**CodeDisplay** - Shows generated code with syntax highlighting  
**HistoryPanel** - Manages generation history
**AdminLayout** - Main application layout with sidebar navigation
**AuthInitializer** - Handles authentication state on app startup

## Package Management

- **Required**: pnpm >= 8.0.0, Node.js >= 18.0.0
- Workspace dependencies use `workspace:*` protocol
- Shared packages: @mas9/shared-types, @mas9/shared-utils, @mas9/shared-ui

## Development Notes

- Linting is disabled for TypeScript files in fr app - use `type-check` instead
- The fr app uses workspace dependencies for shared functionality
- Vite dev server includes dependency optimization for core libraries
- Source maps disabled in demo mode for smaller builds