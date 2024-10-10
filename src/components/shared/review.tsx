import { RiStarSFill } from "@remixicon/react"
import React from "react"

import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { getInitials, getTimeFromNow } from "@/lib"
import { ReviewProps } from "@/types"

interface Props {
	review: ReviewProps
}

export const Review = ({ review }: Props) => {
	const [open, setOpen] = React.useState(false)

	return (
		<div className="flex aspect-[1.07/1] w-full flex-shrink-0 flex-col gap-5 rounded-2xl border px-5 py-6 lg:w-[276px]">
			<div className="flex items-center gap-2">
				<Avatar className="size-10">
					<AvatarImage src="" alt="" className="object-cover" />
					<AvatarFallback className="bg-black text-sm font-medium text-white lg:text-base">
						{getInitials("Samson Okunola")}
					</AvatarFallback>
				</Avatar>
				<div className="flex flex-col">
					<p className="font-medium">Samson Okunola</p>
					<p className="text-xs text-neutral-400 lg:text-sm">Oshodi, Lagos</p>
				</div>
			</div>
			<div className="flex h-full w-full flex-col items-start gap-2 lg:max-h-[122px]">
				<p className="text-sm text-neutral-500 lg:text-base">
					{review.review_review.length > 100
						? `${review.review_review.slice(0, 100)}...`
						: review.review_review}
				</p>
				{review.review_review.length > 100 && (
					<Dialog open={open} onOpenChange={setOpen}>
						<DialogTrigger className="text-xs font-semibold underline">Show more</DialogTrigger>
						<DialogContent>
							<DialogTitle>Review</DialogTitle>
							<DialogDescription hidden></DialogDescription>
							<div className="flex w-full flex-col gap-5">
								<div className="flex items-center gap-2">
									<Avatar className="size-10">
										<AvatarImage
											src={review.user_profile_image}
											alt={review.user_first_name}
											className="object-cover"
										/>
										<AvatarFallback className="bg-black text-sm font-medium text-white lg:text-base">
											{getInitials(`${review.user_first_name} ${review.user_last_name}`)}
										</AvatarFallback>
									</Avatar>
									<div className="flex flex-col">
										<p className="font-medium">Samson Okunola</p>
										<p className="text-xs text-neutral-400 lg:text-sm">Oshodi, Lagos</p>
									</div>
								</div>
								<div className="flex h-full w-full flex-col items-start gap-2 lg:max-h-[122px]">
									<p className="text-sm text-neutral-500 lg:text-base">{review.review_review}</p>
								</div>
								<div className="flex items-center gap-2">
									<div className="flex items-center gap-[6px]">
										<p className="text-sm lg:text-base">{review.review_rating}</p>
										<RiStarSFill className="size-[18px] text-primary-100" />
									</div>
									<span className="size-[6px] rounded-full bg-neutral-400"></span>
									<p className="text-sm text-neutral-400 lg:text-base">
										{getTimeFromNow(review.review_createdOn)}
									</p>
								</div>
							</div>
						</DialogContent>
					</Dialog>
				)}
			</div>
			<div className="flex items-center gap-2">
				<div className="flex items-center gap-[6px]">
					<p className="text-sm lg:text-base">{review.review_rating}</p>
					<RiStarSFill className="size-[18px] text-primary-100" />
				</div>
				<span className="size-[6px] rounded-full bg-neutral-400"></span>
				<p className="text-sm text-neutral-400 lg:text-base">
					{getTimeFromNow(review.review_createdOn)}
				</p>
			</div>
		</div>
	)
}
