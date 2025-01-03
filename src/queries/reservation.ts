import { PaginationDto } from "./property"
import { endpoints } from "@/config"
import { axios } from "@/lib"
import {
	HttpResponse,
	Pagination,
	PriceDetailsProps,
	ReservationProps,
	ReservationsProps,
} from "@/types"

export interface PricingDto {
	apartment_id: string
	checkin_date: string
	checkout_date: string
}

export interface ReservationDto extends PricingDto {
	description: string
	number_of_guests: number
	payment_channel: "CARD" | "TRANSFER"
	t_and_c_agreed: "YES" | "NO"
}

const GetPricingQuery = async (params: PricingDto) => {
	return axios
		.get<HttpResponse<PriceDetailsProps>>(endpoints().reservations.get_pricing, { params })
		.then((res) => res.data)
}

const MakeReservationMutation = async (payload: ReservationDto) => {
	return axios
		.post<HttpResponse<ReservationProps>>(endpoints().reservations.create, payload)
		.then((res) => res.data)
}

const GetHostReservationsQuery = async (params: PaginationDto) => {
	return axios
		.get<HttpResponse<Pagination<ReservationsProps>>>(endpoints().reservations.get_hosts, {
			params,
		})
		.then((res) => res.data)
}

const GetReservationsQuery = async (params: PaginationDto) => {
	return axios
		.get<HttpResponse<Pagination<ReservationsProps>>>(endpoints().reservations.get_all, {
			params,
		})
		.then((res) => res.data)
}

const CancelReservationMutation = async (id: string) => {
	return axios
		.put<HttpResponse<ReservationsProps>>(endpoints(id).reservations.cancel)
		.then((res) => res.data)
}

export {
	CancelReservationMutation,
	GetPricingQuery,
	GetHostReservationsQuery,
	GetReservationsQuery,
	MakeReservationMutation,
}
