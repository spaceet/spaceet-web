import { HttpResponse, Pagination, ReviewProps } from "@/types"
import { PaginationDto } from "./property"
import { endpoints } from "@/config"
import { axios } from "@/lib"

export interface AddReviewDto {
	comment: string
	propertyId: string
	rating: string
	userId: string
}

const AddReviewMutation = async (payload: AddReviewDto) => {
	return await axios
		.post<HttpResponse<ReviewProps>>(endpoints().reviews.create, payload)
		.then((res) => res.data)
}

const GetAllReviewsQuery = async (id: string, { limit, page }: PaginationDto) => {
	return await axios
		.get<Pagination<ReviewProps>>(endpoints(id).reviews.get_all, { params: { limit, page } })
		.then((res) => res.data)
}

const GetReviewQuery = async (id: string) => {
	return await axios
		.get<HttpResponse<ReviewProps>>(endpoints(id).reviews.get_one)
		.then((res) => res.data)
}

const UpdateReviewMutation = async (id: string, payload: AddReviewDto) => {
	return await axios
		.put<HttpResponse<ReviewProps>>(endpoints(id).reviews.update, payload)
		.then((res) => res.data)
}

const DeleteReviewMutation = async (id: string) => {
	return await axios
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
