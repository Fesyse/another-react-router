
// THIS FILE SHOULD NOT BE MODIFIED
// With love by another-react-router developers 💗
import { type RawRoute, getRoutesComponents } from "another-react-router"

const rawRoutes = [{path:"/",page:import('./src/routes/page.tsx'),layout:import('./src/routes/layout.tsx'),useOleg:true}] as const satisfies RawRoute[]
const routes = await getRoutesComponents(rawRoutes)

export { routes }
