# Another react router

[![npm version](https://img.shields.io/npm/v/another-react-router)](https://www.npmjs.com/package/another-react-router)
[![npm downloads](https://img.shields.io/npm/dt/another-react-router)](https://www.npmjs.com/package/another-react-router)
![img](/public/og-image.png)

## Installation

```bash
npm install another-react-router
```

```bash
(bun/yarn/pnpm) add another-react-router
```

## Getting started

Create directory where all of your routes will be located

for example:

```json
{
  "src": {
    "routes": [
      "page.tsx"
    ]
  },
}
```

Create a file with name `page.tsx` and add the following code:

```tsx
// ./src/routes/page.tsx

export default function Page() {
  return <div>Hello another react router!</div>
}
```

Then run our cli to initialize router

```bash
npx arr init
```

Create RouterProvider component for your app

for example:

```tsx
// ./src/components/providers/router-provider.tsx
import { AnotherReactRouterProvider } from "another-react-router"
import { routes } from "../../../another-react-router.config.ts"

export const RouterProvider = () => (
  <AnotherReactRouterProvider routes={routes} />
)
```

Add RouterProvider to your app

```tsx
// ./src/app.tsx
import { RouterProvider } from "@/components/providers/router-provider.tsx"

export const App = () => <RouterProvider />
```

Now your app is ready to go!

## Documentation

See more informations on <https://another-react-router.vercel.app>

## Changelog

See changelog in [CHANGELOG.md](/CHANGELOG.md)
