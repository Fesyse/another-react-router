import {
	LayoutComponent,
	NotFoundComponent,
	PageComponent
} from "../components"

enum FileType {
	PAGE = "page",
	LAYOUT = "layout",
	NOT_FOUND = "not-found"
}

interface InitRouterOptions<TRoutes = Route[]> {
	/**
	 * Provide routes that you created via cli
	 *
	 * Or if you dont like file based routing provide them by yourself
	 * @example
	 * import { routes } from "@/another-react-router.config.ts"
	 *
	 * {
	 * 	routes: routes
	 * }
	 *
	 * @example
	 * routes: [{
	 *	path: ""
	 * }]
	 */
	routes: TRoutes
}

type Module<Key extends string, Type> =
	| Record<Key, Type>
	| Record<"default", Type>

interface Route {
	path: string
	page: string
	layout?: string
	"not-found"?: string
	useOleg?: boolean
}
interface RouteWithComponents {
	path: string
	page: PageComponent
	layout?: LayoutComponent
	"not-found"?: NotFoundComponent
	useOleg?: boolean
}

interface RawRoute {
	path: string
	page: Promise<Module<"Page", PageComponent>>
	layout?: Promise<Module<"Layout", LayoutComponent>>
	"not-found"?: Promise<Module<"NotFoundPage", NotFoundComponent>>
	useOleg?: boolean
}

export * from "./get-routes-components"
export {
	type InitRouterOptions,
	type Route,
	FileType,
	RouteWithComponents,
	RawRoute
}
