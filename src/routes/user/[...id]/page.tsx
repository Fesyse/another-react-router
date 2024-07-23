import { useParams } from "another-react-router"

export default function Page() {
	const params = useParams()
	return <div>{JSON.stringify(params)}</div>
}
