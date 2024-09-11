import { RiCheckboxCircleLine, RiErrorWarningLine, RiHome7Line, RiUserLine } from "@remixicon/react"

import { Policies, ProfileSetup, PropertyListing, Welcome } from "@/components/become-a-host"

export const become_a_host = [
	{
		label: "Welcome",
		icon: RiCheckboxCircleLine,
		components: [Welcome],
		sublist: [],
	},
	{
		label: "Profile setup",
		icon: RiUserLine,
		components: [ProfileSetup],
		sublist: [],
	},
	{
		label: "Property listing",
		icon: RiHome7Line,
		components: [PropertyListing],
		sublist: ["Details", "Upload Images", "Verify ownership", "Others"],
	},
	{
		label: "Policies",
		icon: RiErrorWarningLine,
		components: [Policies],
		sublist: [],
	},
]
