import { BookingProps, HttpResponse, Pagination } from "@/types"
import { PaginationDto } from "./property"
import { endpoints } from "@/config"
import { axios } from "@/lib"

export interface AddBookingDto {}

const GetAllBookingsQuery = async ({ limit, page }: PaginationDto) => {
	return await axios
		.get<Pagination<BookingProps[]>>(endpoints().bookings.get_all, {
			params: { limit, page },
		})
		.then((res) => res.data)
}

const GetBookingQuery = async (id: string) => {
	return await axios
		.get<HttpResponse<BookingProps>>(endpoints(id).bookings.get_one)
		.then((res) => res.data)
}

const AddBookingMutation = async (payload: AddBookingDto) => {
	return await axios
		.post<HttpResponse<BookingProps>>(endpoints().bookings.create, payload)
		.then((res) => res.data)
}

const UpdateBookingMutation = async (id: string, payload: Partial<AddBookingDto>) => {
	return await axios
		.put<HttpResponse<BookingProps>>(endpoints(id).bookings.update, payload)
		.then((res) => res.data)
}

const DeleteBookingMutation = async (id: string) => {
	return await axios
		.delete<HttpResponse<BookingProps>>(endpoints(id).bookings.delete)
		.then((res) => res.data)
}

export {
	AddBookingMutation,
	DeleteBookingMutation,
	GetAllBookingsQuery,
	GetBookingQuery,
	UpdateBookingMutation,
}
