import { RiLockPasswordLine, RiUserLine } from "@remixicon/react"

import Profile from "./profile"
import Settings from "./settings"

export const user_tabs = [
	{
		label: "Personal Information",
		icon: RiUserLine,
		component: Profile,
	},
	{
		label: "Security",
		icon: RiLockPasswordLine,
		component: Settings,
	},
]
