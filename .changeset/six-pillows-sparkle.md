---
"another-react-router-app": minor
---

# Changes

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
