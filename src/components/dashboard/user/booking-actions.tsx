import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import React from "react"

import { CancelReservationMutation, GenerateLinkDto, GeneratePaymentLink } from "@/queries"
import { HttpError, ReservationsProps } from "@/types"

interface Props {
	reservation: ReservationsProps
}

export const BookingActions = ({ reservation }: Props) => {
	const { mutateAsync: cancel } = useMutation({
		mutationFn: (id: string) => CancelReservationMutation(id),
		mutationKey: ["cancel-reservation"],
		onSuccess: (data) => {
			console.log(data)
		},
		onError: ({ response }: HttpError) => {
			console.error(response)
			const { message } = response.data
			toast.error(message)
		},
	})

	const { mutateAsync: generate } = useMutation({
		mutationFn: (payload: GenerateLinkDto) => GeneratePaymentLink(payload),
		mutationKey: ["generate-payment-link"],
		onSuccess: (data) => {
			console.log(data)
		},
		onError: ({ response }: HttpError) => {
			console.error(response)
			const { message } = response.data
			toast.error(message)
		},
	})

	const handleGenerate = () => {
		const payload: GenerateLinkDto = {
			amount: reservation.reservation_price_details.final_price,
			narration_id: reservation.reservation_id,
			narration: "RESERVATION",
		}
		generate(payload)
	}

	return (
		<div className="flex w-full flex-col gap-2">
			{!reservation.reservation_is_paid && (
				<button
					onClick={() => cancel(reservation.reservation_id)}
					className="flex items-center rounded px-2 py-1 text-sm transition-colors hover:bg-neutral-100">
					Make Payment
				</button>
			)}
			{reservation.reservation_status === "PENDING" && (
				<button
					onClick={handleGenerate}
					className="flex items-center rounded px-2 py-1 text-sm transition-colors hover:bg-neutral-100">
					Cancel Reservation
				</button>
			)}
		</div>
	)
}
