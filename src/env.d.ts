const envs = [
	"API_URL",
	"APP_URL",
	"GOOGLE_CLIENT_ID",
	"NEXT_PUBLIC_ANALYTICS_ID",
	"NEXT_PUBLIC_API_URL",
	"NEXT_PUBLIC_APP_URL",
	"NEXT_PUBLIC_GOOGLE_CLIENT_ID",
	"NEXT_PUBLIC_GOOGLE_MAPS_KEY",
	"NEXT_PUBLIC_GOOGLE_SECRET",
	"NEXT_PUBLIC_POSTHOG_HOST",
	"NEXT_PUBLIC_POSTHOG_KEY",
	"NEXT_PUBLIC_ENCRYPTION_SECRET_KEY",
	"NEXT_PUBLIC_ENCRYPTION_INTIVECTOR",
	"NODE_ENV",
] as const

type Envs = (typeof envs)[number]

declare global {
	namespace NodeJS {
		interface ProcessEnv extends Record<Envs, string> {
			readonly API_URL: string
			readonly APP_URL: string
			readonly GOOGLE_CLIENT_ID: string
			readonly NEXT_PUBLIC_ANALYTICS_ID: string
			readonly NEXT_PUBLIC_API_URL: string
			readonly NEXT_PUBLIC_APP_URL: string
			readonly NEXT_PUBLIC_GOOGLE_CLIENT_ID: string
			readonly NEXT_PUBLIC_GOOGLE_MAPS_KEY: string
			readonly NEXT_PUBLIC_GOOGLE_SECRET: string
			readonly NEXT_PUBLIC_POSTHOG_HOST: string
			readonly NEXT_PUBLIC_POSTHOG_KEY: string
			readonly NEXT_PUBLIC_ENCRYPTION_SECRET_KEY: string
			readonly NEXT_PUBLIC_ENCRYPTION_INTIVECTOR: string
			readonly NODE_ENV: "test" | "development" | "production"
		}
	}
}

export {}
