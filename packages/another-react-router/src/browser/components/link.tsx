import React from "react"
import { FC } from "react"

export const Link: FC<
	React.DetailedHTMLProps<
		React.AnchorHTMLAttributes<HTMLAnchorElement>,
		HTMLAnchorElement
	>
> = props => <a {...props} />
