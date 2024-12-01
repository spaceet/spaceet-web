import {
	RiBookMarkedLine,
	RiHeadphoneLine,
	RiHeartLine,
	RiHome3Line,
	RiInstagramLine,
	RiLinkedinLine,
	RiLogoutCircleRLine,
	RiMessage3Line,
	RiNotification3Line,
	RiTwitterXLine,
	RiUserLine,
} from "@remixicon/react"

// import {} from "@/assets/icons"

export const social_links = [
	{ name: "linkedin", url: "https://www.linkedin.com/company/spaceet/", icon: "" },
	{ name: "twitter", url: "https://twitter.com/SpaceetHq", icon: "" },
	{ name: "instagram", url: "https://instagram.com/spaceethq_", icon: "" },
]

export const footer_links = [
	{
		label: "Useful links",
		links: [
			{ name: "Book a Space", url: "/search", icon: null },
			{ name: "Become a Host", url: "/become-a-host", icon: null },
			{ name: "About us", url: "/about-us", icon: null },
		],
	},
	{
		label: "Support",
		links: [
			{ name: "Help center", url: "/help-center", icon: null },
			{ name: "Cancellation policy", url: "/help-center/cancellation-policy", icon: null },
			{ name: "Report an issue", url: "/help-center/report-an-issue", icon: null },
		],
	},
	{
		label: "Socials",
		links: [
			{ name: "X(Twitter)", url: "https://twitter.com/SpaceetHq", icon: RiTwitterXLine },
			{ name: "LinkedIn", url: "https://www.linkedin.com/company/spaceet/", icon: RiLinkedinLine },
			{ name: "Instagram", url: "https://instagram.com/spaceethq_", icon: RiInstagramLine },
		],
	},
]

export const user_links = [
	{ label: "account", url: "/account", icon: RiUserLine },
	{ label: "messaging", url: "/messages", icon: RiMessage3Line },
	{ label: "notifications", url: "/notifications", icon: RiNotification3Line },
	{ label: "my bookings", url: "/bookings", icon: RiBookMarkedLine },
	{ label: "favorites", url: "/favorites", icon: RiHeartLine },
	{ label: "help center", url: "/help-center", icon: RiHeadphoneLine },
	{ label: "logout", icon: RiLogoutCircleRLine },
]

export const unuser_links = [
	{ label: "sign up", url: "/signup", icon: RiUserLine },
	{ label: "sign in", url: "/signin", icon: RiUserLine },
	{ label: "become a host", url: "/become-a-host", icon: RiHome3Line },
	{ label: "help center", url: "/help-center", icon: RiHeadphoneLine },
]
