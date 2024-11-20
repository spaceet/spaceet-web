import { RemixiconComponentType } from "@remixicon/react"

import { amenities_list, apartment_types, currencyCodes } from "@/config"

export type Maybe<T> = T | null

export type Undefined<T> = T | undefined

export type Exact<T extends { [key: string]: unknown }> = {
	[K in keyof T]: T[K]
}

export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]?: Maybe<T[SubKey]>
}

export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]: Maybe<T[SubKey]>
}

export type ValueOf<T> = T[keyof T]

export type NonEmptyArray<T> = [T, ...T[]]

export type MustInclude<T, U extends T[]> = [T] extends [ValueOf<U>] ? U : never

export type HttpError = {
	__typename?: "HttpError"
	response: {
		data: {
			error: string
			errorCode: string
			message: string
			status: string
			success: boolean
		}
	}
}

export type HttpResponse<T> = {
	__typename?: "HttpResponse"
	data: T
	message: string
	success: boolean
	status: number
}

export type Pagination<T> = {
	__typename?: "Pagination"
	data: T[]
	meta: {
		hasNextPage: boolean
		hasPreviousPage: boolean
		itemCount: number
		page: number
		pageCount: number
		take: number
	}
}

export type Currency = (typeof currencyCodes)[number]
export type ApartmentType = (typeof apartment_types)[number] | (string & {})

export type Node = {
	__typename?: "Node"
	id: string
	createdOn: Date | string
	deletedBy?: Maybe<string>
	deletedOn?: Maybe<Date | string>
	isDeleted?: boolean
	updatedBy?: Maybe<string>
	updatedOn?: Maybe<Date | string>
}

export type UserProps = Node & {
	__typename?: "User"
	access_token: string
	address?: string
	bio: Maybe<string>
	city?: string
	email: string
	first_name: string
	full_name: string
	images: string[]
	isVerified: boolean
	last_name: string
	location: Maybe<string>
	phone_number: string
	profile_image: string
	rating: number
	reviews: ReviewProps[]
	signup_verified: boolean
	state?: string
	user_type: "USER" | "HOST"
}

export type ApartmentProps = Node & {
	__typename?: "Property"
	address: string
	amenities: AmenityProps[]
	capacity: number
	city: string
	cover_photo: string
	current_location: LocationProps
	description: string
	host: UserProps
	images: string[]
	is_approved: boolean
	is_available: boolean
	is_complete: boolean
	maximum_number_of_guests: number
	name: string
	number_of_bathrooms: number
	number_of_bedrooms: number
	policy: PolicyProps
	postal_code: string
	price: PricingProps
	property_verification_file: string
	property_verification_type: string
	type: ApartmentType | (string & {})
	rating: string
	reviews: ReviewProps[]
	state: string
	video: string
}

export type ApartmentsProps = Node & {
	Apartment_id: string
	Apartment_name: string
	Apartment_description: string
	Apartment_type: ApartmentType | (string & {})
	Apartment_address: string
	Apartment_city: string
	Apartment_state: string
	Apartment_country: string
	Apartment_images: string[]
	Apartment_number_of_bedrooms: number
	Apartment_number_of_bathrooms: number
	Apartment_maximum_number_of_guests: number
	Apartment_amenities: AmenityProps[]
	Apartment_current_location: LocationProps
	price_cost_per_night: number
	price_cleaning_fee: number
	price_service_charge: number
	price_discount_percentage: number
	hostId: string
}

export type HostApartmentProps = Node & {
	__typename?: "HostApartment"
	address: string
	amenities: AmenityProps[]
	description: string
	city: string
	country: string
	current_location: string
	hostId: string
	id: string
	images: string[]
	maximum_number_of_guests: number
	name: string
	number_of_bathrooms: number
	state: string
	status: "DRAFT" | "RESERVED" | "VACANT"
	type: string
}

export type ApartmentTypeProps = {
	name: string
	description: string
}

export type AmenityProps = Node & {
	__typename?: "Amenity"
	amenity_id: string
	description: string
	icon: string
	image: string
	name: AmenitiesIconName
	type: "BASIC" | "SPECIAL" | "OTHER"
}

export type AmenityClassProps = {
	amenities: AmenityProps[]
	amenityClass: "BASIC" | "SPECIAL" | (string & {})
}

export type TimelineProps =
	| "YESTERDAY"
	| "TODAY"
	| "THIS_WEEK"
	| "LAST_7_DAYS"
	| "LAST_WEEK"
	| "THIS_MONTH"
	| "LAST_6_MONTHS"
	| "LAST_12_MONTHS"
	| (string & {})

export type BookingProps = Node & {
	__typename?: "Booking"
	apartment: ApartmentProps
	endDate: Date | string
	guest: UserProps
	numberOfGuests: number
	price: number
	startDate: Date | string
	status: "upcoming" | "cancelled" | "completed"
}

export type LocationProps = {
	coordinates: [number, number]
	type: "Point"
}

export type PricingProps = Node & {
	__typename?: "Pricing"
	cleaning_fee: number
	cost_per_night: number
	discount_percentage: number
	service_charge: number
}

