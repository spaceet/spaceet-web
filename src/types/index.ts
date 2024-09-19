import { RemixiconComponentType } from "@remixicon/react"

import { amenities_list, apartment_types, currencyCodes } from "@/config"

export type Maybe<T> = T | null

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
			error: boolean
			message: string
		}
	}
}

export type HttpResponse<T> = {
	__typename?: "HttpResponse"
	data: T
	error: boolean
	message: string
}

export type Pagination<T> = {
	__typename?: "Pagination"
	data: T[]
	limit: number
	page: number
	total: number
	totalPages: number
}

export type Currency = (typeof currencyCodes)[number]
export type ApartmentType = (typeof apartment_types)[number] | (string & {})

export type Node = {
	__typename?: "Node"
	id: string
	createdAt: Date | string
	deletedAt?: Maybe<Date | string>
	updatedAt?: Maybe<Date | string>
}

export type UserProps = Node & {
	__typename?: "User"
	bio: Maybe<string>
	email: string
	firstName: string
	imageUrl: string
	isVerified: boolean
	lastName: string
	location?: Maybe<string>
	phoneNumber: string
	role: "user" | "host"
	rating: number
}

export type PropertyProps = Node & {
	__typename?: "Property"
	amenities: AmenityProps[]
	bathrooms: number
	bedrooms: number
	capacity: number
	cleaning_fee: number
	description: string
	host: UserProps
	images: string[]
	isAvailable: boolean
	location: string
	max_guests: number
	name: string
	policies: string[]
	price: number
	propertyType: ApartmentType
	rating: number
	service_charge: number
	slug: string
}

export type AmenityProps = Node & {
	__typename?: "Amenity"
	description: string
	name: AmenitiesIconName
}

export type BookingProps = Node & {
	__typename?: "Booking"
	property: PropertyProps
	endDate: Date | string
	startDate: Date | string
	user: UserProps
}

export type PaymentProps = Node & {
	__typename?: "Payment"
	amount: number
	booking: BookingProps
	currency: Currency
	paymentDate: Date | string
	status: "pending" | "completed" | "failed"
	transactionId: string
	user: UserProps
}

export type ReviewProps = Node & {
	comment: string
	rating: number
	user: UserProps
}

export type MessageProps = Node & {
	__typename?: "Message"
	content: string
	receiver: UserProps
	sender: UserProps
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
	components: {
		name: string
		icon: RemixiconComponentType
	}[]
	handleGoTo: (index: number) => void
	handlePrev: () => void
	label: string
	subtitle: string
	updateCanProceed: (value: boolean) => void
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
