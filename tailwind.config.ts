import type { Config } from "tailwindcss"

const config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			screens: {
				"2xl": "1200px",
			},
		},
		fontFamily: {
			body: ["var(--body)"],
			heading: ["var(--heading)"],
		},
		extend: {
			backgroundImage: {
				"hero-1": "url('/assets/images/hero-1.webp')",
				"hero-2": "url('/assets/images/hero-2.webp')",
			},
			colors: {
				primary: {
					50: "#fef7ec",
					100: "#eab221",
					200: "#f17b2c",
				},
				neutral: {
					100: "#ffffff",
					200: "#f6f8fa",
					300: "#e2e4e9",
					400: "#cdd0d5",
					500: "#868c98",
					600: "#525866",
					700: "#31353f",
					800: "#161922",
					900: "#0a0d14",
				},
				error: {
					100: "#fdedf0",
					200: "#f8c9d2",
					300: "#df1c41",
					400: "#af1d38",
					500: "#710e21",
				},
				warning: {
					100: "#fef7ec",
					200: "#fbdfb1",
					300: "#f2ae40",
					400: "#b47818",
					500: "#693d11",
				},
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
