import { useContext } from "react"
import { RouterContext } from "@/browser/components/context"

const useRouter = () => {
	const routerContext = useContext(RouterContext)!

	const push = (pathname: string) => {
		if (pathname.startsWith("/")) return (window.location.href = pathname)
		else return (window.location.href = pathname + routerContext.pathname)
	}
	const back = () => window.history.back()
	const refresh = () => window.location.reload()

	return { pathname: routerContext.pathname, push, back, refresh }
}

export { useRouter }
