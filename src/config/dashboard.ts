import {
	RiCalendarCheckLine,
	RiHome8Line,
	RiHotelBedLine,
	RiHotelLine,
	RiMessage2Line,
	RiPsychotherapyLine,
	RiQuestionnaireLine,
	RiSettingsLine,
} from "@remixicon/react"

export const dashboard_links = [
	{
		label: "menu",
		links: [
			{ name: "Dashboard", icon: RiHome8Line, url: "/dashboard" },
			{ name: "Messages", icon: RiMessage2Line, url: "/dashboard/messages" },
			{ name: "Listings", icon: RiHotelBedLine, url: "/dashboard/listings" },
			{ name: "Reservations", icon: RiHotelLine, url: "/dashboard/reservations" },
			{ name: "Calendar", icon: RiCalendarCheckLine, url: "/dashboard/calendar" },
		],
	},
	{
		label: "others",
		links: [
			{ name: "Help Center", icon: RiQuestionnaireLine, url: "/dashboard/" },
			{
				name: "Language & Translation",
				icon: RiPsychotherapyLine,
				url: "/dashboard/language-and-translation",
			},
			{ name: "Settings", icon: RiSettingsLine, url: "/dashboard/settings" },
		],
	},
]
