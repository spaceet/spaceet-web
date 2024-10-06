import { addWeeks, eachDayOfInterval, format, startOfWeek, endOfWeek, subWeeks } from "date-fns"
import { RiArrowLeftSLine } from "@remixicon/react"
import React from "react"

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

export const CalendarSmall = () => {
	const [currentWeek, setCurrentWeek] = React.useState(new Date())

	const handleNextWeek = () => setCurrentWeek(addWeeks(currentWeek, 1))
	const handlePrevWeek = () => setCurrentWeek(subWeeks(currentWeek, 1))

	const weekStart = startOfWeek(currentWeek)
	const weekEnd = endOfWeek(currentWeek)
	const daysInWeek = eachDayOfInterval({ start: weekStart, end: weekEnd })
	const today = new Date()

	return (
		<div className="gsp-5 flex h-full w-full flex-col lg:hidden">
			<div className="flex items-center p-4">
				<div className="flex items-center">
					<p className="px-3 text-xl">
						{format(weekStart, "MMMMMM")}
						<span className="ml-1 text-neutral-400">{format(weekStart, "yyyy")}</span>
					</p>
					<span className="rounded border bg-neutral-200 px-2 py-1 text-xs">Today</span>
				</div>
				<div className="flex items-center gap-6">
					<button onClick={handlePrevWeek}>
						<RiArrowLeftSLine size={24} />
					</button>
					<button onClick={handleNextWeek}>
						<RiArrowLeftSLine size={24} className="rotate-180" />
					</button>
				</div>
			</div>
			<div className="mb-7 flex w-full items-center lg:hidden">
				{daysOfWeek.map((day, index) => {
					const date = new Date(
						today.getFullYear(),
						today.getMonth(),
						today.getDate() - today.getDay() + index
					)
					const isToday = format(date, "EEEE").toLowerCase() === format(today, "EEEE").toLowerCase()
					return (
						<div
							key={index}
							className={`flex h-16 flex-1 flex-shrink-0 flex-col items-center gap-0.5 rounded px-3 py-[6px] ${
								isToday ? "bg-primary-100 text-white" : "text-neutral-900"
							}`}>
							<p className="text-xs">{isToday ? day.substring(0, 3) : day.substring(0, 1)}</p>
							<p className="grid h-7 place-items-center text-sm font-semibold">{format(date, "d")}</p>
						</div>
					)
				})}
			</div>
			<div className="flex w-full flex-col gap-6 overflow-y-auto px-5">
				{daysInWeek.map((day, index) => (
					<div key={index} className="flex w-full flex-col gap-6">
						<p
							className={`${format(day, "dd-MM-yyyy") === format(new Date(), "dd-MM-yyyy") ? "font-medium text-neutral-900" : "text-neutral-500"}`}>
							{format(day, "MMM dd, yyyy")}
						</p>
						<div className="flex w-full flex-col gap-4"></div>
					</div>
				))}
			</div>
		</div>
	)
}
