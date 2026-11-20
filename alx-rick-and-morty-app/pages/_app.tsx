import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import * as Sentry from "@sentry/react";
import client from "../graphql/apolloClient";
import ErrorBoundary from "../components/ErrorBoundary";
import "../styles/globals.css";

// Errors are reported to Sentry only when a DSN is configured
if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_SENTRY_DSN) {
  Sentry.init({ dsn: process.env.NEXT_PUBLIC_SENTRY_DSN, tracesSampleRate: 0.1 });
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
    </ApolloProvider>
  );
}
