import { useContext } from "react"
import { RouterContext } from "@/browser/components/context"

/**
 * - `router.pathname`: Current URL's pathname
 * - `router.push(pathname: string)`: Pushes new state to [browser history API](https://developer.mozilla.org/docs/Web/API/History_API)
 * - `router.replace(pathname: string)`: Replaces [browser history](https://developer.mozilla.org/docs/Web/API/History_API) state with new one
 * - `router.refresh()`: Refresh the current route.
 * - `router.back()`: Navigate back to the previous route in the browser’s history stack.
 * - `router.forward()`: Navigate forward to the next route in the browser’s history stack.
 *
 * ### Example
 *
 * ```tsx
 * import { useRouter } from "another-react-router"
 * import { Breadcrumbs } from "@/components/ui/breadcrumbs"
 * import { Button } from "@/components/ui/button"
 *
 * function Navigation() {
 * 	const router = useRouter()
 *
 * 	return (
 * 		<nav className="navigation">
 * 			<Breadcrumbs pathname={router.pathname} />
 * 			<Button onClick={() => router.push("/home")}>Home</Button>
 * 			<Button onClick={() => router.push("/about")}>About</Button>
 * 			<Button onClick={() => router.push("/contact")}>Contact</Button>
 * 			<Button onClick={() => router.back()}>Back</Button>
 * 			<Button onClick={() => router.forward()}>Forward</Button>
 * 			<Button onClick={() => router.refresh()}>Refresh</Button>
 * 		</nav>
 * 	)
 * }
 * ```
 */
const useRouter = () => {
  const routerContext = useContext(RouterContext)!

  const push = (pathname: string) => {
    const path =
      pathname + (pathname.endsWith("/") ? "" : routerContext.pathname)

    routerContext.setPathname(path)
    return window.history.pushState(null, "", path)
  }
  const replace = (pathname: string) => {
    const path =
      pathname + (pathname.endsWith("/") ? "" : routerContext.pathname)

    routerContext.setPathname(path)
    return window.history.replaceState(null, "", path)
  }
  const refresh = () => window.location.reload()
  const back = () => window.history.back()
  const forward = () => window.history.forward()

  return {
    pathname: routerContext.pathname,
    push,
    replace,
    refresh,
    back,
    forward,
  }
}

export { useRouter }
