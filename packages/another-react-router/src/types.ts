import { RouteWithComponents } from "./browser"

type DeepRequired<T> = Required<{
	[P in keyof T]: T[P] extends object | undefined
		? DeepRequired<Required<T[P]>>
		: T[P]
}>

type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any
	? A
	: never

type ObjectValues<T> = T[keyof T]

export { ObjectValues, ArgumentTypes, DeepRequired }
