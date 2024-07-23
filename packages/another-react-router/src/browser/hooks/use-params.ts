import { useContext } from "react"
import { RouterContext } from "../components/context"
import { isRouterPathMatcheWithCurrentPath } from "../utils"
import { type Params } from "@/browser/components"

const useParams = (): Params => {
	const { pathname, routesPathnames } = useContext(RouterContext)!
	const params: Params = {}

	const splittedPathname = pathname.split("/").filter(path => path !== "")

	for (const routePathname of routesPathnames) {
		if (isRouterPathMatcheWithCurrentPath(routePathname, pathname)) {
			const splittedRoutePathname = routePathname
				.split("/")
				.filter(path => path !== "")
			splittedRoutePathname.map((path, i) => {
				if (path.startsWith("[") && path.endsWith("]")) {
					// checking if pathg starts with "[..." if so removing 4 letters
					// otherwise 1 because of "["
					const isSpreadRoute = path.startsWith("[...")
					const paramName = path.slice(isSpreadRoute ? 4 : 1, -1)
					params[paramName] = isSpreadRoute
						? splittedPathname.slice(i, splittedPathname.length)
						: splittedPathname[i]
				}
			})
		} else continue
	}

	return params
}

export { useParams }
