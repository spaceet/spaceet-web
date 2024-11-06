import { PaginationDto } from "./property"
import { endpoints } from "@/config"
import { axios } from "@/lib"
import {
	CalendarTimeProps,
	HttpResponse,
	Pagination,
	PriceDetailsProps,
	ReservationProps,
	ReservationsProps,
} from "@/types"

export interface PricingDto {
	checkin_date: string
	checkout_date: string
	apartment_id: string
}

export interface ReservationDto extends PricingDto {
	description: string
	payment_method: "CARD" | "TRANSFER"
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

const GetCalendarQuery = async (timeline: CalendarTimeProps) => {
	return axios
		.get<
			HttpResponse<Pagination<ReservationsProps>>
		>(endpoints().reservations.get_calendar, { params: { timeline } })
		.then((res) => res.data)
}

export {
	GetCalendarQuery,
	GetPricingQuery,
	GetHostReservationsQuery,
	GetReservationsQuery,
	MakeReservationMutation,
}
