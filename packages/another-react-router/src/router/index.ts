import * as fs from "fs"
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
	notFound?: string
}
type GetRoutes = (
	options: DeepRequired<InitRouterOptions> & { prevRoutes?: Route[] }
) => Route[]
type InitRouter = (options: DeepRequired<InitRouterOptions>) => void

const defaultRouterOptions: DeepRequired<InitRouterOptions> = {
	routesPath: "./src/routes/"
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

	// TODO: add nesseccary properties to new route
	// @ts-ignore
	const newRoute: Route = {}

	routeFiles.map(routeFile => {
		switch (routeFile.fileType) {
			case FileType.PAGE:
				newRoute.path = routeFile.file.name
		}
	})

	return []
}

const initRouter: InitRouter = (options = defaultRouterOptions) => {
	const routes = getRoutes(options)
}

export {}
