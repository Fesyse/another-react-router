export type DeepRequired<T> = Required<{
	[P in keyof T]: T[P] extends object | undefined
		? DeepRequired<Required<T[P]>>
		: T[P]
}>

export type ArgumentTypes<F extends Function> = F extends (
	...args: infer A
) => any
	? A
	: never
