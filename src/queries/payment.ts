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

export type GenerateLinkDto = {
	amount: number
	narration_id: string
	narration: "RESERVATION" | "WITHDRAWAL"
}

const GeneratePaymentLink = async (payload: GenerateLinkDto) => {
	return axios
		.post<HttpResponse<HttpResponse<TransactionProps>>>(endpoints().payments.generate_link, payload)
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

const CreatePinMutation = async (transaction_pin: string) => {
	return axios
		.post<HttpResponse<boolean>>(endpoints().payments.create_pin, {
			transaction_pin,
		})
		.then((res) => res.data)
}

const UpdatePinMutation = async (payload: { new_pin: string; old_pin: string }) => {
	return axios
		.put<HttpResponse<boolean>>(endpoints().payments.update_pin, payload)
		.then((res) => res.data)
}

const RequestResetPinQuery = async () => {
	return axios
		.get<HttpResponse<boolean>>(endpoints().payments.request_reset_pin)
		.then((res) => res.data)
}

const ResetPinMutation = async (payload: { new_pin: string; otp: string }) => {
	return axios
		.post<HttpResponse<boolean>>(endpoints().payments.reset_pin, payload)
		.then((res) => res.data)
}

const InitiateWithdrawalMutation = async (payload: {
	account_number: string
	account_bank: string
	amount: number
	txn_pin: string
}) => {
	return axios
		.post<HttpResponse<boolean>>(endpoints().payments.initiate_withdrawal, payload)
		.then((res) => res.data)
}

const CompleteWithdrawalMutation = async (payload: { otp: string; transfer_code: string }) => {
	return axios
		.post<HttpResponse<boolean>>(endpoints().payments.complete_withdrawal, payload)
		.then((res) => res.data)
}

export {
	CompleteWithdrawalMutation,
	CreatePinMutation,
	GeneratePaymentLink,
	GetPaymentHistoryQuery,
	GetPaymentOverviewQuery,
	InitiateWithdrawalMutation,
	RequestResetPinQuery,
	ResetPinMutation,
	UpdatePinMutation,
}
