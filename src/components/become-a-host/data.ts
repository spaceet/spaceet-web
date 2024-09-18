import { Home3d, Rules3d, User3d } from "@/assets/svg"

export const getting_started = [
	{
		label: "Your personal information",
		content:
			"To start as a host, you'll need your personal details like your full name, profile picture, contact information, and a means of verification for identity checks (either NIN or BVN)",
		icon: User3d,
	},
	{
		label: "Apartment/Property",
		content:
			"You'll also need an apartment or property ready for guests, complete with essential amenities like clean bedding, towels, Wi-Fi, and a kitchen. Ensure you have the full address of your property.",
		icon: Home3d,
	},
	{
		label: "Bank Information",
		content:
			"Lastly, set up your bank account information to receive payments directly from the platform.",
		icon: Rules3d,
	},
]

export const identity_types = [
	{ label: "Bank Verification Number(BVN)", value: "bankVerificationNumber" },
	{ label: "Driver's License", value: "driversLicense" },
	{ label: "International Passport", value: "internationlPassport" },
	{ label: "National Identification Number(NIN)", value: "nationalIdentificationNumber" },
	{ label: "Permanent Voter's Card(PVC)", value: "permanentVotersCard" },
]
