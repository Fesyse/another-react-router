import React, {
	type FC,
	type PropsWithChildren,
	createContext,
	useState
} from "react"
import { normalizePathname } from "../utils"

type TRouterContextValues = {
	routesPathnames: string[]
	pathname: string
}
type TRouterContextActions = {
	setPathname: (pathname: string) => void
}
type TRouterContext = TRouterContextValues & TRouterContextActions

const RouterContext = createContext<TRouterContext | null>({
	pathname: normalizePathname(window.location.pathname),
	routesPathnames: [],
	setPathname: () => {}
})

type RouterContextProviderProps = {
	routesPathnames: string[]
}

const RouterContextProvider: FC<
	PropsWithChildren<RouterContextProviderProps>
> = ({ children, routesPathnames }) => {
	const [router, setRouter] = useState<TRouterContext>({
		pathname: normalizePathname(window.location.pathname),
		routesPathnames,
		setPathname: () => {}
	})

	const setPathname: TRouterContextActions["setPathname"] = pathname =>
		setRouter({ setPathname, pathname, routesPathnames })

	return (
		<RouterContext.Provider value={{ ...router, setPathname }}>
			{children}
		</RouterContext.Provider>
	)
}

export { RouterContext, RouterContextProvider }
