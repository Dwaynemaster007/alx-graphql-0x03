import React, { ReactNode } from "react";
import * as Sentry from '@sentry/react';

interface State {
    hasError: boolean;
  }
  
  interface ErrorBoundaryProps {
    children: ReactNode;
  }
  
  
  class ErrorBoundary extends React.Component<ErrorBoundaryProps , State> {
    constructor(props: ErrorBoundaryProps) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(): State {
      return { hasError: true };
    }
  
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
      Sentry.captureException(error, { extra: { componentStack: errorInfo.componentStack } });
    }
    render() {
      if (this.state.hasError) {
        return (
          <div className="p-6">
            <h2 className="text-2xl font-semibold">Oops, there is an error!</h2>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 bg-[#45B69C] text-white py-2 px-6 rounded-lg"
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