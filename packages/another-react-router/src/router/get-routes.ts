import * as fs from "fs"
import * as nodePath from "path"
import {
	LayoutComponent,
	NotFoundComponent,
	PageComponent
} from "../components"
import { FileType, RawRoute, type Route } from "./index"

const supportedFileExtensions = ["tsx", "jsx", "js", "ts"] as const

type NeccessaryRoutesOptions = {
	routesPath: string
	cwd: string
}
type GetRoutesOptions =
	| (NeccessaryRoutesOptions & {
			prevRoutes: RawRoute[]
			originalRoutesPath: string
	  })
	| NeccessaryRoutesOptions

type GetRawRoutes = (options: GetRoutesOptions) => RawRoute[]
interface RawFileRoute {
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

const getRawRoutes: GetRawRoutes = options => {
	const routes = "prevRoutes" in options ? options.prevRoutes : []
	const routesPath = options.routesPath
	const originalRoutesPath =
		"originalRoutesPath" in options ? options.originalRoutesPath : routesPath!
	nodePath.sep

	const folders: string[] = []
	const routeFiles: RawFileRoute[] = fs
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

	// making sure there always page.tsx file
	if (!routeFiles.some(file => file.fileType === FileType.PAGE))
		throw new Error(
			`No page component in ${routesPath} directory. Add one or remove directory.\nVisit ${process.env.DOCS_WEBSITE_URL}/docs/routing for aditional information.`
		)

	// now we are creating new route
	const newRoute: Partial<RawRoute> = {}

	// @ts-expect-error
	const path = routeFiles[0]!.file.path as string
	newRoute.path = "/" + path.slice(originalRoutesPath.length, path.length - 1)
	routeFiles.map(routeFile => {
		newRoute[routeFile.fileType] = nodePath.join(
			options.cwd,
			path,
			routeFile.file.name
		)
	})
	routes.push(newRoute as RawRoute)

	// then mapping through all folders in directory
	folders
		.map(folder => {
			if (folder.startsWith("_")) return
			return getRawRoutes({
				...options,
				routesPath: routesPath + folder + "\\",
				prevRoutes: routes,
				originalRoutesPath
			})
		})
		.flatMap(routes => routes)

	return routes
}

const getRoutesFromConfig = async <T extends RawRoute[]>(
	routes: T
): Promise<Route[]> => {
	return Promise.all(
		routes.map<Promise<Route>>(async rawRoute => {
			const page = await import(rawRoute.page)
			const layout = rawRoute.layout ? await import(rawRoute.layout) : undefined
			const notFound = rawRoute["not-found"]
				? await import(rawRoute["not-found"])
				: undefined

			const route = {
				path: rawRoute.path,
				page: (page.default ?? page.Page) as PageComponent,
				layout: layout
					? ((layout.default ?? layout.Layout) as LayoutComponent)
					: undefined,
				"not-found": notFound
					? ((notFound.default ?? notFound.NotFoundPage) as NotFoundComponent)
					: undefined
			} satisfies Route

			return route
		})
	)
}

export { getRawRoutes, getRoutesFromConfig }
