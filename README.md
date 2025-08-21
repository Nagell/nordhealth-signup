<a id="readme-top"></a>
<br />
<div align="center">
  <h3 align="center">Nordhealth Code Assignment</h3>

  <p align="center">
    A client-side rendered Nuxt 4 application for product signup using Nordhealth Design System
    <br />
    <br />
    <a href="#getting-started"><strong>Get Started »</strong></a>
    <br />
    <br />
    <a href="#features">Features</a>
    ·
    <a href="#testing">Testing</a>
    ·
    <a href="#architecture">Architecture</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#built-with">Built With</a></li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#development">Development</a></li>
    <li><a href="#testing">Testing</a></li>
    <li><a href="#architecture">Architecture</a></li>
    <li><a href="#performance">Performance</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

This is a **Senior Frontend Engineer** level implementation of a product signup application built with Nuxt 4, TypeScript, and the Nordhealth Design System. The project demonstrates modern web development practices including composable-based architecture, comprehensive testing, accessibility compliance, and performance optimization.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Key Highlights

- **Design System Integration**: Full implementation of Nordhealth VET Theme
- **Accessibility First**: WCAG 2.1 AA compliance with proper ARIA labels
- **Security Focused**: Client-side validation, Vue template escaping
- **Performance Optimized**: Tree-shaking, lazy loading, bundle optimization
- **Comprehensive Testing**: E2E tests with Playwright + component tests with Vitest (planned)
- **Maintainable Architecture**: Composable-based, type-safe, maintainable code structure
- **Code Quality**: Husky git hooks with pre-commit linting and type checking

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Planned Features

- **PWA Support**: Progressive Web App capabilities for offline functionality
- **Dark Theme**: VET dark theme implementation based on user preferences

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Built With

- [![Nuxt][nuxt-shield]][nuxt-url]
- [![TypeScript][typescript-shield]][typescript-url]
- [![Vue][vue-shield]][vue-url]
- [![Pinia][pinia-shield]][pinia-url]
- [![Playwright][playwright-shield]][playwright-url]
- [![Vitest][vitest-shield]][vitest-url]
- [![Zod][zod-shield]][zod-url]
- [![Nordhealth Design System][nordhealth-shield]][nordhealth-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **pnpm** (recommended package manager)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd nordhealth-signup
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Start the development server**

   ```bash
   pnpm dev
   ```

4. **Open your browser**

   Navigate to `http://localhost:3000` to view the application

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Development

```bash
# Start development with hot reload
pnpm dev

# Run linting and type checking
pnpm lint && pnpm typecheck

# Format code
pnpm format

# Build and preview production
pnpm build && pnpm preview
```

> [!NOTE]  
> Git Hooks: The project uses Husky for git hooks.  
> Pre-commit hooks will automatically run linting and type checking before each commit to ensure code quality.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Testing

### 🎭 E2E Testing with Playwright

#### Initial Setup (Required)

Before running E2E tests for the first time, you need to install Playwright browsers:

```bash
# Install Playwright browsers (required for first run)
npx playwright install

# Alternative: Install specific browsers only
npx playwright install chromium firefox webkit
```

#### Running E2E Tests

```bash
# Run all E2E tests
pnpm test:e2e

# Run tests with UI mode (visual test runner)
pnpm test:e2e:ui

# Run specific test file
npx playwright test tests/e2e/signup-form.spec.ts

# Run tests in specific browser
npx playwright test --project=chromium

# Run tests in headed mode (see browser)
npx playwright test --headed

# Debug tests with step-by-step execution
npx playwright test --debug
```

#### E2E Test Coverage

- ✅ **Signup Flow**: Complete user registration process
- ✅ **Form Validation**: Email/password validation scenarios  
- ✅ **Password Toggle**: Visibility functionality testing
- ✅ **Navigation**: Page routing and middleware protection
- ✅ **Success Page**: Post-signup confirmation flow
- ✅ **Responsive Design**: Mobile and desktop viewports
- ✅ **Accessibility**: ARIA labels and keyboard navigation

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### 🧪 Unit Testing with Vitest (planned)

```bash
# Run unit tests
pnpm test

# Run tests with UI
pnpm test:ui

# Run tests in watch mode
npx vitest --watch

# Run with coverage
npx vitest --coverage
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### 📊 Test Reports

After running E2E tests, view the HTML report:

```bash
npx playwright show-report
```

The report will be available at `playwright-report/index.html`

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Architecture

### 🏗️ Project Structure

```
app/
├── assets/           # Fonts, images, and global styles
├── components/       # Reusable Vue components
│   └── forms/       # Form-specific components
├── composables/     # Vue 3 composables for shared logic
├── layouts/         # Application layouts
├── middleware/      # Route middleware
├── pages/           # File-based routing pages
├── plugins/         # Nuxt plugins
├── schemas/         # Zod validation schemas
└── stores/          # Pinia state management
```

### 🧩 Key Architectural Decisions

**Composable-Based Architecture**

- Reusable business logic extracted into composables
- Type-safe validation with Zod schemas
- Centralized state management with Pinia

**Client-Side Rendering (SPA)**

- Optimized for interactivity and user experience
- Static generation ready for deployment

**Design System Integration**

- Nordhealth components with proper TypeScript support
- Custom element registration for web components
- VET theme implementation with CSS custom properties

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Performance

### ⚡ Optimization Features

- **Tree Shaking**: Optimized imports reduce bundle size
  
- **Static Generation**: Pre-rendered pages for fast loading
- **CSS Optimization**: Scoped styles and CSS custom properties

### 📈 Bundle Analysis

```bash
# Analyze bundle size
pnpm build && npx nuxi analyze
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
[nuxt-shield]: https://img.shields.io/badge/Nuxt-00DC82?style=for-the-badge&logo=nuxt.js&logoColor=white
[nuxt-url]: https://nuxt.com
[typescript-shield]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[typescript-url]: https://typescriptlang.org
[vue-shield]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D
[vue-url]: https://vuejs.org
[playwright-shield]: https://img.shields.io/badge/Playwright-45ba4b?style=for-the-badge&logo=Playwright&logoColor=white
[playwright-url]: https://playwright.dev
[vitest-shield]: https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white
[vitest-url]: https://vitest.dev
[pinia-shield]: https://img.shields.io/badge/Pinia-yellow?style=for-the-badge&logo=data
[pinia-url]: https://pinia.vuejs.org
[zod-shield]: https://img.shields.io/badge/Zod-000000?style=for-the-badge&logo=zod&logoColor=3068B7
[zod-url]: https://zod.dev
[nordhealth-shield]: https://img.shields.io/badge/Nordhealth-Design_System-1f0849?style=for-the-badge
[nordhealth-url]: https://nordhealth.design
