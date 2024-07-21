import React, {
	type FC,
	type PropsWithChildren,
	createContext,
	useEffect,
	useState
} from "react"

type TRouterContextValues = {
	pathname: string
}
type TRouterContextActions = {
	setPathname: (pathname: string) => void
}
type TRouterContext = TRouterContextValues & TRouterContextActions

const RouterContext = createContext<TRouterContext | null>(null)

const RouterContextProvider: FC<PropsWithChildren> = ({ children }) => {
	const [router, setRouter] = useState<TRouterContext | null>(null)

	const setPathname: TRouterContextActions["setPathname"] = pathname => {
		setRouter({ setPathname, pathname })
	}

	useEffect(
		() => setRouter({ setPathname, pathname: window.location.pathname }),
		[]
	)

	return (
		<RouterContext.Provider value={router}>{children}</RouterContext.Provider>
	)
}

export { RouterContext, RouterContextProvider }
