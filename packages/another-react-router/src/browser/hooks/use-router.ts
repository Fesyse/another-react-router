import { useContext } from "react"
import { RouterContext } from "@/browser/components/context"

const useRouter = () => {
	const routerContext = useContext(RouterContext)!

	const push = (pathname: string) => {
		return window.history.pushState(
			null,
			"",
			pathname + (pathname.endsWith("/") ? "" : routerContext.pathname)
		)
	}
	const replace = (pathname: string) => {
		return window.history.replaceState(
			null,
			"",
			pathname + (pathname.endsWith("/") ? "" : routerContext.pathname)
		)
	}
	const back = () => window.history.back()
	const refresh = () => window.location.reload()

	return { pathname: routerContext.pathname, push, replace, back, refresh }
}

export { useRouter }
