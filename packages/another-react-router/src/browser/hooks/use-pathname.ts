import { useContext } from "react"
import { RouterContext } from "@/browser/components/context"

/**
 * `usePathname` is a hook that can be used to get current pathname
 *
 * ### Usage
 *
 * ```tsx
 * import { usePathname } from "another-react-router"
 *
 * export const Component = () => {
 * 	const pathname = usePathname()
 * 	return <div>Current pathname: {pathname}</div>
 * }
 * ```
 *
 * @returns {string}
 */
const usePathname = (): string => {
  const { pathname } = useContext(RouterContext)!

  return pathname
}

export { usePathname }
