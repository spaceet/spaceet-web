import { useMutation } from "@tanstack/react-query"
import { useFormik } from "formik"
import { toast } from "sonner"
import React from "react"

import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { AddReviewDto, AddReviewMutation } from "@/queries"
import { queryClient } from "@/providers"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Spinner } from "./spinner"
import { HttpError } from "@/types"

interface Props {
	id: string
	onClose: () => void
}

const MAX_RATING = 5
const initialValues: AddReviewDto = {
	rating: 0,
	review: "",
}

export const RatingForm = ({ id, onClose }: Props) => {
	const { isPending, mutateAsync } = useMutation({
		mutationFn: (payload: AddReviewDto) => AddReviewMutation(id, payload),
		mutationKey: ["add-review"],
		onSuccess: () => {
			toast.success("Review added successfully")
			queryClient.invalidateQueries({ queryKey: ["get-apartment", id] })
			onClose()
		},
		onError: ({ response }: HttpError) => {
			const { message } = response.data
			toast.error(message)
		},
	})

	const { handleChange, handleSubmit, setFieldValue, values } = useFormik({
		initialValues,
		onSubmit: (values) => {
			if (!values.rating) {
				toast.error("Please select a rating")
				return
			}
			if (!values.review) {
				toast.error("Please write a review")
				return
			}
			mutateAsync(values)
		},
	})

	return (
		<form onSubmit={handleSubmit} className="mt-5 flex w-full flex-col gap-4">
			<div className="flex w-full flex-col gap-3">
				<Label htmlFor="rating">Rating</Label>
				<div className="flex w-full items-center justify-between">
					<Rating rating={values.rating} setRating={(rating) => setFieldValue("rating", rating)} />
					<div className="flex items-center rounded bg-neutral-200 text-sm">
						{values.rating.toFixed(1)}/{MAX_RATING.toFixed(1)}
					</div>
				</div>
			</div>
			<div className="flex w-full flex-col gap-3">
				<Label htmlFor="rating">Will you recommend this apartment to your friend?</Label>
				<RadioGroup>
					<div className="flex w-full items-center gap-4">
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="yes" id="yes" />
							<Label htmlFor="yes">Yes</Label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="no" id="no" />
							<Label htmlFor="no">No</Label>
						</div>
					</div>
				</RadioGroup>
			</div>
			<div className="flex w-full flex-col gap-3">
				<Label htmlFor="rating">Enter review</Label>
				<Textarea
					name="review"
					onChange={handleChange}
					className="h-[88px]"
					placeholder="Enter your review"
				/>
			</div>
			<Button type="submit" disabled={isPending}>
				{isPending ? <Spinner /> : "Submit response"}
			</Button>
		</form>
	)
}

interface RatingProps {
	rating: number
	setRating: (rating: number) => void
}

const Rating = ({ rating, setRating }: RatingProps) => {
	const stars = Array.from({ length: MAX_RATING }, (_, index) => {
		const fillPercentage = Math.min(Math.max((rating - index) * 100, 0), 100)
		const starColor = index < rating ? "#ffc107" : "#c0c0c0"

		return (
			<button
				type="button"
				onClick={() => setRating(index + 1)}
				key={index}
				className="grid size-8 place-items-center rounded border">
				<svg
					fill="#c0c0c0"
					width={24}
					height={24}
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg">
					<path
						d="M12 2l3 6 6.5 1-5 4.5 1.5 6.5-6-3.5-6 3.5 1.5-6.5-5-4.5 6.5-1 3-6z"
						fill={starColor}
					/>
					<mask id={`star-mask-${index}`}>
						<rect x="0" y="0" width={`${fillPercentage}%`} height="100%" fill="white" />
					</mask>
					<path
						d="M12 2l3 6 6.5 1-5 4.5 1.5 6.5-6-3.5-6 3.5 1.5-6.5-5-4.5 6.5-1 3-6z"
						fill={`url(#star-mask-${index})`}
					/>
				</svg>
			</button>
		)
	})

	return <div className="flex items-center gap-3">{stars}</div>
}
