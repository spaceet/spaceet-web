import Image from "next/image"
import {} from "date-fns"
import React from "react"

import { ReservationsProps } from "@/types"
import { formatCurrency } from "@/lib"

interface Props {
	booking: ReservationsProps
}

export const BookingItem = ({ booking }: Props) => {
	return (
		<div className="grid h-[60px] w-full grid-cols-12 gap-2 text-neutral-400">
			<div className="col-span-4 flex w-full items-center gap-2 py-1">
				<Image
					src={booking.reservation_apartment_id}
					alt={booking.apartment_name}
					width={54}
					height={50}
					className="rounded-md border"
				/>
				<div className="flex flex-col">
					<p className="font-medium text-neutral-900">{booking.apartment_name}</p>
					<p className="text-sm">{booking.apartment_city}</p>
				</div>
			</div>
			<div className="col-span-2 w-full py-1 text-sm">{}</div>
			<div className="w-full py-1 text-sm"></div>
			<div className="w-full py-1">{0} Guests</div>
			<div className="col-span-2 flex w-full items-center gap-2 py-1 text-sm">
				<Image
					src={booking.user_profile_image}
					alt={booking.user_first_name}
					width={24}
					height={24}
					className="rounded-full border"
				/>
				<p>
					{booking.user_first_name} {booking.user_last_name}
				</p>
			</div>
			<div className="w-full py-1 text-sm text-neutral-900">
				{formatCurrency(booking.reservation_price_details.final_price, "NGN")}
			</div>
			<div className="w-full py-1">STATUS</div>
		</div>
	)
}
