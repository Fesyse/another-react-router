import type { FC, PropsWithChildren } from "react"
import { ThemeProvider } from "./theme-provider"

export const Providers: FC<PropsWithChildren> = ({ children }) => {
	return (
		<ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
			{children}
		</ThemeProvider>
	)
}
