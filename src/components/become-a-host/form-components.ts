import { AmenitiesIconName } from "@/types"

export type ProfileFormProps = {
	address: string
	bio: string
	city: string
	firstName: string
	idImages: File[]
	idNumber: string
	idType: "bankVerificationNumber" | "passport" | "nationalIdentificationNumber"
	image: File
	lastName: string
	phoneNumber: string
	state: string
}

export type PropertyFormProps = {
	address: string
	bedrooms: number
	bathrooms: number
	city: string
	description: string
	documentImages: File[]
	documentType: string
	images: File[]
	name: string
	price: number
	propertyType: string
	state: string
	utilities: AmenitiesIconName[]
	zipCode: string
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
