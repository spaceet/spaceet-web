import { AnimatePresence, motion } from "framer-motion"
import { RiArrowLeftSLine } from "@remixicon/react"
import { useSwipeable } from "react-swipeable"
import Image from "next/image"
import Link from "next/link"
import React from "react"

import { ApartmentsProps } from "@/types"
import { formatCurrency } from "@/lib"
import { fade, slide } from "@/config"

interface Props {
	apartment: ApartmentsProps
}

const Card = ({ apartment }: Props) => {
	const [current, setCurrent] = React.useState(0)

	const handlers = useSwipeable({
		onSwipedLeft: () => setCurrent((prev) => (prev + 1) % apartment.Apartment_images.length),
		onSwipedRight: () =>
			setCurrent(
				(prev) => (prev - 1 + apartment.Apartment_images.length) % apartment.Apartment_images.length
			),
		trackMouse: true,
		swipeDuration: 500,
		trackTouch: true,
	})

	const handleClick = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
		e.preventDefault()
		e.stopPropagation()
		setCurrent(index)
	}

	const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		e.stopPropagation()
		setCurrent((prev) => (prev + 1) % apartment.Apartment_images.length)
	}

	const handlePrev = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		e.stopPropagation()
		setCurrent(
			(prev) => (prev - 1 + apartment.Apartment_images.length) % apartment.Apartment_images.length
		)
	}

	return (
		<AnimatePresence key={`card-${apartment.Apartment_id}`} mode="sync">
			<Link
				href={`/apartments/${apartment.Apartment_id}`}
				style={{ viewTransitionName: `card-${apartment.Apartment_id}` }}
				className="card flex h-auto w-[214px] flex-shrink-0 flex-col lg:w-full lg:max-w-[285px]">
				<div className="flex aspect-[95/100] w-full items-center justify-center overflow-hidden rounded-md border bg-neutral-300">
					{apartment.Apartment_images.map((image, index) => (
						<motion.div
							{...slide("left")}
							key={index}
							className={`group relative aspect-[95/100] w-full rounded-md ${index === current ? "block" : "hidden"}`}>
							<div
								{...handlers}
								onClick={(e) => e.stopPropagation()}
								className="absolute bottom-[10px] left-1/2 !z-[5] flex -translate-x-1/2 items-center justify-center gap-2">
								{apartment.Apartment_images.map((_, index) => (
									<button
										key={index}
										onClick={(e) => handleClick(e, index)}
										className={`size-2 rounded-full ${index === current ? "bg-white" : "bg-white/50"}`}></button>
								))}
							</div>
							<motion.div
								{...fade}
								className="absolute left-0 top-1/2 !z-[5] hidden w-full -translate-y-1/2 items-center justify-between px-3 group-hover:flex">
								<button
									className="grid size-6 place-items-center rounded-full bg-white"
									onClick={handlePrev}>
									<RiArrowLeftSLine size={16} />
								</button>
								<button
									className="grid size-6 rotate-180 place-items-center rounded-full bg-white"
									onClick={handleNext}>
									<RiArrowLeftSLine size={16} />
								</button>
							</motion.div>
							<motion.div
								{...fade}
								className="absolute right-3 top-3 !z-[5] hidden rounded-md bg-white px-3 py-2 font-medium text-neutral-900 transition-all duration-500 group-hover:block lg:text-xs">
								{formatCurrency(apartment.price_cost_per_night, "NGN")}/night
							</motion.div>
							<Image
								key={index}
								src={image}
								alt={apartment.Apartment_name}
								fill
								sizes="(max-width: 1024px)100%"
								className="rounded-md object-cover"
								priority
							/>
						</motion.div>
					))}
				</div>
				<div className="flex w-full flex-col py-2">
					<p className="text-sm font-semibold capitalize lg:text-lg">{apartment.Apartment_name}</p>
					<p className="text-meutral-400 text-xs font-light capitalize lg:text-sm">
						{apartment.Apartment_city}, {apartment.Apartment_state}
					</p>
					<div className="text-meutral-900 flex items-center gap-2 font-semibold lg:text-sm">
						{formatCurrency(apartment.price_cost_per_night, "NGN")}/night
					</div>
				</div>
			</Link>
		</AnimatePresence>
	)
}

export { Card }
