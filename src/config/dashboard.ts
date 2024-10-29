import {
	RiCalendarCheckLine,
	RiCalendarEventFill,
	RiHome8Line,
	RiHotelBedLine,
	RiHotelLine,
	RiLockPasswordLine,
	RiMessage2Line,
	RiMoneyDollarCircleLine,
	RiPsychotherapyLine,
	RiQuestionnaireFill,
	RiQuestionnaireLine,
	RiSettingsLine,
	RiUserLine,
} from "@remixicon/react"

import { Profile, Security } from "@/components/dashboard/user"

export const dashboard_links = [
	{
		label: "menu",
		links: [
			{ name: "Dashboard", icon: RiHome8Line, url: "/dashboard" },
			{ name: "Messages", icon: RiMessage2Line, url: "/dashboard/messages" },
			{ name: "Listings", icon: RiHotelBedLine, url: "/dashboard/listings" },
			{ name: "Payments", icon: RiMoneyDollarCircleLine, url: "/dashboard/payments" },
			{ name: "Reservations", icon: RiHotelLine, url: "/dashboard/reservations" },
			{ name: "Calendar", icon: RiCalendarCheckLine, url: "/dashboard/calendar" },
		],
	},
	{
		label: "others",
		links: [
			{ name: "Help Center", icon: RiQuestionnaireLine, url: "/dashboard/help-center" },
			{
				name: "Language & Translation",
				icon: RiPsychotherapyLine,
				url: "/dashboard/language-and-translation",
			},
			{ name: "Settings", icon: RiSettingsLine, url: "/dashboard/settings" },
		],
	},
]

export const user_tabs = [
	{ label: "personal information", icon: RiUserLine, component: Profile },
	{ label: "security", icon: RiLockPasswordLine, component: Security },
]

export const quick_actions = [
	{
		label: "Need help?",
		icon: RiQuestionnaireFill,
		url: "/dashboard/help-center",
		content: "As a new Host, you can get access to a well trained support team.",
		text: "Connect me",
	},
	{
		label: "Set up Calendar",
		icon: RiCalendarEventFill,
		url: "/dashboard/calendar",
		content: "Set up your calendar and manage your availability.",
		text: "Get Started",
	},
	{
		label: "Manage Listing",
		icon: RiHotelBedLine,
		url: "/dashboard/listings",
		content: "Manage your listings and add new listings.",
		text: "Manage",
	},
]

export const filters = [
	"all",
	"last 7 days",
	"last 30 days",
	"last 60 days",
	"last 90 days",
] as const
