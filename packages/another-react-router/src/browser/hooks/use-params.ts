import { useContext } from "react"
import { RouterContext } from "@/browser/components/context"
import { isRouterPathMatcheWithCurrentPath } from "@/browser/utils"
import { type Params } from "@/browser/components"

/**
 * `useParams` is a hook that can be used to get params
 *
 * Params is an object with route's dynamic params filled in by the current URL.
 * And `useParams` help's with giving you current params.
 *
 * [Read more about **dynamic-routing**](https://another-react-router.vercel.app/docs/routing/dynamic-routing/).
 *
 * ### Example
 *
 * Following example uses [@tanstack/react-query](https://tanstack.com/query/latest/docs/framework/react/overview)
 *
 * ```tsx title="/src/routes/user/[id]/page.tsx"
 * import { useQuery } from "@tanstack/react-query"
 * import { useParams } from "another-react-router"
 * import { Spinner } from "@/components/ui/spinner"
 * import { useService } from "@/services/user.service"
 *
 * export default function ProfilePage() {
 * 	const params = useParams()
 * 	const { data: user, isLoading } = useQuery({
 * 		queryKey: ["user", params.id],
 * 		queryFn: () => userService.getById(params.id)
 * 	})
 *
 * 	return isLoading || !user ? (
 * 		<Spinner />
 * 	) : (
 * 		<div className="profile-wrapper">
 * 			<Avatar src={user.avatar} />
 * 			<h2 className="profile-username">{user.username}</h2>
 * 		</div>
 * 	)
 * }
 *```
 *
 * @returns {Params}
 */
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