export type PolicyProps = Node & {
	__typename?: "Policy"
	age_limit: number
	cancellation_and_repayment_conditions: string
	checkin_time: Maybe<string>
	checkout_time: Maybe<string>
	is_age_limit: boolean
	is_pet_allowed: boolean
	number_of_pets_allowed: number
}

export type PaymentProps = Node & {
	__typename?: "Payment"
	amount: number
	apartment: ApartmentProps
	currency: Currency
	numberOfGuests: number
	paymentDate: Date | string
	status: "pending" | "succeeded" | "failed"
	transactionId: string
	guest: UserProps
}

export type ReviewProps = {
	__typename?: "Review"
	review_apartment_id: string
	review_createdOn: Date | string
	review_rating: number
	review_review: string
	review_user_id: string
	user_email: string
	user_first_name: string
	user_last_name: string
	user_profile_image: string
}

export type ReservationProps = Node & {
	checkin_date: Date | string
	checkout_date: Date | string
	number_of_days: number
	description: string
	apartment_id: string
	user_id: string
	t_and_c_agreed: boolean
	price_details: PriceDetailsProps
	payment_channel: "CARD" | "TRANSFER"
	is_paid: boolean
	status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED"
}

export type ReservationsProps = {
	apartment_address: string
	apartment_city: string
	apartment_name: string
	apartment_state: string
	reservation_apartment_id: string
	reservation_checkin_date: Date | string
	reservation_checkout_date: Date | string
	reservation_description: string
	reservation_id: string
	reservation_is_paid: boolean
	reservation_number_of_days: number
	reservation_payment_channel: "CARD" | "TRANSFER"
	reservation_price_details: PriceDetailsProps
	reservation_status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED"
	reservation_t_and_c_agreed: boolean
	reservation_user_id: string
	user_first_name: string
	user_last_name: string
	user_profile_image: string
}

export type PriceDetailsProps = {
	cleaning_fee: number
	discount_applied: number
	final_price: number
	number_of_nights: number
	price_per_night: number
	service_charge: number
	total_price_of_nights: number
}

export type MessageProps = Node & {
	__typename?: "Message"
	from: UserProps
	message: string
}

export type NotificationProps = Node & {
	__typename?: "Notification"
	message: string
	title: string
	type: "success" | "error" | "info" | "warning"
}

export type LocationSearchProps = {
	__typename?: "Location Search"
	count: number
	id: string
	image: string
	location: string
}

export type AmenitiesIconName = (typeof amenities_list)[number] | (string & {})

export interface ComponentUpdateProps {
	active: string
	activeIndex: number
	components: {
		name: string
		icon: RemixiconComponentType
	}[]
	handleGoTo: (index: number) => void
	handleNext: () => void
	handlePrev: () => void
	isLoading?: boolean
	isNotFirstOrLast: boolean
	label: string
	subtitle: string
	totalItems: number
	width: number
}

export type UsableAmenitiesProps = {
	__typename?: "UsableAmenities"
	class: string
	amenities_list: {
		name: string
		icon: AmenitiesIconName
	}[]
}

export type CountryProps = {
	language: string
	region: string
	code: string
	flag: string
}

export type CalendarTimeProps =
	| "YESTERDAY"
	| "TODAY"
	| "THIS_WEEK"
	| "LAST_7_DAYS"
	| "LAST_WEEK"
	| "THIS_MONTH"
	| "LAST_6_MONTHS"
	| "LAST_12_MONTHS"

export type TransactionProps = {
	__typename?: "Transaction"
	link: string
	txRef: string
}

export type MapboxFeature = {
	__typename?: "Feature"
	geometry: LocationProps
	id: string
	properties: {
		context: {
			country: {
				country_code: string
				country_code_alpha_3: string
				mapbox_id: string
				name: string
				wikidata_id: string
			}
			district: {
				mapbox_id: string
				name: string
				wikidata_id: string
			}
			locality: {
				mapbox_id: string
				name: string
			}
			place: {
				mapbox_id: string
				name: string
			}
			postcode: {
				mapbox_id: string
				name: string
			}
			region: {
				mapbox_id: string
				name: string
				region_code: string
				region_code_full: string
				wikidata_id: string
			}
			street: {
				mapbox_id: string
				name: string
			}
		}
		coordinates: {
			latitude: number
			longitude: number
		}
		feature_type: string
		full_address: string
		mapbox_id: string
		name: string
		name_preferred: string
		place_formatted: string
	}
	type: string
}

export type MapboxSuggestion = {
	__typename?: "Suggestion"
	name: string
	namePreferred: string
	placeFormatted: string
	coordinates: {
		latitude: number
		longitude: number
	}
	country?: string
	district?: string
	locality?: string
	place?: string
	postcode?: string
	region?: string
	street?: string
}

export type PaymentOverviewProps = {
	overview: {
		narration: string
		totalAmount: number
	}[]
	wallet: Node & {
		user_id: string
		current_balance: number
		currency: string
	}
}
