// import posthog from "posthog-js"

// const isDevelopment = process.env.NODE_ENV === "development"
const isBrowser = typeof window !== "undefined"

const config = {
	posthong_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
	posthong_key: process.env.NEXT_PUBLIC_POSTHOG_KEY,
}

if (isBrowser && config.posthong_key) {
	// posthog.init(config.POSTHOG_KEY, {
	// 	api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://app.posthog.com",
	// 	loaded: (posthog) => {
	// 		if (isDevelopment) posthog.debug()
	// 	},
	// })
}

interface Window {
	gtag?: any
	dataLayer?: any
}

declare var window: Window & typeof globalThis

const analytics = {
	track(event: string, properties?: object) {
		if (typeof window === "undefined" || !event) {
			return
		}

		if (typeof window.gtag !== "undefined") {
			window.gtag("event", event, {
				event_category: "engagement",
				event_label: "web",
				value: {
					...properties,
				},
			})
		}

		if (typeof window.dataLayer !== "undefined") {
			window.dataLayer.push({
				event: event,
				data: { ...properties },
			})
		}

		// posthog.capture(event, properties);
	},
	pageView(path: string) {
		if (typeof window === "undefined") {
			return
		}

		if (typeof window.dataLayer !== "undefined") {
			window.dataLayer.push({
				event: "page_view",
				page: path,
			})
		}

		if (typeof window.gtag !== "undefined") {
			window.gtag("config", process.env.NEXT_PUBLIC_ANALYTICS_ID, {
				page_path: path,
			})
		}

		// posthog?.capture('$pageview');
	},
	error(err: { message: string }, fatal: boolean = false) {
		if (!process.env.BROWSER) {
			return
		}

		if (typeof window.gtag !== "undefined") {
			window.gtag("event", "exception", {
				description: err.message,
				fatal: fatal,
			})
		}
	},
}

export { analytics }
