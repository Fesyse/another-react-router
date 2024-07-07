import type { FC, PropsWithChildren } from "react"
import { ThemeProvider } from "./theme-provider"

export const Providers: FC<PropsWithChildren> = ({ children }) => {
	return <ThemeProvider>{children}</ThemeProvider>
}
