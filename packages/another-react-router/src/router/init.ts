import { useEffect, useState } from "react"

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

interface Route {
	path: string
	page: string
	layout?: string
	"not-found"?: string
}

const defaultRouterOptions: InitRouterOptions = {
	routes: []
}

/**
 *
 * THIS FUNCTION SHOULD NOT BE USED
 * USE AnotherReactProvider INSTEAD
 */
const useInitRouter = <Options extends InitRouterOptions<Options["routes"]>>(
	opts: Options
) => {
	const [currentPath, setCurrentPath] = useState(window.location.pathname)

	const handlePopState = () => {
		setCurrentPath(window.location.pathname)
	}

	useEffect(() => {
		window.addEventListener("popstate", handlePopState)
		return () => {
			window.removeEventListener("popstate", handlePopState)
		}
	}, [])

	useEffect(() => {
		const handlePopState = () => {
			setCurrentPath(window.location.pathname)
		}

		const handleLinkClick = (e: MouseEvent) => {
			e.preventDefault()
			const target = e.target as HTMLAnchorElement
			if (target && target.href) {
				window.history.pushState(null, "", target.href)
				setCurrentPath(target.pathname)
			}
		}

		window.addEventListener("popstate", handlePopState)

		// Intercept all click events on anchor tags
		document.addEventListener("click", e => {
			if (e.target instanceof HTMLAnchorElement) {
				handleLinkClick(e)
			}
		})

		return () => {
			window.removeEventListener("popstate", handlePopState)
			document.removeEventListener("click", handleLinkClick)
		}
	}, [setCurrentPath])

	return currentPath
}

export { useInitRouter, InitRouterOptions, Route, FileType }
