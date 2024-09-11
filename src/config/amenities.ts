import { AmenitiesIconName } from "@/types"
import {
	AirConditioner,
	Airport,
	Balcony,
	Bath,
	Bed,
	CableTv,
	Dishwasher,
	Dumbells,
	Elevator,
	FirePlace,
	Gamepad,
	Garden,
	HandicapAccessible,
	Heating,
	Jacuzzi,
	Kitchen,
	Laundry,
	Microwave,
	Parking,
	PetFriendly,
	Refrigerator,
	SecuritySystem,
	StreamingService,
	Swimming,
	Users,
	WiFi,
} from "@/assets/svg"

export const icons: Record<AmenitiesIconName, React.FC<React.SVGProps<SVGSVGElement>>> = {
	"air-conditioner": AirConditioner,
	airport: Airport,
	balcony: Balcony,
	bath: Bath,
	bed: Bed,
	cable: CableTv,
	dishwasher: Dishwasher,
	elevator: Elevator,
	fitness: Dumbells,
	fireplace: FirePlace,
	"free-wifi": WiFi,
	garden: Garden,
	"handicap-accessible": HandicapAccessible,
	heating: Heating,
	jacuzzi: Jacuzzi,
	kitchen: Kitchen,
	laundry: Laundry,
	"max-guests": Users,
	microwave: Microwave,
	parking: Parking,
	"pet-friendly": PetFriendly,
	ps5: Gamepad,
	refrigerator: Refrigerator,
	"security-system": SecuritySystem,
	"streaming-service": StreamingService,
	"swimming-pool": Swimming,
}