enum FileType {
	PAGE = "page",
	LAYOUT = "layout",
	NOT_FOUND = "not-found"
}

interface InitRouterOptions {
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
	routes: Route[]
}

interface Route {
	path: string
	page: string
	layout?: string
	"not-found"?: string
}

type InitRouter = (options: InitRouterOptions) => void

const defaultRouterOptions: InitRouterOptions = {
	routes: []
}

const initRouter: InitRouter = opts => {
	const options = { ...defaultRouterOptions, ...opts }
	return options.routes
}

export { initRouter, InitRouterOptions, Route, FileType }
