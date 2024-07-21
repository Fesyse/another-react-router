import { useContext } from "react"
import { RouterContext } from "../components/context"
import { isRouterPathMatcheWithCurrentPath } from "../utils"
import { type Params } from "@/browser/components"

const useParams = (): Params => {
	const { pathname, routesPathnames } = useContext(RouterContext)!
	const params: Params = {}

	const splittedPathname = pathname.split("/")

	for (const routePathname of routesPathnames) {
		if (isRouterPathMatcheWithCurrentPath(routePathname, pathname)) {
			const splittedRoutePathname = routePathname.split("/")
			splittedRoutePathname.map((path, i) => {
				if (path.startsWith("[") && path.endsWith("]")) {
					// checking if pathg starts with "[..." if so removing 4 letters
					// otherwise 1 because of "["
					const paramName = path.slice(path.startsWith("[...") ? 4 : 1, -1)
					params[paramName] = splittedPathname[i]
				}
			})
		} else continue
	}

	return params
}

export { useParams }
