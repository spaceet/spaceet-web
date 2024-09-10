import { HttpResponse, Pagination, PropertyProps } from "@/types"
import { endpoints } from "@/config"
import { axios } from "@/lib"

export interface PaginationDto {
	limit?: number
	page?: number
}

export interface AddPropertyDto {}

export interface SearchPropertyDto {}

const GetAllPropertiesQuery = async ({ limit, page }: PaginationDto) => {
	return axios
		.get<Pagination<PropertyProps>>(endpoints().properties.get_all, { params: { limit, page } })
		.then((res) => res.data)
}

const GetPropertyQuery = async (id: string) => {
	return axios.get<PropertyProps>(endpoints(id).properties.get_one).then((res) => res.data)
}

const SearchPropertiesQuery = async ({}: SearchPropertyDto) => {
	return axios
		.get<Pagination<PropertyProps>>(endpoints(null, {}).properties.search)
		.then((res) => res.data)
}

const AddPropertyMutation = async (payload: AddPropertyDto) => {
	return axios
		.post<HttpResponse<PropertyProps>>(endpoints().properties.create, payload)
		.then((res) => res.data)
}

const UpdatePropertyMutation = async (id: string, payload: Partial<AddPropertyDto>) => {
	return axios
		.put<HttpResponse<PropertyProps>>(endpoints(id).properties.update, payload)
		.then((res) => res.data)
}

const DeletePropertyMutation = async (id: string) => {
	return axios
		.delete<HttpResponse<PropertyProps>>(endpoints(id).properties.delete)
		.then((res) => res.data)
}

export {
	AddPropertyMutation,
	DeletePropertyMutation,
	GetAllPropertiesQuery,
	GetPropertyQuery,
	SearchPropertiesQuery,
	UpdatePropertyMutation,
}
