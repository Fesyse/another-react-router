import { useEffect, useState } from "react"
import { type InitRouterOptions } from "@/browser"

const useInitRouter = (opts: InitRouterOptions) => {
	const pathname = window.location.pathname
	const [currentPath, setCurrentPath] = useState(
		pathname.endsWith("/") ? pathname : pathname + "/"
	)

	const handlePopState = () => {
		const pathname = window.location.pathname
		setCurrentPath(pathname.endsWith("/") ? pathname : pathname + "/")
	}

	useEffect(() => {
		window.addEventListener("popstate", handlePopState)
		return () => {
			window.removeEventListener("popstate", handlePopState)
		}
	}, [])

	useEffect(() => {
		const handlePopState = () => {
			const pathname = window.location.pathname
			setCurrentPath(pathname.endsWith("/") ? pathname : pathname + "/")
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

export { useInitRouter }
