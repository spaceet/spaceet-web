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

	return (
		<div
			ref={ref}
			className="mx-2 flex w-auto items-center gap-x-2 overflow-x-scroll"
			style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
			{reviews.map((review, index) => (
				<div
					key={index}
					className="flex h-[300px] w-[391px] flex-shrink-0 flex-col gap-6 rounded-2xl bg-white p-6">
					<p className="h-[178px] w-full text-neutral-700">{review.comment}</p>
					<div className="flex items-center gap-3">
						<Avatar className="size-12 border bg-primary-50">
							<AvatarImage src={review.user.imageUrl} alt={review.user.firstName} />
							<AvatarFallback>
								{getInitials(`${review.user.firstName} ${review.user.lastName}`)}
							</AvatarFallback>
						</Avatar>
						<div className="flex flex-col">
							<p className="flex items-center gap-0.5 font-medium">
								{review.user.firstName} {review.user.lastName}
							</p>
							<div className="flex items-center gap-1 text-neutral-500">
								{review.rating}
								<Rating rating={review.rating} />
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	)
}