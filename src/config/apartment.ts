export const apartment_types = [
	"apartment",
	"bungalow",
	"condominium",
	"condo",
	"detached",
	"semi-detached",
	"duplex",
	"triplex",
	"quadruplex",
	"fivePlus",
	"other",
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
