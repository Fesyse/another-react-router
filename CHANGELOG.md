# another-react-router-app

## 1.2.0

### Minor Changes

- # Changes

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
