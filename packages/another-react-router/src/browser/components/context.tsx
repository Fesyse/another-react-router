import React, { type FC, type PropsWithChildren, createContext } from "react"
import { normalizePathname } from "@/browser/utils"

type TRouterContextValues = {
  routesPathnames: string[]
  pathname: string
}
type TRouterContextActions = {
  setPathname: (pathname: string) => void
}
type TRouterContext = TRouterContextValues & TRouterContextActions

const RouterContext = createContext<TRouterContext | null>({
  pathname: normalizePathname(
    typeof window === "undefined" ? "/" : window.location.pathname
  ),
  routesPathnames: [],
  setPathname: () => {},
})

type RouterContextProviderProps = {
  pathname: string
  setPathname: React.Dispatch<React.SetStateAction<string>>
  routesPathnames: string[]
}

const RouterContextProvider: FC<
  PropsWithChildren<RouterContextProviderProps>
> = ({ children, ...props }) => {
  return (
    <RouterContext.Provider value={props}>{children}</RouterContext.Provider>
  )
}

export { RouterContext, RouterContextProvider }
