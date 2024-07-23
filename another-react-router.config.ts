// THIS FILE SHOULD NOT BE MODIFIED
// With love by another-react-router developers 💗
import { type RawRoute, getRoutesComponents } from "another-react-router"

const rawRoutes: RawRoute[] = [
	{
		path: "/",
		page: import("./src/routes/page.tsx"),
		layout: import("./src/routes/layout.tsx")
	},
	{ path: "/user/", page: import("./src/routes/user/page.tsx"), useOleg: true },
	{ path: "/user/[id]/", page: import("./src/routes/user/[id]/page.tsx") },
	{
		path: "/user/[id]/[...sus]/",
		page: import("./src/routes/user/[id]/[...sus]/page.tsx")
	}
]
const routes = await getRoutesComponents(rawRoutes)

type HrefType =
	| "/"
	| "/user/"
	| `/user/${string}/`
	| `/user/${string}/${string}/`

export { routes, type HrefType }
