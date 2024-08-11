import { useContext } from "react"
import { RouterContext } from "@/browser/components/context"

/**
 *
 * `useSearchParams` return's [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) class.
 * So you can manipulate with them however you want.
 *
 * ### Example
 *
 * ```tsx
 * import { useSearchParams } from "another-react-router"
 *
 * export const ExampleComponent = () => {
 * 	const searchParams = useSearchParams()
 *
 * 	return (
 * 		<div>
 * 			<h1>Search Params:</h1>
 * 			<ul>
 * 				{Array.from(searchParams.entries()).map(([key, value]) => (
 * 					<li key={key}>
 * 						{key}: {value}
 * 					</li>
 * 				))}
 * 			</ul>
 * 		</div>
 * 	)
 * }
 * ```
 *  *
 * @returns {URLSearchParams}
 */
export const useSearchParams = (): URLSearchParams => {
  const { pathname } = useContext(RouterContext)!

  return new URLSearchParams(pathname)
}
