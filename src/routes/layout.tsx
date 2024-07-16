import { type PropsWithChildren } from "react"

export default function Layout(props: PropsWithChildren) {
	return <div className="text-red-600">{props.children}</div>
}
