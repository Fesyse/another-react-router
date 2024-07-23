import { useParams } from "another-react-router"

export default function Page() {
	const params = useParams()
	console.log(params)
	return <div>{JSON.stringify(params)}</div>
}
