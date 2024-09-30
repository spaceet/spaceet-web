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
		subtitle: "Things to get started. Read our policy",
		image: "/assets/images/house-3d.png",
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
		label: "Your Listing is All Done!",
		image: "/assets/images/listing-done.png",
		subtitle:
			"Thank you for listing your apartment on Spaceet.com, continue to your dashboard to manage your listing.",
		components: [{ name: "Finish", component: Finish, icon: RiCheckboxCircleLine }],
	},
]

export const cancellation_policies = [
	{
		label: "flexible",
		description: "Guests get a full refund if they cancel up to a day before check-in.",
	},
	{
		label: "moderate",
		description: "Guests get a full refund if they cancel up to 5 days before check-in.",
	},
	{
		label: "firm",
		description:
			"Guests get a full refund if they cancel up to 30 days check-in, except in certain cases.",
	},
	{
		label: "Non-refundable",
		description:
			"Flexible: Full refund if canceled before check-in. Non-refundable: 10% off, no refund.",
	},
]
