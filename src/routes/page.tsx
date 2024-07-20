import { useState } from "react"

export default function HomePage() {
	const [count, setCount] = useState(0)

	return (
		<div>
			<button onClick={() => setCount(p => p + 1)}>Count: {count}</button>
		</div>
	)
}
