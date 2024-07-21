import { useRouter } from "another-react-router"

export default function Page() {
	const router = useRouter()

	return <button onClick={() => router.replace("/")}>XUESSO</button>
}
