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
