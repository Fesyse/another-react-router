import { useRouter } from "another-react-router"

export default function Page() {
	const router = useRouter()
	return <div onClick={() => router.push("/user/")}>geasdasdy</div>
}
