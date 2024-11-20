import { HttpResponse, Pagination, ReservationsProps, TimelineProps } from "@/types"
import { endpoints } from "@/config"
import { axios } from "@/lib"

type PaginationProps = {
	end_date?: string
	start_date?: string
	timeline?: TimelineProps
}

const GetCalendarQuery = async (params: PaginationProps) => {
	return axios
		.get<HttpResponse<Pagination<ReservationsProps>>>(endpoints().calendar.get_reservations, {
			params: {
				...params,
				timeLine: params.timeline?.toLowerCase() === "all" ? "" : params.timeline,
			},
		})
		.then((res) => res.data)
}

export { GetCalendarQuery }
