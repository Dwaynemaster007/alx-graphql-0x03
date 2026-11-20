# Rick and Morty Episodes (ALX GraphQL 0x03)

A Next.js + TypeScript + Tailwind CSS app that lists Rick and Morty episodes from the public [Rick and Morty GraphQL API](https://rickandmortyapi.com/graphql) with Apollo Client, and shows how to handle runtime errors.

- `graphql/`: the Apollo Client and the `GET_EPISODES` query
- `pages/index.tsx`: paginated episode grid with loading and retry states
- `components/ErrorBoundary.tsx`: catches render errors, shows a fallback and reports them to Sentry
- "Trigger a test error" in the header renders `ErrorProneComponent` so you can see the boundary in action

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

To report errors to Sentry, set `NEXT_PUBLIC_SENTRY_DSN` in `.env.local` (or in Vercel's environment variables). Without it, errors are only shown on the page.
