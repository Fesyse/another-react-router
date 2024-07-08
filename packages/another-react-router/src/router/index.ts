import * as fs from "fs"
import * as path from "path"
import type { DeepRequired } from "../types"

const supportedFileExtensions = ["tsx", "jsx", "js", "ts"] as const
enum FileType {
	PAGE = "page",
	LAYOUT = "layout",
	NOT_FOUND = "not-found"
}

interface InitRouterOptions {
	/**
	 * Specify custom path to your routes
	 * @default "./src/routes/"
	 */
	routesPath?: string
}
interface RawRoute {
	fileType: FileType
	file: fs.Dirent
}
interface Route {
	path: string
	page: string
	layout?: string
	"not-found"?: string
}
type GetRoutes = (
	options: DeepRequired<InitRouterOptions> & { prevRoutes?: Route[] }
) => Route[]
type InitRouter = (options: InitRouterOptions) => void

const defaultRouterOptions: DeepRequired<InitRouterOptions> = {
	routesPath: path.join(__dirname, "./src/routes/")
}

function getFileType(fileName: string): FileType | undefined {
	const fileNameSplitted = fileName.split(".")
	const fileExtension =
		fileNameSplitted[fileNameSplitted.length - 1]!.toLowerCase()
	const realFileName = fileNameSplitted[0]

	if (!supportedFileExtensions.some(extension => fileExtension === extension))
		return undefined

	switch (realFileName) {
		case "page":
			return FileType.PAGE
		case "layout":
			return FileType.LAYOUT
		case "not-found":
			return FileType.NOT_FOUND
		default:
			return undefined
	}
}

const getRoutes: GetRoutes = options => {
	const routes = options.prevRoutes ?? []

	const folders: string[] = []
	const routeFiles: RawRoute[] = fs
		.readdirSync(options.routesPath, { withFileTypes: true })
		.map(file => {
			if (file.isDirectory()) {
				folders.push(file.name)
				return undefined
			}

			const fileType = getFileType(file.name)
			if (!fileType) return undefined
			return { fileType, file }
		})
		.filter(route => !!route)

	if (!routeFiles.some(file => file.fileType === FileType.PAGE))
		throw new Error(
			`No page component in ${options.routesPath} directory. Add one or remove directory.`
		)

	const newRoute: Partial<Route> = {}
	routeFiles.map(routeFile => {
		// @ts-expect-error
		const path = routeFile.file.path as string
		newRoute.path = path
		newRoute[routeFile.fileType] = path + "/" + routeFile.file.name
	})
	routes.push(newRoute as Route)

	const routesFromFolders = folders
		.map(folder =>
			getRoutes({
				...options,
				routesPath: options.routesPath + "/" + folder,
				prevRoutes: routes
			})
		)
		.flatMap(routes => routes)

	return [...routes, ...routesFromFolders]
}

const initRouter: InitRouter = opts => {
	const options = { ...defaultRouterOptions, ...opts }
	options.routesPath = path.join(__dirname, options.routesPath)
	const routes = getRoutes(options)
	console.log(routes)
	return routes
}

export { initRouter }
