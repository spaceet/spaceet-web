import React from "react"

import { Button } from "../ui/button"

interface Props {
	current: number
	onPageChange: (page: number) => void
	pageSize: number
	total: number
}

export const Pagination = (props: Props) => {
	const { current, onPageChange, pageSize, total } = props
	const totalPages = Math.ceil(total / pageSize)

	const goToPrevious = () => {
		if (current > 1) {
			return onPageChange(current - 1)
		}
	}
	const goToNext = () => {
		if (current < totalPages) {
			onPageChange(current + 1)
		}
	}

	const renderPageButton = (index: number) => (
		<button
			key={index}
			onClick={() => onPageChange(index)}
			className={`grid size-8 place-items-center rounded-md text-sm font-medium ${current === index ? "bg-neutral-100 text-neutral-900" : "text-neutral-400"}`}>
			{index}
		</button>
	)

	const renderButtons = () => {
		const numbers = []
		const maxVisibleButtons = 5

		if (totalPages <= maxVisibleButtons) {
			for (let i = 1; i <= totalPages; i++) {
				numbers.push(renderPageButton(i))
			}
		} else {
			numbers.push(renderPageButton(1))

			if (current <= 3) {
				for (let i = 2; i <= 4; i++) {
					numbers.push(renderPageButton(i))
				}
				numbers.push(
					<span key="ellipsis" className="px-2">
						...
					</span>
				)
			} else if (current >= totalPages - 2) {
				numbers.push(
					<span key="ellipsis" className="px-2">
						...
					</span>
				)
				for (let i = totalPages - 3; i < totalPages; i++) {
					numbers.push(renderPageButton(i))
				}
			} else {
				numbers.push(
					<span key="ellipsis-start" className="px-2">
						...
					</span>
				)
				for (let i = current - 1; i <= current + 1; i++) {
					numbers.push(renderPageButton(i))
				}
				numbers.push(
					<span key="ellipsis-end" className="px-2">
						...
					</span>
				)
			}

			numbers.push(renderPageButton(totalPages))
		}

		return numbers
	}

	return (
		<div className="flex w-full items-center justify-between">
			<div className="flex items-center gap-2"></div>
			<div className="flex items-center gap-2">
				<div className="flex items-center gap-5">
					<Button variant="outline" onClick={goToPrevious} disabled={current === 1}>
						Previous
					</Button>
					<div className="flex items-center">{renderButtons()}</div>
					<Button variant="outline" onClick={goToNext} disabled={current === totalPages}>
						Next
					</Button>
				</div>
				<div className="flex items-center gap-2"></div>
			</div>
			<div className="flex items-center gap-2"></div>
		</div>
	)
}
