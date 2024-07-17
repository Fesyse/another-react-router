import { FC, PropsWithChildren } from "react"
import React from "react"

const WithOleg: FC<PropsWithChildren<unknown>> = ({ children }) => {
	return (
		<>
			{children}
			<span
				style={{
					position: "absolute",
					bottom: 0,
					right: 0,
					padding: "10px"
				}}
			>
				<img
					src="https://media1.tenor.com/m/DecascyXJsgAAAAC/%D0%BE%D0%BB%D0%B5%D0%B3-%D1%85%D1%83%D0%B9%D0%BB%D0%B0%D0%BD.gif"
					alt="oleg pidoras"
				/>
			</span>
		</>
	)
}

export default WithOleg
