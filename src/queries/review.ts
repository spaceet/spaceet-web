import { HttpResponse, Pagination, ReviewProps } from "@/types"
import { PaginationDto } from "./property"
import { endpoints } from "@/config"
import { axios } from "@/lib"

export interface AddReviewDto {
	rating: number
	review: string
}

const AddReviewMutation = async (id: string, payload: AddReviewDto) => {
	return axios
		.post<HttpResponse<ReviewProps>>(endpoints(id).reviews.create, payload)
		.then((res) => res.data)
}

const GetAllReviewsQuery = async (id: string, { limit, page }: PaginationDto) => {
	return axios
		.get<Pagination<ReviewProps>>(endpoints(id).reviews.get_all, { params: { limit, page } })
		.then((res) => res.data)
}

const GetReviewQuery = async (id: string) => {
	return axios.get<HttpResponse<ReviewProps>>(endpoints(id).reviews.get_one).then((res) => res.data)
}

const UpdateReviewMutation = async (id: string, payload: AddReviewDto) => {
	return axios
		.put<HttpResponse<ReviewProps>>(endpoints(id).reviews.update, payload)
		.then((res) => res.data)
}

const DeleteReviewMutation = async (id: string) => {
	return axios
		.delete<HttpResponse<ReviewProps>>(endpoints(id).reviews.delete)
		.then((res) => res.data)
}

export {
	AddReviewMutation,
	GetAllReviewsQuery,
	GetReviewQuery,
	DeleteReviewMutation,
	UpdateReviewMutation,
}
