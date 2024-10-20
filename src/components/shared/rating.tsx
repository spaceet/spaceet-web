import { RiStarFill } from "@remixicon/react"
import React from "react"

interface Props {
	rating: number
}

const MAX_RATING = 5

export const Rating = ({ rating }: Props) => {
	const stars = Array.from({ length: MAX_RATING }, (_, index) => {
		return (
			<RiStarFill
				key={index}
				className={`inline-block size-4 ${rating >= index + 1 ? "text-primary-100" : "text-gray-400"}`}
			/>
		)
	})

	return <div className="flex items-center gap-[6px]">{stars}</div>
}
