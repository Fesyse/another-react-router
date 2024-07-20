
// THIS FILE SHOULD NOT BE MODIFIED
// With love by another-react-router developers 💗
import { type RawRoute, getRoutesComponents } from "another-react-router"
import { type FC } from "react"

const rawRoutes: RawRoute[] = [{path:"/",page:import('./src/routes/page.tsx'),layout:import('./src/routes/layout.tsx')},{path:"/user/",page:import('./src/routes/user/page.tsx'),useOleg:true},{path:"/user/[id]/",page:import('./src/routes/user/[id]/page.tsx')}]
const routes = await getRoutesComponents(rawRoutes)

type HrefType = '/' | '/user/' | `/user/${string}/`

declare module "another-react-router" {
	type Link = React.DetailedHTMLProps<
	React.AnchorHTMLAttributes<HTMLAnchorElement>,
	HTMLAnchorElement
> & { href?: HrefType }
}

export { routes }
