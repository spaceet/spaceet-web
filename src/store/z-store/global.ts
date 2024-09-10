import { createPersistMiddleware } from "@/store/middleware"
import { Currency } from "@/types"

interface GlobalStore {
	currency: Currency
	setCurrency: (currency: Currency) => void
	language: string
	setLanguage: (language: string) => void
}

const initialState: GlobalStore = {
	currency: "NGN",
	setCurrency: () => {},
	language: "en-US",
	setLanguage: () => {},
}

const useGlobalStore = createPersistMiddleware<GlobalStore>("spaceet-global", (set) => ({
	...initialState,
	setCurrency: (currency: Currency) => set({ currency }),
	setLanguage: (language: string) => set({ language }),
}))

export { useGlobalStore }
