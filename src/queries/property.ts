import { endpoints } from "@/config"
import { axios } from "@/lib"
import {
	HttpResponse,
	LocationSearchProps,
	Pagination,
	ApartmentProps,
	ApartmentsProps,
} from "@/types"

export interface PaginationDto {
	limit?: number
	page?: number
}

export interface AddPropertyDto {}

export interface SearchPropertyDto extends PaginationDto {
	bedrooms?: number
	location?: string
	price?: number
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

const GetPropertiesByLocationQuery = async () => {
	return axios
		.get<HttpResponse<LocationSearchProps[]>>(endpoints().apartment.get_by_location)
		.then((res) => res.data)
}

const GetPropertyQuery = async (id: string) => {
	return axios
		.get<HttpResponse<ApartmentProps>>(endpoints(id).apartment.get_one)
		.then((res) => res.data)
}

const AddPropertyMutation = async (payload: AddPropertyDto) => {
	return axios
		.post<HttpResponse<ApartmentProps>>(endpoints().apartment.create, payload)
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
	GetAllPropertiesQuery,
	GetPropertiesByLocationQuery,
	GetPropertyQuery,
	UpdatePropertyMutation,
}
