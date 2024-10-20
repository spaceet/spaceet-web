export const apartment_types = [
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
		value: "certificateOfOccupancy",
	},
	{
		label: "Registered Deed of Assignment",
		value: "registeredDeedOfAssignment",
	},
	{
		label: "Government Allocation Letter",
		value: "governmentAllocationLetter",
	},
	{
		label: "Gift Deed",
		value: "giftDeed",
	},
	{
		label: "Court Judgment",
		value: "courtJudgment",
	},
]
