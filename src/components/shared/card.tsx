import { useSwipeable } from "react-swipeable"
import Image from "next/image"
import Link from "next/link"
import React from "react"

import { PropertyProps } from "@/types"
import { formatCurrency } from "@/lib"
import { Rating } from "./rating"

interface Props {
	apartment: PropertyProps
}

const Card = ({ apartment }: Props) => {
	const [current, setCurrent] = React.useState(0)

	const handlers = useSwipeable({
		onSwipedLeft: () => setCurrent((prev) => (prev + 1) % apartment.images.length),
		onSwipedRight: () =>
			setCurrent((prev) => (prev - 1 + apartment.images.length) % apartment.images.length),
		trackMouse: true,
		swipeDuration: 500,
		trackTouch: true,
	})

	const handleClick = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
		e.preventDefault()
		e.stopPropagation()
		setCurrent(index)
	}

	return (
		<Link href={`/apartments/${apartment.id}`} className="flex w-full flex-col">
			<div className="relative aspect-[1.2/1] w-full rounded-md">
				<div
					{...handlers}
					onClick={(e) => e.stopPropagation()}
					className="absolute bottom-[10px] left-1/2 !z-[5] flex -translate-x-1/2 items-center justify-center gap-2">
					{apartment.images.map((_, index) => (
						<button
							key={index}
							onClick={(e) => handleClick(e, index)}
							className={`size-2 rounded-full ${index === current ? "bg-white" : "bg-white/50"}`}></button>
					))}
				</div>
				<div className="absolute right-3 top-3 !z-[5] rounded-md bg-white px-3 py-2 font-medium text-neutral-900 lg:text-xs">
					{formatCurrency(apartment.price, "NGN")}/night
				</div>
				<Image
					src={apartment.images[current]}
					alt={apartment.name}
					fill
					sizes="(max-width: 1024px)100%"
					className="rounded-md object-cover"
				/>
			</div>
			<div className="flex w-full flex-col py-2">
				<p className="font-semibold lg:text-lg">{apartment.name}</p>
				<p className="text-meutral-400 font-light lg:text-sm">{apartment.location}</p>
				<div className="text-meutral-900 flex items-center gap-2 font-semibold lg:text-sm">
					{apartment.rating}
					<Rating rating={apartment.rating} />
				</div>
			</div>
		</Link>
	)
}

export { Card }
