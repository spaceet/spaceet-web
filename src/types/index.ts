import { currencyCodes } from "@/config"

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

export type Node = {
	__typename?: "Node"
	id: string
	createdAt: Date | string
	deletedAt: Maybe<Date | string>
	updatedAt: Maybe<Date | string>
}

export type UserProps = Node & {
	__typename?: "User"
	description: Maybe<string>
	email: string
	firstName: string
	imageUrl: string
	lastName: string
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
	price: number
	policies: string[]
	rating: number
	service_charge: number
	slug: string
}

export type AmenityProps = Node & {
	__typename?: "Amenity"
	description: string
	icon: string
	name: AmenitiesIconName
}

export type BookingProps = Node & {
	__typename?: "Booking"
	Property: PropertyProps
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
	booking: BookingProps
	comment: string
	property: PropertyProps
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

export const amenitiesIconNames = [
	"air-conditioner",
	"airport",
	"balcony",
	"bath",
	"bed",
	"cable",
	"dishwasher",
	"elevator",
	"fitness",
	"fireplace",
	"free-wifi",
	"garden",
	"handicap-accessible",
	"heating",
	"jacuzzi",
	"kitchen",
	"laundry",
	"max-guests",
	"microwave",
	"parking",
	"pet-friendly",
	"ps5",
	"refrigerator",
	"security-system",
	"streaming-service",
	"swimming-pool",
] as const

export type AmenitiesIconName = (typeof amenitiesIconNames)[number]
