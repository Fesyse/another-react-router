import { useContext } from "react"
import { RouterContext } from "@/browser/components/context"

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
	const back = () => window.history.back()
	const refresh = () => window.location.reload()

	return { pathname: routerContext.pathname, push, replace, back, refresh }
}

export { useRouter }
