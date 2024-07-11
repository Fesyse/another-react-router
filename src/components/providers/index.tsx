import type { FC } from "react"
import { AnotherReactRouterProvider } from "./another-react-router-provider"
import { ThemeProvider } from "./theme-provider"

export const Providers: FC = () => {
	return (
		<ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
			<AnotherReactRouterProvider />
		</ThemeProvider>
	)
}
