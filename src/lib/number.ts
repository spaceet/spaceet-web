import { ReviewProps } from "@/types"

export const calculateRating = (reviews: ReviewProps[]) => {
	const totalRating = reviews.reduce((acc, review) => acc + review.review_rating, 0)
	const averageRating = totalRating / reviews.length
	return Number(averageRating.toFixed(1))
}
