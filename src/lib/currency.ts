import { Currency } from "@/types"

export const formatCurrency = (amount: number, currency: Currency) => {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency,
	}).format(amount)
}
