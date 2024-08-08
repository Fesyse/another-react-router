# another-react-router-app

## 1.3.0

### Minor Changes

- 92f8468: nested layouts

## 1.2.5

### Patch Changes

- b49843a: fix typo in README.md file's

## 1.2.4

### Patch Changes

- 50d2145: deploy website to vercel

## 1.2.3

### Patch Changes

- e484e96: `useSearchParams` hook
  `forward` method on `useRouter()` hook
  docs are done

## 1.2.2

### Patch Changes

- 9d59349: Shorten cli name

## 1.2.0

### Minor Changes

Added hooks:

- useRouter
- useParams
- usePathname

Added default not found page
![Example of not-found page](image.png)

improve cli DX
by adding --watch flag to `another-react-router init` command

for example we have vite project with **dev** script in package.json
and there we can modify this script with:
`"dev": "sh -c 'bunx another-react-router init --watch & vite'"`
so now `init --watch` and `vite` runs in parallel

spread routes is now also ready to use

for example we have `/store/[...slug]/` route
and pathname in browser `/store/987/164`, so now params should be

```json
{
  "slug": ["987", "164"]
}
```

and a bunch of some details.

## 1.1.2

### Patch Changes

- 633b7a7: Published to npm, cli init command got --watch flag

## 1.1.1

### Patch Changes

- 5dc00c0: Represents previous release (v1.1.0)
