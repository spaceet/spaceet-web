export const apartment_types = [
	"all",
	"bungalow",
	"condo",
	"detached",
	"duplex",
	"semi-detached",
	"hotel",
	"villa",
] as const

export const proofOfOwnership = [
	{
		label: "Certificate of Occupancy (C of O)",
		value: "CERTIFICATE_OF_OCCUPANCY",
	},
	{
		label: "Registered Deed of Assignment",
		value: "REGISTERED_DEED_OF_ASSIGNMENT",
	},
	{
		label: "Government Allocation Letter",
		value: "GOVERNMENT_ALLOCATION_LETTER",
	},
	{
		label: "Gift Deed",
		value: "GIFT_DEED",
	},
	{
		label: "Court Judgment",
		value: "COURT_JUDGEMENT",
	},
	{
		label: "Electricity  Bill",
		value: "ELECTRICITY_BILL",
	},
	{
		label: "Waste Bill",
		value: "WASTE_BILL",
	},
]

export type ProofOfOwnershipProps = (typeof proofOfOwnership)[number]["value"] | (string & {})
