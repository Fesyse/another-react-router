import React from "react"

export const NotFound = () => {
	return (
		<div>
			<link
				href="https://fonts.googleapis.com/css?family=Poppins:100,100italic,200,200italic,300,300italic,regular,italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic"
				rel="stylesheet"
			/>
			<div
				style={{
					width: "100vw",
					height: "100vh",
					display: "flex",
					justifyContent: "center",
					alignItems: "center"
				}}
			>
				<h1
					style={{
						fontSize: "1.75rem",
						display: "flex",
						alignItems: "center",
						gap: "0.75rem",
						fontFamily: "Poppins"
					}}
				>
					<span
						style={{
							fontWeight: "bold",
							fontSize: "2rem"
						}}
					>
						404
					</span>
					<div
						style={{
							width: "1px",
							height: "3rem",
							backgroundColor: "rgba(255, 255, 255, 0.5)"
						}}
					/>
					This page could not be found.
				</h1>
			</div>
		</div>
	)
}
