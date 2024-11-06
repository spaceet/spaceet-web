import { HttpResponse, TransactionProps } from "@/types"
import { endpoints } from "@/config"
import { axios } from "@/lib"

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

export { GeneratePaymentLink }
