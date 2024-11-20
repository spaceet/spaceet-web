import { endpoints } from "@/config"
import { axios } from "@/lib"
import {
	HttpResponse,
	Pagination,
	PaymentOverviewProps,
	PaymentProps,
	TimelineProps,
	TransactionProps,
} from "@/types"

export type PaymentOverviewParams = {
	end_date?: string
	start_date?: string
	timeLine?: TimelineProps
}

type PaginationProps = {
	limit?: number
	page?: number
}

export type GenerateLinkDto =
	| {
			amount: number
			card_id: string
			narration_id: string
			narration: "RESERVATION"
			payment_type: "CARD" | "TRANSFER"
	  }
	| {
			amount: number
			narration_id: string
			narration: "RESERVATION"
			payment_type: "TRANSFER"
	  }

const GeneratePaymentLink = async (payload: GenerateLinkDto) => {
	return axios
		.post<HttpResponse<TransactionProps>>(endpoints().payments.generate_link, payload)
		.then((res) => res.data)
}

const GetPaymentOverviewQuery = async (params: PaymentOverviewParams) => {
	return axios
		.get<HttpResponse<PaymentOverviewProps>>(endpoints().payments.payment_overview, {
			params: {
				...params,
				timeLine: params.timeLine?.toLowerCase() === "all" ? "" : params.timeLine,
			},
		})
		.then((res) => res.data)
}

const GetPaymentHistoryQuery = async (params: PaginationProps) => {
	return axios
		.get<HttpResponse<Pagination<PaymentProps>>>(endpoints().payments.payment_history, { params })
		.then((res) => res.data)
}

export { GeneratePaymentLink, GetPaymentHistoryQuery, GetPaymentOverviewQuery }
