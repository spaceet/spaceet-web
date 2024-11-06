import { ProofOfOwnershipProps, endpoints } from "@/config"
import { axios } from "@/lib"
import {
	ApartmentProps,
	ApartmentsProps,
	ApartmentTypeProps,
	HostApartmentProps,
	HttpResponse,
	LocationSearchProps,
	Pagination,
} from "@/types"

export interface PaginationDto {
	limit?: number
	page?: number
}

export interface AddPropertyDto {
	amenities: string[]
	name: string
	description: string
	type: string
	address: string
	city: string
	state: string
	country: string
	images: File[]
	video: File | null
	number_of_bedrooms: number
	number_of_bathrooms: number
	maximum_number_of_guests: number
	logitude: number
	latitude: number
	checkout_time: string
	checkin_times: string[]
	is_pet_allowed: "YES" | "NO"
	number_of_pets_allowed: number
	is_age_limit: "YES" | "NO"
	age_limit: number
	cancellation_and_repayment_conditions: string
	cost_per_night: number
	cleaning_fee: number
	service_charge: number
	discount_percentage: number
	cover_photo: File | null
	postal_code: number
	is_event_allowed: "YES" | "NO"
	smoking_allowed: "YES" | "NO"
	phography_allowed: "YES" | "NO"
	custom_rules: string[]
	property_verification_type: ProofOfOwnershipProps
	property_verification_file: File | null
}

export interface SearchPropertyDto extends PaginationDto {
	bedrooms?: string
	location?: string
	price?: string
	type?: string
}

const GetAllPropertiesQuery = async ({
	bedrooms,
	limit,
	location,
	page,
	price,
	type,
}: SearchPropertyDto) => {
	return axios
		.get<
			HttpResponse<Pagination<ApartmentsProps>>
		>(endpoints().apartment.get_all, { params: { bedrooms, limit, location, page, price, type } })
		.then((res) => res.data)
}

const GetAllHostPropertiesQuery = async ({ limit, page }: PaginationDto) => {
	return axios
		.get<
			HttpResponse<Pagination<HostApartmentProps>>
		>(endpoints().apartment.get_user_apartments, { params: { limit, page } })
		.then((res) => res.data)
}

const GetPropertiesByLocationQuery = async () => {
	return axios
		.get<HttpResponse<LocationSearchProps[]>>(endpoints().apartment.get_by_location)
		.then((res) => res.data)
}

const GetPropertyTypesQuery = async () => {
	return axios
		.get<HttpResponse<ApartmentTypeProps[]>>(endpoints().apartment.types)
		.then((res) => res.data)
}

const GetPropertyQuery = async (id: string) => {
	return axios
		.get<HttpResponse<ApartmentProps>>(endpoints(id).apartment.get_one)
		.then((res) => res.data)
}

const AddPropertyMutation = async (payload: AddPropertyDto) => {
	const formData = new FormData()
	formData.append("address", payload.address)
	formData.append("age_limit", payload.age_limit.toString())
	for (let i = 0; i < payload.amenities.length; i++) {
		formData.append("amenities", payload.amenities[i])
	}
	formData.append(
		"cancellation_and_repayment_conditions",
		payload.cancellation_and_repayment_conditions
	)
	for (let i = 0; i < payload.checkin_times.length; i++) {
		if (payload.checkin_times[i]) {
			formData.append("checkin_times", payload.checkin_times[i])
		}
	}
	formData.append("checkin_time", "00:00:00")
	for (let i = 0; i < 2; i++) {
		formData.append("checkout_times", payload.checkout_time)
	}
	formData.append("checkout_time", payload.checkout_time)
	formData.append("cleaning_fee", payload.cleaning_fee.toString())
	formData.append("city", payload.city)
	formData.append("cost_per_night", payload.cost_per_night.toString())
	formData.append("country", payload.country)
	if (payload.cover_photo) {
		formData.append("cover_photo", payload.cover_photo)
	}
	for (let i = 0; i < payload.custom_rules.length; i++) {
		formData.append("custom_rules", payload.custom_rules[i])
	}
	formData.append("description", payload.description)
	formData.append("discount_percentage", payload.discount_percentage.toString())
	for (let i = 0; i < payload.images.length; i++) {
		if (payload.images[i]) {
			formData.append("images", payload.images[i])
		}
	}
	formData.append("is_age_limit", payload.is_age_limit)
	formData.append("is_event_allowed", payload.is_event_allowed)
	formData.append("is_pet_allowed", payload.is_pet_allowed)
	formData.append("latitude", payload.latitude.toString())
	formData.append("logitude", payload.logitude.toString())
	formData.append("maximum_number_of_guests", payload.maximum_number_of_guests.toString())
	formData.append("name", payload.name)
	formData.append("number_of_bathrooms", payload.number_of_bathrooms.toString())
	formData.append("number_of_bedrooms", payload.number_of_bedrooms.toString())
	formData.append("number_of_pets_allowed", payload.number_of_pets_allowed.toString())
	formData.append("phography_allowed", payload.phography_allowed)
	formData.append("postal_code", payload.postal_code.toString())
	if (payload.property_verification_file) {
		formData.append("property_verification_file", payload.property_verification_file)
	}
	formData.append("property_verification_type", payload.property_verification_type)
	formData.append("service_charge", payload.service_charge.toString())
	formData.append("smoking_allowed", payload.smoking_allowed)
	formData.append("state", payload.state)
	formData.append("type", payload.type)
	if (payload.video) {
		formData.append("video", payload.video)
	}
	return axios
		.post<HttpResponse<ApartmentProps>>(endpoints().apartment.create, formData)
		.then((res) => res.data)
}

const UpdatePropertyMutation = async (id: string, payload: Partial<AddPropertyDto>) => {
	return axios
		.put<HttpResponse<ApartmentProps>>(endpoints(id).apartment.update, payload)
		.then((res) => res.data)
}

const DeletePropertyMutation = async (id: string) => {
	return axios
		.delete<HttpResponse<ApartmentProps>>(endpoints(id).apartment.delete)
		.then((res) => res.data)
}

export {
	AddPropertyMutation,
	DeletePropertyMutation,
	GetAllHostPropertiesQuery,
	GetAllPropertiesQuery,
	GetPropertiesByLocationQuery,
	GetPropertyQuery,
	GetPropertyTypesQuery,
	UpdatePropertyMutation,
}
