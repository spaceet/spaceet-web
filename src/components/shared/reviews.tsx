import React from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ReviewProps } from "@/types"
import { getInitials } from "@/lib"
import { Rating } from "./rating"

interface Props {
	reviews: ReviewProps[]
}

export const Reviews = ({ reviews }: Props) => {
	const ref = React.useRef<HTMLDivElement>(null)!

	React.useEffect(() => {
		const row = ref.current

		if (!row) return

		let animationFrameId: number
		let accumulatedTime = 0
		let lastTimestamp = 0

		const animate = (timestamp: number) => {
			if (lastTimestamp !== 0) {
				const delta = timestamp - lastTimestamp
				accumulatedTime += delta
			}
			lastTimestamp = timestamp
			const progress = accumulatedTime * 0.05
			row.scrollLeft = progress
			if (progress >= row.scrollWidth) {
				accumulatedTime = 0
			}
			animationFrameId = requestAnimationFrame(animate)
		}

		animationFrameId = requestAnimationFrame(animate)
		return () => cancelAnimationFrame(animationFrameId)
	}, [ref])

	return (
		<div className="w-full overflow-hidden">
			<div
				ref={ref}
				className="mx-2 flex w-auto items-center gap-x-2 overflow-x-scroll"
				style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
				{reviews.map((review, index) => (
					<div
						key={index}
						className="flex h-[300px] w-[391px] flex-shrink-0 flex-col gap-6 rounded-2xl bg-white p-6">
						<p className="h-[178px] w-full text-neutral-700">
							{review.review_review.length > 300
								? `${review.review_review.substring(0, 300)}...`
								: review.review_review}
						</p>
						<div className="flex items-center gap-3">
							<Avatar className="size-12 border bg-primary-50">
								<AvatarImage src={review.user_profile_image} alt={review.user_first_name} />
								<AvatarFallback>
									{getInitials(`${review.user_first_name} ${review.user_last_name}`)}
								</AvatarFallback>
							</Avatar>
							<div className="flex flex-col">
								<p className="flex items-center gap-0.5 font-medium">
									{review.user_first_name} {review.user_last_name}
								</p>
								<div className="flex items-center gap-1 text-neutral-500">
									{review.review_rating}
									<Rating rating={review.review_rating} />
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
