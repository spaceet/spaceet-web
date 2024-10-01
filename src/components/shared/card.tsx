import { RiArrowLeftSLine } from "@remixicon/react"
import { useSwipeable } from "react-swipeable"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import React from "react"

import { PropertyProps } from "@/types"
import { formatCurrency } from "@/lib"
import { fade } from "@/config"

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

	const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		e.stopPropagation()
		setCurrent((prev) => (prev + 1) % apartment.images.length)
	}

	const handlePrev = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		e.stopPropagation()
		setCurrent((prev) => (prev - 1 + apartment.images.length) % apartment.images.length)
	}

	return (
		<Link
			href={`/apartments/${apartment.id}`}
			className="flex h-auto w-[214px] flex-shrink-0 flex-col lg:w-full">
			<div className="flex aspect-[95/100] w-full items-center justify-center overflow-hidden rounded-md border bg-neutral-300">
				{apartment.images.map((image, idx) => (
					<motion.div
						key={idx}
						className={`group relative aspect-[95/100] w-full rounded-md ${idx === current ? "block" : "hidden"}`}>
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
							{formatCurrency(apartment.price, "NGN")}/night
						</motion.div>
						<Image
							key={idx}
							src={image}
							alt={apartment.name}
							fill
							sizes="(max-width: 1024px)100%"
							className="rounded-md object-cover"
						/>
					</motion.div>
				))}
			</div>
			<div className="flex w-full flex-col py-2">
				<p className="text-sm font-semibold lg:text-lg">{apartment.name}</p>
				<p className="text-meutral-400 text-xs font-light lg:text-sm">{apartment.location}</p>
				<div className="text-meutral-900 flex items-center gap-2 font-semibold lg:text-sm">
					{formatCurrency(apartment.price, "NGN")}/night
				</div>
			</div>
		</Link>
	)
}

export { Card }
