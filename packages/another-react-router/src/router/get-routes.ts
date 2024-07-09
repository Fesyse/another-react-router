import * as fs from "fs"
import { FileType, type Route } from "./index"

const supportedFileExtensions = ["tsx", "jsx", "js", "ts"] as const

type GetRoutesOptions =
	| {
			routesPath: string
			prevRoutes: Route[]
			originalRoutesPath: string
	  }
	| { routesPath: string }

type GetRoutes = (options: GetRoutesOptions) => Route[]
interface RawRoute {
	fileType: FileType
	file: fs.Dirent
}

function getFileType(fileName: string): FileType | undefined {
	const fileNameSplitted = fileName.split(".")
	const fileExtension =
		fileNameSplitted[fileNameSplitted.length - 1]!.toLowerCase()
	const realFileName = fileNameSplitted[0]

	if (!realFileName) return undefined
	if (!supportedFileExtensions.some(extension => fileExtension === extension))
		return undefined

	const valuesOfFileType = Object.values(FileType)
	const keysOfFileType = Object.keys(FileType) as (keyof typeof FileType)[]
	if (!valuesOfFileType.some(type => type === realFileName)) return undefined

	const indexOfFileType =
		keysOfFileType[valuesOfFileType.findIndex(type => type === realFileName)]

	return indexOfFileType ? FileType[indexOfFileType] : undefined
}

const getRoutes: GetRoutes = options => {
	const routes = "prevRoutes" in options ? options.prevRoutes : []
	const routesPath = options.routesPath
	console.log(routesPath)
	const originalRoutesPath =
		"originalRoutesPath" in options ? options.originalRoutesPath : routesPath!

	const folders: string[] = []
	const routeFiles: RawRoute[] = fs
		.readdirSync(routesPath!, { withFileTypes: true })
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
			`No page component in ${routesPath} directory. Add one or remove directory.`
		)

	const newRoute: Partial<Route> = {}
	routeFiles.map(routeFile => {
		// @ts-expect-error
		const path = routeFile.file.path as string
		newRoute.path = "/" + path.slice(originalRoutesPath.length, path.length - 1)
		newRoute[routeFile.fileType] = path + routeFile.file.name
	})
	routes.push(newRoute as Route)

	folders
		.map(folder => {
			if (folder.startsWith("_")) return
			return getRoutes({
				...options,
				routesPath: routesPath + folder + "\\",
				prevRoutes: routes,
				originalRoutesPath
			})
		})
		.flatMap(routes => routes)

	return routes
}

export { getRoutes }
