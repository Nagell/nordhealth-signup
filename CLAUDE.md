# Claude Instructions - Nordhealth Code Assignment

## Task

"Create a client-side only rendered Nuxt 3 application that allows people to sign up for a product.  
The form should contain fields for email and password, which should be required and show an error if no value is entered.  
The password field should have a way to make the password visible. The user should be able to choose to receive occasional product updates and announcements.  
Once signed up, they should be presented with a success page.

Please use the Nordhealth Design System - VET Theme ([https://nordhealth.design/?theme=vet/]) appropriately!!

Read <https://nordhealth.design/web-components/> to learn how to use the Provet components in Vue. Please, use TypeScript."

---

## Technical Requirements

I'm using SCSS and Nuxt 4 with TypeScript, so please use those technologies.  
Components Overview: <https://nordhealth.design/components/>

### Core Implementation

- **Framework**: Nuxt 4 with client-side rendering (SPA mode)
- **Language**: TypeScript throughout
- **Design System**: Nordhealth VET Theme with proper component integration
- **Form Validation**: Zod schema validation
- **State Management**: Pinia for form state and user data
- **Testing**: E2E tests with Playwright

### Senior-Level Considerations

- **Architecture**: Composable-based architecture for reusability
- **Performance**: Tree-shaking optimized imports, lazy loading
- **Accessibility**: WCAG 2.1 AA compliance with proper ARIA labels
- **Security**: Client-side form validation, XSS prevention
- **UX**: Progressive enhancement, loading states, error boundaries
- **Code Quality**: ESLint + Prettier, TypeScript strict mode
- **Testing Strategy**: Component tests (Vitest) + E2E tests (Playwright)

### Implementation Checklist

- [x] Project setup with proper TypeScript configuration
- [x] ESLint + Prettier configuration with format on save
- [x] Nordhealth Design System integration with VET theme
- [x] Design tokens and CSS custom properties setup
- [x] Responsive layout with proper spacing/typography
- [x] Form validation with Zod schemas
- [x] Password visibility toggle with proper accessibility
- [x] Checkbox for product updates with proper labeling
- [x] Success page with proper routing
- [x] Persisting login state using useLocalStorage from vueUse
- [x] Error handling and user feedback
- [x] Loading states and micro-interactions
- [x] Middleware for preventing unauthorized access
- [x] Footer component with proper styling
- [x] E2E test coverage for signup flow
- [x] Performance optimization and bundle analysis
- [x] Documentation for setup and usage
- [x] (optionally) add translations with i18n
- [ ] (optionally) component tests with Vitest
- [ ] (optionally) add PWA support
- [ ] (optionally) add color themes (vet-dark.scss)

## Development Commands

- `pnpm dev` - Development server
- `pnpm build` - Production build
- `pnpm generate` - Static site generation
- `pnpm test` - Run all tests
- `pnpm test:e2e` - E2E tests
- `pnpm lint` - Code linting
- `pnpm typecheck` - TypeScript checking
