import {
	RiCheckboxCircleLine,
	RiCloseCircleLine,
	RiHome8Line,
	RiUploadCloud2Line,
	RiUserLine,
	RiVerifiedBadgeLine,
	RiWaterFlashLine,
} from "@remixicon/react"

import {
	Cancellation,
	Finish,
	IdentityVerification,
	Policies,
	Profile,
	PropertyListing,
	UploadPhotos,
	Utilities,
	VerifyProperty,
	Welcome,
} from "@/components/become-a-host"

export const become_a_host = [
	{
		label: "Welcome to Spaccet for Hosts",
		subtitle: "",
		components: [{ name: "Welcome", component: Welcome, icon: RiUserLine }],
	},
	{
		label: "Personal Information",
		subtitle: "Identity Verification Process",
		components: [
			{ name: "Personal Details", component: Profile, icon: RiUserLine },
			{ name: "Verify Identity", component: IdentityVerification, icon: RiVerifiedBadgeLine },
		],
	},
	{
		label: "Property Information",
		subtitle: "Property Lisitng Process",
		components: [
			{ name: "Property Details", component: PropertyListing, icon: RiHome8Line },
			{ name: "Upload Photos", component: UploadPhotos, icon: RiUploadCloud2Line },
			{ name: "Verify Property", component: VerifyProperty, icon: RiVerifiedBadgeLine },
			{ name: "Utilities", component: Utilities, icon: RiWaterFlashLine },
		],
	},
	{
		label: "Apartment Rules and Regulations",
		subtitle: "Policy Information Process",
		components: [
			{ name: "House Rules", component: Policies, icon: RiHome8Line },
			{ name: "Cancellation", component: Cancellation, icon: RiCloseCircleLine },
		],
	},
	{
		label: "Finish",
		subtitle: "",
		components: [{ name: "Finish", component: Finish, icon: RiCheckboxCircleLine }],
	},
]
