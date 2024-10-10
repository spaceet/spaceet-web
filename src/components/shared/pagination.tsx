import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react"
import React from "react"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Button } from "../ui/button"

interface Props {
	current: number
	onPageChange: (page: number) => void
	onRowChange: (row: number) => void
	pageSize: number
	total: number
}

export const Pagination = (props: Props) => {
	const { current, onPageChange, onRowChange, pageSize, total } = props
	const totalPages = Math.ceil(total / pageSize)
	const [page, setPage] = React.useState(1)

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
			className={`grid size-8 place-items-center rounded-md text-sm font-medium ${current === index ? "bg-neutral-200 text-neutral-900" : "text-neutral-400"}`}>
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

	const rowIntervals = React.useMemo(() => {
		let numbers = []
		for (let i = 10; i <= 30; i += 5) {
			numbers.push(i)
		}
		return numbers
	}, [])

	return (
		<div className="flex w-full items-center justify-between">
			<div className="flex items-center gap-2">
				<p className="text-sm text-neutral-400">Rows per page</p>
				<Select value={String(pageSize)} onValueChange={(value) => onRowChange(Number(value))}>
					<SelectTrigger className="h-8 w-[62px] border-neutral-300">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						{rowIntervals.map((interval) => (
							<SelectItem key={interval} value={String(interval)}>
								{interval}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
			<div className="flex items-center gap-2">
				<div className="flex items-center gap-5">
					<Button
						className="h-8 text-xs"
						variant="outline"
						onClick={goToPrevious}
						disabled={current === 1}>
						<RiArrowLeftSLine size={16} />
						Prev
					</Button>
					<div className="flex items-center">{renderButtons()}</div>
					<Button
						className="h-8 text-xs"
						variant="outline"
						onClick={goToNext}
						disabled={current === totalPages}>
						Next
						<RiArrowRightSLine size={16} />
					</Button>
				</div>
				<div className="text-xl text-neutral-400">/</div>
				<div className="flex items-center gap-2">
					<p className="text-sm text-neutral-400">Go to page</p>
					<input
						type="number"
						value={page}
						onChange={(e) => setPage(Number(e.target.value))}
						className="size-8 rounded-md border border-neutral-300 px-2 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50"
						disabled={totalPages < 2}
					/>
					<Button
						className="h-8 w-fit text-xs"
						variant="outline"
						onClick={() => {
							if (page >= 1 && page <= totalPages) {
								onPageChange(page)
							}
						}}
						disabled={totalPages < 2 || current === page}>
						Go
						<RiArrowRightSLine size={16} />
					</Button>
				</div>
			</div>
			<div className="flex items-center gap-2">
				<p className="text-sm font-medium text-neutral-400">
					Showing {(current - 1) * pageSize + 1} - {Math.min(current * pageSize, total)} of {total}
				</p>
			</div>
		</div>
	)
}
