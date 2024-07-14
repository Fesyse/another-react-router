import { $ } from "bun"
import * as fs from "fs"
import * as nodePath from "path"
import { handleCliError } from "../cli-utils"
import { FileType, type Route } from "./index"

const supportedFileExtensions = ["tsx", "jsx", "js", "ts"] as const

type NeccessaryRoutesOptions = {
	routesPath: string
	cwd: string
}
type GetRoutesOptions =
	| (NeccessaryRoutesOptions & {
			prevRoutes: Route[]
			originalRoutesPath: string
	  })
	| NeccessaryRoutesOptions

type GetRoutes = (options: GetRoutesOptions) => Route[]
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

const getRawRoutes: GetRoutes = options => {
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
				if (file.name.startsWith("_") || file.name.startsWith("dist")) return
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
	const newRoute: Partial<Route> = {}

	// @ts-expect-error
	const path = routeFiles[0]!.file.path as string
	newRoute.path = "/" + path.slice(originalRoutesPath.length, path.length - 1)
	routeFiles.map(routeFile => {
		newRoute[routeFile.fileType] = nodePath
			.join(path, routeFile.file.name)
			.replaceAll("\\", "/")
	})
	routes.push(newRoute as Route)

	// then mapping through all folders in directory
	folders
		.map(folder => {
			return getRawRoutes({
				...options,
				routesPath: routesPath + folder + "/",
				prevRoutes: routes,
				originalRoutesPath
			})
		})
		.flatMap(routes => routes)

	return routes
}

const getRoutes = async (
	routes: Route[],
	routesPath: string
): Promise<Route[]> => {
	return Promise.all(
		routes.map<Promise<Route>>(async route => {
			try {
				// removing old dist folder
				fs.rmdirSync(routesPath + "dist", { recursive: true })

				// we are removing current working directory and page.tsx file path so we can add transpaled js file to dist folder
				const pathWithoutCwd = route.page.slice(routesPath.length)
				const isPathEndsWithSlash =
					pathWithoutCwd.endsWith("/") || pathWithoutCwd.endsWith("\\")
				const pathWithoutLastSlash = pathWithoutCwd.slice(
					0,
					pathWithoutCwd.length - (isPathEndsWithSlash ? 1 : 0)
				)
				// it doesnt starts with slash, be carefull | for example
				// pathToRoute = "" or pathToRoute = "user/"
				let pathToRoute = nodePath
					.normalize(
						pathWithoutCwd.slice(
							0,
							pathWithoutCwd.length -
								"page".length -
								(isPathEndsWithSlash ? 1 : 0) -
								(pathWithoutLastSlash.endsWith("ts") ||
								pathWithoutLastSlash.endsWith("js")
									? ".ts".length
									: ".tsx".length)
						)
					)
					.replaceAll("\\", "/")
				if (pathToRoute.startsWith(".")) pathToRoute = ""

				const outdir = `${routesPath}dist/${pathToRoute}`
				await $`bun build ${route.page} --outdir ${outdir}`.throws(true)
				if (route.layout)
					console.log(`bun build ${route.layout} --outdir ${outdir}`)
				if (route.layout)
					await $`bun build ${route.layout} --outdir ${outdir}`.throws(true)
				if (route["not-found"])
					await $`bun build ${route["not-found"]} --outdir ${outdir}`.throws(
						true
					)

				return {
					path: route.path,
					page: outdir + "page.js",
					layout: route.layout ? outdir + "layout.js" : undefined,
					"not-found": route["not-found"] ? outdir + "not-found.js" : undefined
				}
			} catch (err) {
				handleCliError(err)
				throw err
			}
		})
	)
}

export { getRoutes, getRawRoutes }
