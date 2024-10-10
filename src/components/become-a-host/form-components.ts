import { AmenitiesIconName, ApartmentType } from "@/types"

export type ProfileFormProps = {
	address: string
	bio: string
	city: string
	first_name: string
	image: File | null
	last_name: string
	phoneNumber: string
	state: string
}

export type IdentityFormProps = {
	idExpiry: string
	idImages: File[]
	idNumber: string
	idType:
		| "bankVerificationNumber"
		| "driversLicense"
		| "internationlPassport"
		| "nationalIdentificationNumber"
		| "permanentVotersCard"
		| (string & {})
}

export type PropertyFormProps = {
	address: string
	bedrooms: number
	bathrooms: number
	city: string
	description: string
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
	documentType: string
}

export type UtilitiesFormProps = {
	utilities: AmenitiesIconName[]
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
	refundable: boolean
	refundableUntil: string
	refundableUntilType: string
}
