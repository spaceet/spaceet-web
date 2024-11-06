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

export const identityTypes = [
	{ label: "Bank Verification Number(BVN)", value: "BVN" },
	{ label: "Driver's License", value: "DRIVERS_LICENSE" },
	{ label: "International Passport", value: "INTERNATIONAL_PASSPORT" },
	{ label: "National Identification Number(NIN)", value: "NIN" },
	{ label: "Permanent Voter's Card(PVC)", value: "VOTERS_CARD" },
]

export const idTypesWithExpiry = ["DRIVERS_LICENSE", "INTERNATIONAL_PASSPORT"]

export const idNumberValidator = {
	BVN: {
		pattern: /^[0-9]{11}$/,
		message: "Please enter a valid BVN",
	},
	DRIVERS_LICENSE: {
		pattern: /^[0-9]{11}$/,
		message: "Please enter a valid driver's license number",
	},
	INTERNATIONAL_PASSPORT: {
		pattern: /^[A-Z0-9]{10}$/,
		message: "Please enter a valid international passport number",
	},
	NIN: {
		pattern: /^[0-9]{11}$/,
		message: "Please enter a valid NIN",
	},
	VOTERS_CARD: {
		pattern: /^[0-9]{11}$/,
		message: "Please enter a valid PVC number",
	},
}
