import {
	RemixiconComponentType,
	RiCarLine,
	RiFirefoxFill,
	RiFireLine,
	RiFirstAidKitLine,
	RiFridgeLine,
	RiHome8Line,
	RiHomeOfficeLine,
	RiHomeWifiLine,
	RiKeyboardLine,
	RiKnifeLine,
	RiTShirtAirLine,
	RiSunLine,
	RiSurroundSoundLine,
	RiTvLine,
	RiVideoLine,
	RiVidiconLine,
	RiWaterFlashLine,
	RiWheelchairLine,
	RiWifiLine,
	RiZcoolLine,
} from "@remixicon/react"

import { AirConditioner, Bath, Dumbells, Gamepad, Swimming } from "@/assets/svg"
import { AmenitiesIconName, UsableAmenitiesProps } from "@/types"

export const icons: Record<
	AmenitiesIconName,
	React.FC<React.SVGProps<SVGSVGElement>> | RemixiconComponentType
> = {
	"air-conditioner": AirConditioner,
	"beach-access": RiHome8Line,
	"bbq-grill": RiKnifeLine,
	"dedicated-kitchen": RiFirefoxFill,
	"fire-alarm": RiFireLine,
	"fire-extinguisher": RiFireLine,
	"fire-pit": RiFireLine,
	"first-aid-kit": RiFirstAidKitLine,
	"gas-cooker": RiWaterFlashLine,
	gym: Dumbells,
	"handicap-accessible": RiWheelchairLine,
	"hot-tub": Bath,
	"lake-access": RiWaterFlashLine,
	"parking-space": RiCarLine,
	patio: RiHomeWifiLine,
	piano: RiKeyboardLine,
	ps5: Gamepad,
	refrigerator: RiFridgeLine,
	"security-system": RiVidiconLine,
	"smoke-alarm": RiZcoolLine,
	"snooker-table": RiHome8Line,
	"sound-system": RiSurroundSoundLine,
	"swimming-pool": Swimming,
	"streaming-services": RiVideoLine,
	television: RiTvLine,
	"washing-machine": RiTShirtAirLine,
	"water-heater": RiSunLine,
	wifi: RiWifiLine,
	workspace: RiHomeOfficeLine,
}

export const amenities_list = [
	"air-conditioner",
	"beach-access",
	"bbq-grill",
	"dedicated-kitchen",
	"fire-alarm",
	"fire-extinguisher",
	"fire-pit",
	"first-aid-kit",
	"gas-cooker",
	"gym",
	"handicap-accessible",
	"hot-tub",
	"lake-access",
	"parking-space",
	"patio",
	"piano",
	"ps5",
	"refrigerator",
	"security-system",
	"smoke-alarm",
	"snooker-table",
	"sound-system",
	"swimming-pool",
	"streaming-services",
	"television",
	"washing-machine",
	"water-heater",
	"wifi",
	"workspace",
] as const

export const usable_amenities_list: UsableAmenitiesProps[] = [
	{
		class: "Basic Utilities",
		amenities_list: [
			{ name: "Dedicated Kitchen", icon: "dedicated-kitchen" },
			{ name: "Televison", icon: "television" },
			{ name: "Air Conditioner", icon: "air-conditioner" },
			{ name: "Water Heater", icon: "water-heater" },
			{ name: "Washing Machine", icon: "washing-machine" },
			{ name: "Parking Space", icon: "parking-space" },
			{ name: "Fire Alarm", icon: "fire-alarm" },
			{ name: "First Aid Kit", icon: "first-aid-kit" },
			{ name: "Gas Cooker", icon: "gas-cooker" },
			{ name: "Smoke Alarm", icon: "smoke-alarm" },
			{ name: "Wifi", icon: "wifi" },
			{ name: "Fire Extinguisher", icon: "fire-extinguisher" },
			{ name: "refrigerator", icon: "refrigerator" },
		],
	},
	{
		class: "Special Utilities",
		amenities_list: [
			{ name: "Swimming Pool", icon: "swimming-pool" },
			{ name: "BBQ Grill", icon: "bbq-grill" },
			{ name: "Workspace", icon: "workspace" },
			{ name: "Snooker Table", icon: "snooker-table" },
			{ name: "Piano", icon: "piano" },
			{ name: "Hot Tub", icon: "hot-tub" },
			{ name: "Beach Access", icon: "beach-access" },
			{ name: "Lake Access", icon: "lake-access" },
			{ name: "Fire Pit", icon: "fire-pit" },
			{ name: "Patio", icon: "patio" },
			{ name: "Gym", icon: "gym" },
			{ name: "Handicap Accessible", icon: "handicap-accessible" },
			{ name: "Security System", icon: "security-system" },
			{ name: "PS5", icon: "ps5" },
			{ name: "Sound System", icon: "sound-system" },
			{ name: "Streaming Services", icon: "streaming-services" },
		],
	},
]

export const yup_amenities_list = [
	"air-conditioner",
	"beach-access",
	"bbq-grill",
	"dedicated-kitchen",
	"fire-alarm",
	"fire-extinguisher",
	"fire-pit",
	"first-aid-kit",
	"gas-cooker",
	"gym",
	"handicap-accessible",
	"hot-tub",
	"lake-access",
	"parking-space",
	"patio",
	"piano",
	"ps5",
	"refrigerator",
	"security-system",
	"smoke-alarm",
	"snooker-table",
	"sound-system",
	"swimming-pool",
	"streaming-services",
	"television",
	"washing-machine",
	"water-heater",
	"wifi",
	"workspace",
]
