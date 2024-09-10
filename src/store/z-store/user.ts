import Cookies from "js-cookie"

import { createPersistMiddleware } from "@/store/middleware"
import { Maybe, UserProps } from "@/types"

interface UserStore {
	user: Maybe<UserProps>
	signIn: (user: UserProps, token: string) => void
	signOut: (options?: { soft?: boolean }) => void
}

const initialState: UserStore = {
	user: null,
	signIn: () => {},
	signOut: () => {},
}

const useUserStore = createPersistMiddleware<UserStore>("spaceet-user", (set) => ({
	...initialState,
	signIn: (user, token) => {
		set({ user })
		Cookies.set("SPACEET_TOKEN", token, {
			sameSite: "None",
			secure: true,
			expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) /* 30 days */,
		})
	},
	signOut: (options) => {
		try {
			if (options?.soft) {
				set({ user: null })
				Cookies.remove("SPACEET_TOKEN")
			} else {
				set({ user: null })
				Cookies.remove("SPACEET_TOKEN")
				// API call to sign out
			}
		} catch (error) {
		} finally {
			window.localStorage.removeItem("spaceet-user")
			window.location.replace("/signin")
		}
	},
}))

export { useUserStore }
