import { createPersistMiddleware } from "@/store/middleware"
import { CountryProps, Currency } from "@/types"

interface GlobalStore {
	currency: Currency
	setCurrency: (currency: Currency) => void
	locale: CountryProps
	setLocale: (locale: CountryProps) => void
}

const initialState: GlobalStore = {
	currency: "NGN",
	setCurrency: () => {},
	locale: {
		language: "English",
		region: "United States",
		code: "en-US",
		flag: "US",
	},
	setLocale: () => {},
}

const useGlobalStore = createPersistMiddleware<GlobalStore>("spaceet-global", (set) => ({
	...initialState,
	setCurrency: (currency) => set({ currency }),
	setLocale: (locale) => set({ locale }),
}))

export { useGlobalStore }
