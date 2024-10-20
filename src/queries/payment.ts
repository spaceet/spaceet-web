import { HttpResponse, TransactionProps } from "@/types"
import { endpoints } from "@/config"
import { axios } from "@/lib"

export interface GenerateLinkDto {
	amount: number
	card_id: string
	narration_id: string
	narration: "RESERVATION"
	payment_type: "CARD" | "TRANSFER"
}

const GeneratePaymentLink = async (payload: GenerateLinkDto) => {
	return axios
		.post<HttpResponse<TransactionProps>>(endpoints().payments.generate_link, payload)
		.then((res) => res.data)
}

export { GeneratePaymentLink }
