import {
	LayoutComponent,
	NotFoundComponent,
	PageComponent
} from "@/browser/components"
import { ObjectValues } from "@/types"

const FILE_TYPE = {
	PAGE: "page",
	LAYOUT: "layout",
	NOT_FOUND: "not-found"
} as const

type FileType = ObjectValues<typeof FILE_TYPE>

interface InitRouterOptions<TRoutes = RouteWithComponents[]> {
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
interface RouteWithComponents<TPath extends string = string> {
	path: TPath
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

export * from "@/shared/get-routes-components"
export {
	type InitRouterOptions,
	type Route,
	FILE_TYPE,
	FileType,
	RouteWithComponents,
	RawRoute
}
