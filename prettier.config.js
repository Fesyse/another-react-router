/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
	semi: false,
	trailingComma: "none",
	tabWidth: 2,
	useTabs: false,
	singleQuote: false,
	arrowParens: "avoid",
	importOrder: [
		"<THIRD_PARTY_MODULES>",
		"^@/providers/(.*)$",
		"^@/constants/(.*)$",
		"^@/types/(.*)$",
		"^@/assets/(.*)$",
		"^@/config/(.*)$",
		"^@/store/(.*)$",
		"^@/hooks/(.*)$",
		"^@/utils/(.*)$",
		"^@/api/(.*)$",
		"(.scss)$",
		"^@/components/(.*)$",
		"^@/layout/(.*)$",
		"^@/ui/(.*)$",
		"^../(.*)",
		"^./(.*)"
	],
	importOrderSortSpecifiers: true,
	plugins: [
		"prettier-plugin-tailwindcss",
		"@trivago/prettier-plugin-sort-imports"
	]
}

export default config
