import type { FC, PropsWithChildren } from "react"
import { AnotherReactRouterProvider } from "./another-react-router-provider"
import { ThemeProvider } from "./theme-provider"

export const Providers: FC<PropsWithChildren> = ({ children }) => {
	return (
		<AnotherReactRouterProvider>
			<ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
				{children}
			</ThemeProvider>
		</AnotherReactRouterProvider>
	)
}
