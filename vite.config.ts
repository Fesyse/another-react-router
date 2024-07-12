import react from "@vitejs/plugin-react"
import path from "path"
import { defineConfig } from "vite"
import dynamicImport from "vite-plugin-dynamic-import"

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), dynamicImport()],
	server: {
		port: 3000
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src")
		}
	}
})
