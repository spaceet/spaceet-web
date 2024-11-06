import { ProofOfOwnershipProps } from "@/config"
import { ApartmentType } from "@/types"

export const identification_types = [
	"BVN",
	"DRIVERS_LICENSE",
	"INTERNATIONAL_PASSPORT",
	"NIN",
	"VOTERS_CARD",
] as const
export type IdentificationTypeProps = (typeof identification_types)[number]

export type ProfileFormProps = {
	address: string
	bio: string
	city: string
	first_name: string
	profile_image: File | null
	last_name: string
	phone_number: string
	state: string
}

export type IdentityFormProps = {
	identification_expiry_date: string
	identification_number: string
	identification_type: IdentificationTypeProps
	images: File[]
}

export type PropertyFormProps = {
	address: string
	bedrooms: number
	bathrooms: number
	cleaningFee: number
	city: string
	description: string
	latitude: number
	longitude: number
	name: string
	price: number
	propertyType: ApartmentType
	serviceCharge: number
	state: string
	postalCode?: string
}

export type UploadFormProps = {
	images: File[]
}

export type DocumentFormProps = {
	documentImages: File[]
	documentType: ProofOfOwnershipProps
}

export type UtilitiesFormProps = {
	utilities: string[]
}

export type RulesFormProps = {
	checkIn: string[]
	checkOut: string
	customRules: string[]
	events: boolean
	filming: boolean
	maxGuests: number
	pets: boolean
	quietHours: boolean
	smoking: boolean
}

export type CancellationFormProps = {
	cancellation_and_repayment_conditions: string
}
