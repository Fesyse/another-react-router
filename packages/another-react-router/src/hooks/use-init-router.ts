import { useEffect, useState } from "react"
import { type InitRouterOptions } from "../router"

const defaultRouterOptions: InitRouterOptions = {
	routes: []
}

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

export { useInitRouter }
