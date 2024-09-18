import React from "react"

interface Props {
	rating: number
}

const MAX_RATING = 5

export const Rating = ({ rating }: Props) => {
	const stars = Array.from({ length: MAX_RATING }, (_, index) => {
		const fillPercentage = Math.min(Math.max((rating - index) * 100, 0), 100)

		return (
			<button key={index} className="inline-block size-4">
				<svg
					fill="#c0c0c0"
					width={16}
					height={16}
					viewBox="0 0 16 16"
					xmlns="http://www.w3.org/2000/svg">
					<path d="M8 1.5l2 4 4.5 0.5-3.5 3 1 4.5-4-2.5-4 2.5 1-4.5-3.5-3 4.5-0.5 2-4z" />
					<mask id={`star-mask-${index}`}>
						<rect x="0" y="0" width={`${fillPercentage}%`} height="100%" fill="white" />
					</mask>
					<path
						d="M8 1.5l2 4 4.5 0.5-3.5 3 1 4.5-4-2.5-4 2.5 1-4.5-3.5-3 4.5-0.5 2-4z"
						fill="#f9ba18"
						mask={`url(#star-mask-${index})`}
					/>
				</svg>
			</button>
		)
	})

	return <div className="flex items-center gap-[6px]">{stars}</div>
}
