// THIS FILE SHOULD NOT BE MODIFIED
// With love by another-react-router developers 💗
import { type RawRoute, getRoutesFromConfig } from "another-react-router"

const rawRoutes = [
	{
		path: "/",
		page: "D:\\Frontend\\2024\\React\\another-react-router\\src\\routes\\page.tsx"
	}
] as const satisfies RawRoute[]
const routes = await getRoutesFromConfig(rawRoutes)

export { routes }
