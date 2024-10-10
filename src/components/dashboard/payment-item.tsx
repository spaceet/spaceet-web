import Image from "next/image"
import React from "react"

import { PaymentProps } from "@/types"
import { formatCurrency } from "@/lib"

interface Props {
	payment: PaymentProps
}

export const PaymentItem = ({ payment }: Props) => {
	return (
		<div className="grid h-[60px] w-full grid-cols-12 gap-2 text-neutral-400">
			<div className="col-span-4 flex w-full items-center gap-2 py-1">
				<Image
					src={payment.apartment.images[0]}
					alt={payment.apartment.name}
					width={54}
					height={50}
					className="rounded-md border"
				/>
				<div className="flex flex-col">
					<p className="font-medium text-neutral-900">{payment.apartment.name}</p>
					<p className="text-sm">
						{payment.apartment.city}, {payment.apartment.state}
					</p>
				</div>
			</div>
			<div className="col-span-2 flex w-full items-center gap-2 py-1 text-sm">
				<Image
					src={payment.guest.profile_image}
					alt={payment.guest.first_name}
					width={24}
					height={24}
					className="rounded-full border"
				/>
				<p>
					{payment.guest.first_name} {payment.guest.last_name}
				</p>
			</div>
			<div className="col-span-2 w-full py-1 text-sm">DATE RECEIVED</div>
			<div className="col-span-2 w-full py-1 text-sm">NIGHTS</div>
			<div className="w-full py-1 text-sm text-neutral-900">
				{formatCurrency(payment.amount, "NGN")}
			</div>
			<div className="w-full py-1">STATUS</div>
		</div>
	)
}
