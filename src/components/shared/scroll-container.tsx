import { RiArrowLeftSLine } from "@remixicon/react"
import Image from "next/image"
import Link from "next/link"
import React from "react"

import { LocationSearchProps, ApartmentProps } from "@/types"

interface Props {
	properties: ApartmentProps[]
}

export const ScrollContainer = ({ properties }: Props) => {
	const ref = React.useRef<HTMLDivElement>(null)!
	const [showButtons, setShowButtons] = React.useState({
		left: false,
		right: false,
	})

	const aggregateByLocation = (apartments: ApartmentProps[]) => {
		return apartments.reduce(
			(acc, apartment, index) => {
				const location = apartment.city
				if (!acc[location]) {
					acc[location] = {
						count: 0,
						id: `location-${index}`,
						image: apartment.images[0],
						location: location,
					}
				}
				acc[location].count++
				return acc
			},
			{} as Record<string, LocationSearchProps>
		)
	}

	const aggregated = React.useMemo(() => {
		return Object.values(aggregateByLocation(properties))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const handleScroll = () => {
		if (ref.current) {
			const { scrollLeft, scrollWidth, clientWidth } = ref.current
			setShowButtons((prev) => ({ ...prev, left: scrollLeft > 0 }))
			setShowButtons((prev) => ({ ...prev, right: scrollLeft < scrollWidth - clientWidth - 1 }))
		}
	}

	const scroll = (direction: "left" | "right") => {
		if (ref.current) {
			const scrollAmount = ref.current.clientWidth / 2
			ref.current.scrollBy({
				left: direction === "left" ? -scrollAmount : scrollAmount,
				behavior: "smooth",
			})
		}
	}

	React.useEffect(() => {
		const scrollContainer = ref.current
		if (scrollContainer) {
			scrollContainer.addEventListener("scroll", handleScroll)
			handleScroll()
			return () => scrollContainer.removeEventListener("scroll", handleScroll)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div className="relative mx-auto w-full">
			<div
				ref={ref}
				className="flex w-auto items-center gap-x-5 overflow-x-scroll"
				style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
				{aggregated.map((apartment) => (
					<Link
						href={`/search?${encodeURI(`bedrooms=0&location=${apartment.location}&price=0&propertyType=null`)}`}
						key={apartment.id}
						className="relative h-[225px] w-[235px] flex-shrink-0 rounded-lg lg:h-[310px] lg:w-[314px]">
						<div className="absolute left-0 top-0 !z-[1] flex size-full flex-col justify-end rounded-lg p-4 text-white">
							<p className="text-sm font-medium lg:text-xl">{apartment.location}</p>
							<p className="text-xs lg:text-sm">{apartment.count} Apartments</p>
						</div>
						<Image
							key={apartment.id}
							src={apartment.image}
							alt={apartment.location}
							fill
							sizes="(max-width: 1024px)100%"
							className="rounded-lg object-cover"
						/>
					</Link>
				))}
			</div>
			{showButtons.left && (
				<button
					onClick={() => scroll("left")}
					className="absolute left-5 top-1/2 !z-[2] grid size-6 -translate-y-1/2 place-items-center rounded-full bg-white">
					<RiArrowLeftSLine size={16} />
				</button>
			)}
			{showButtons.right && (
				<button
					onClick={() => scroll("right")}
					className="absolute right-5 top-1/2 !z-[2] grid size-6 -translate-y-1/2 rotate-180 place-items-center rounded-full bg-white">
					<RiArrowLeftSLine size={16} />
				</button>
			)}
		</div>
	)
}
