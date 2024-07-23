import { useContext, useEffect, useState } from "react"
import { RouterContext } from "../components/context"
import { normalizePathname } from "../utils"
import { type InitRouterOptions } from "@/browser"

const useInitRouter = (opts: InitRouterOptions) => {
	const pathname = normalizePathname(window.location.pathname)
	const [currentPath, setCurrentPath] = useState(
		pathname.endsWith("/") ? pathname : pathname + "/"
	)
	const routerContext = useContext(RouterContext)!

	const handlePopState = () => {
		const pathname = normalizePathname(window.location.pathname)
		setCurrentPath(pathname)
		routerContext.setPathname(pathname)
	}

	useEffect(() => {
		window.addEventListener("popstate", handlePopState)
		window.addEventListener("replaceState", handlePopState)
		return () => {
			window.removeEventListener("popstate", handlePopState)
			window.removeEventListener("replaceState", handlePopState)
		}
	}, [])

	useEffect(() => {
		const handlePopState = () => {
			const pathname = normalizePathname(window.location.pathname)
			setCurrentPath(pathname)
			routerContext.setPathname(pathname)
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

	return [currentPath, setCurrentPath] as const
}

export { useInitRouter }
