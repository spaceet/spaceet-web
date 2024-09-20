import Image from "next/image"
import React from "react"

import { BookingProps } from "@/types"
import { formatCurrency } from "@/lib"

interface Props {
	booking: BookingProps
}

export const BookingItem = ({ booking }: Props) => {
	return (
		<div className="grid h-[60px] w-full grid-cols-12 gap-2 text-neutral-400">
			<div className="col-span-4 flex w-full items-center gap-2 py-1">
				<Image
					src={booking.apartment.images[0]}
					alt={booking.apartment.name}
					width={54}
					height={50}
					className="rounded-md border"
				/>
				<div className="flex flex-col">
					<p className="font-medium text-neutral-900">{booking.apartment.name}</p>
					<p className="text-sm">{booking.apartment.location}</p>
				</div>
			</div>
			<div className="col-span-2 w-full py-1 text-sm">DATE</div>
			<div className="w-full py-1 text-sm"></div>
			<div className="vpy-1 w-full">{booking.numberOfGuests} Guests</div>
			<div className="col-span-2 flex w-full items-center gap-2 py-1 text-sm">
				<Image
					src={booking.guest.imageUrl}
					alt={booking.guest.firstName}
					width={24}
					height={24}
					className="rounded-full border"
				/>
				<p></p>
			</div>
			<div className="w-full py-1 text-sm text-neutral-900">
				{formatCurrency(booking.price, "NGN")}
			</div>
			<div className="w-full py-1">STATUS</div>
		</div>
	)
}
