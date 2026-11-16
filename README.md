# 🚨 ReactGuard: Mastering Error Handling

A robust Next.js application demonstrating advanced error handling techniques using React Error Boundaries, TypeScript, and Sentry integration. Built to ensure application stability by catching runtime errors, providing user-friendly fallbacks, and monitoring issues in production.

[![Next.js](https://img.shields.io/badge/Next.js-13+-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Sentry](https://img.shields.io/badge/Sentry-Error_Tracking-FB4226?style=flat&logo=sentry)](https://sentry.io/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat&logo=node.js)](https://nodejs.org/)

<div align="center">

### 🎯 Catch Errors, Keep Calm, Code On! 🎯

*Resilient applications through masterful error handling.*

[Features](#-key-features) • [Quick Start](#-quick-start) • [Usage](#-usage-guide) • [Structure](#-project-structure)

</div>

---

## 📋 Project Overview

**ReactGuard: Mastering Error Handling** is a Next.js project developed as part of the **ALX ProDev Frontend** curriculum. It focuses on implementing React Error Boundaries to handle JavaScript errors gracefully, integrating Sentry for error monitoring, and providing user-friendly fallback UIs. The project builds on the existing `alx-rick-and-morty-app` by adding robust error handling capabilities, ensuring application stability and improved user experience.

### 🎯 Why Error Handling?

- ✅ **Prevent Crashes**: Catch errors to keep the app running.
- ✅ **User-Friendly**: Display meaningful error messages.
- ✅ **Monitor Issues**: Track errors in production with Sentry.
- ✅ **Recover Gracefully**: Allow users to retry failed operations.
- ✅ **Type Safety**: Leverage TypeScript for reliable code.

---

## 🌟 Key Features

### 🚨 Error Boundary Implementation
- Custom `ErrorBoundary` class component to catch runtime errors.
- Fallback UI with "Try again" functionality for error recovery.
- TypeScript interfaces for type-safe error handling.

### 🔍 Error Monitoring with Sentry
- Integration with Sentry for real-time error tracking.
- Detailed error logging with stack traces and context.
- Production-ready monitoring for debugging.

### 🧪 Error Testing Component
- `ErrorProneComponent` to simulate runtime errors.
- Validates Error Boundary functionality in development.
- Ensures fallback UI and recovery work as expected.

### 📱 Responsive & Stable UI
- Seamless integration with existing Next.js app.
- Maintains responsive design from `alx-rick-and-morty-app`.
- Consistent user experience during error states.

---

## 📁 Project Structure

```
alx-graphql-0x03/
├── alx-rick-and-morty-app/
│   ├── components/
│   │   ├── ErrorBoundary.tsx        # Error Boundary class component
│   │   ├── ErrorProneComponent.tsx   # Test component for error simulation
│   │   └── common/
│   │       └── EpisodeCard.tsx       # Reusable episode card component
│   ├── graphql/
│   │   ├── apolloClient.ts          # Apollo Client configuration
│   │   └── queries.ts               # GraphQL query definitions
│   ├── interfaces/
│   │   └── index.ts                 # TypeScript type definitions
│   ├── pages/
│   │   ├── _app.tsx                 # App wrapper with ErrorBoundary
│   │   └── index.tsx                # Main page with episode list
│   ├── styles/
│   │   └── globals.css              # Global styles with Tailwind
│   ├── public/                      # Static assets
│   ├── next.config.js               # Next.js configuration
│   ├── tsconfig.json                # TypeScript configuration
│   ├── tailwind.config.js           # Tailwind CSS configuration
│   ├── package.json                 # Dependencies and scripts
│   └── README.md                    # Project documentation
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v16 or later)
- **npm** or **yarn**
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Basic understanding of React, TypeScript, and Next.js

### Installation

```bash
# 1️⃣ Clone the repository
git clone https://github.com/Dwaynemaster007/alx-graphql-0x03.git
cd alx-graphql-0x03/alx-rick-and-morty-app

# 2️⃣ Install dependencies
npm install

# 3️⃣ Install Sentry SDK
npm install @sentry/react @sentry/nextjs

# 4️⃣ Run development server
npm run dev
```

### Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

---

## 📖 Usage Guide

### Triggering an Error

1. Navigate to the homepage (`http://localhost:3000`).
2. The `ErrorProneComponent` (integrated in `pages/index.tsx`) throws a test error.
3. The `ErrorBoundary` catches it and displays a fallback UI with "Oops, there is an error!" and a "Try again?" button.

### Recovering from Errors

1. Click the "Try again?" button to reset the error state.
2. The application re-renders the original content if the error is resolved.

### Monitoring Errors

1. Errors are logged to Sentry via the `componentDidCatch` method.
2. Check the Sentry dashboard for detailed error reports, including stack traces and context.

---

## 🛠️ Implementation Details

### Task 0: ErrorBoundary Component

**File:** `components/ErrorBoundary.tsx`

```typescript
import * as Sentry from '@sentry/react';
import { Component, ReactNode } from 'react';

interface State {
  hasError: boolean;
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, State> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    Sentry.captureException(error, { extra: errorInfo });
    console.log({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-800">
          <h2 className="text-2xl font-bold mb-4">Oops, there is an error!</h2>
          <button
            className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
            onClick={() => this.setState({ hasError: false })}
          >
            Try again?
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

**Key Features:**
- Uses `getDerivedStateFromError` to update state when an error occurs.
- Implements `componentDidCatch` for Sentry logging and debugging.
- Provides a responsive fallback UI with a retry button.

---

### Task 1: Wrap Application with ErrorBoundary

**File:** `pages/_app.tsx`

```typescript
import ErrorBoundary from '@/components/ErrorBoundary';
import type { AppProps } from 'next/app';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}

export default MyApp;
```

**Key Features:**
- Wraps the entire application with `ErrorBoundary`.
- Ensures all pages are protected from runtime errors.
- Maintains compatibility with existing Apollo Client setup.

---

### Task 2: ErrorProneComponent for Testing

**File:** `components/ErrorProneComponent.tsx`

```typescript
import { FC } from 'react';

const ErrorProneComponent: FC = () => {
  throw new Error('This is a test error!');
};

export default ErrorProneComponent;
```

**Integration in** `pages/index.tsx`:

```typescript
import ErrorBoundary from '@/components/ErrorBoundary';
import ErrorProneComponent from '@/components/ErrorProneComponent';
import { FC } from 'react';

const Home: FC = () => {
  return (
    <ErrorBoundary>
      <ErrorProneComponent />
    </ErrorBoundary>
  );
};

export default Home;
```

**Key Features:**
- Simulates a runtime error to test `ErrorBoundary`.
- Allows verification of fallback UI and recovery functionality.

---

### Task 3: Sentry Integration

**Sentry Configuration:**

1. Install Sentry SDK:
   ```bash
   npm install @sentry/react @sentry/nextjs
   ```

2. Initialize Sentry in `pages/_app.tsx` or a dedicated config file (follow Sentry’s Next.js documentation).
3. Errors are captured in `ErrorBoundary`’s `componentDidCatch` method and sent to Sentry.

**Key Features:**
- Logs errors with stack traces and component context.
- Enables monitoring via Sentry’s dashboard.
- Supports production-grade error tracking.

---

## 🧪 Testing Checklist

### Error Boundary Functionality
- [ ] `ErrorBoundary` catches errors from `ErrorProneComponent`.
- [ ] Fallback UI displays with "Try again?" button.
- [ ] Clicking "Try again?" resets the error state.

### Sentry Integration
- [ ] Errors are logged to Sentry dashboard.
- [ ] Stack traces and error context are captured correctly.
- [ ] No sensitive data is exposed in logs.

### Application Stability
- [ ] Application remains functional after error recovery.
- [ ] Existing features (e.g., episode list) are unaffected.
- [ ] Responsive design is maintained.

### TypeScript
- [ ] No compilation errors in `ErrorBoundary.tsx`.
- [ ] Interfaces match component requirements.
- [ ] Type safety is enforced across files.

---

## 🎨 UI/UX Design

### Fallback UI Styling

```css
Background: bg-gray-100
Text: text-gray-800
Button: bg-blue-600 (hover: bg-blue-700)
Layout: flex justify-center items-center
```

### Integration with Existing Design

- Matches Tailwind CSS styles from `alx-rick-and-morty-app`.
- Maintains gradient backgrounds and responsive grid.
- Ensures consistent typography and animations.

---

## 🐛 Troubleshooting

### Errors Not Caught
```typescript
// Verify ErrorBoundary is wrapping components
console.log('ErrorBoundary rendered:', this.props.children);
```

### Sentry Not Logging
- Ensure Sentry SDK is initialized correctly.
- Check Sentry dashboard for configuration issues.
- Verify DSN in your environment variables.

### Styling Issues
```bash
# Rebuild Tailwind CSS
npx tailwindcss -i ./styles/globals.css -o ./styles/output.css
```

---

## 🔮 Future Enhancements

- 🔍 **Custom Error Messages**: Tailor messages based on error type.
- 🔄 **Advanced Recovery**: Retry specific components or reload data.
- 📊 **Error Analytics**: Track error frequency and user impact.
- 🛡️ **Authentication Checks**: Secure Sentry logging.
- 📱 **PWA Support**: Enhance offline error handling.

---

## 📚 Learning Resources

- [React Error Boundaries](https://reactjs.org/docs/error-boundaries.html)
- [Sentry Next.js Documentation](https://docs.sentry.io/platforms/javascript/guides/nextjs/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Next.js Documentation](https://nextjs.org/docs)
- [MDN Web Docs - React Component](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement)

---

## 📄 License

This project is part of the **ALX ProDev Frontend Curriculum**.

© 2025 ALX Africa. All rights reserved.

---

## 👨‍💻 Author

**Thubelihle Dlamini (Dwaynemaster007)**  
- GitHub: [@Dwaynemaster007](https://github.com/Dwaynemaster007)

---

<div align="center">

### 💜 Built with Resilience by [Dwaynemaster007](https://github.com/Dwaynemaster007) 💜

*Handle errors like a pro, keep your app unstoppable!* ✨

[![GitHub](https://img.shields.io/badge/GitHub-Dwaynemaster007-181717?style=for-the-badge&logo=github)](https://github.com/Dwaynemaster007)
[![React](https://img.shields.io/badge/React-Master-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)

---

**Tags:** `react` · `nextjs` · `error-handling` · `error-boundary` · `typescript` · `sentry` · `alx-frontend` · `web-development` · `resilient-apps`

</div>