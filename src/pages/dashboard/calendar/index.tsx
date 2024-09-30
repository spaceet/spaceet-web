import {
	addDays,
	addMonths,
	eachDayOfInterval,
	endOfMonth,
	format,
	formatDate,
	startOfMonth,
	subDays,
	subMonths,
} from "date-fns"
import { RiArrowLeftSLine } from "@remixicon/react"
import React from "react"

import DashboardLayout from "@/components/layouts/dashboard-layout"
import { Seo } from "@/components/shared"
import { getMonthInWords } from "@/lib"

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

const Page = () => {
	const [date, setDate] = React.useState(new Date())

	const handleAddMonth = () => setDate(addMonths(date, 1))
	const handleSubMonth = () => setDate(subMonths(date, 1))

	const daysInMonth = eachDayOfInterval({
		start: startOfMonth(date),
		end: endOfMonth(date),
	})

	const firstDayOfMonth = startOfMonth(date).getDay()
	const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1
	const lastDayOfMonth = endOfMonth(date)
	const startDate = subDays(firstDayOfMonth, adjustedFirstDay)
	const endDate = addDays(lastDayOfMonth, 35 - adjustedFirstDay - daysInMonth.length)
	const calendarDays = eachDayOfInterval({ start: startDate, end: endDate })

	daysInMonth.forEach((day, index) => {
		calendarDays[index + adjustedFirstDay] = day
	})

	return (
		<>
			<Seo title="Calendar" />
			<DashboardLayout>
				<div className="h-full w-full">
					<div className="flex h-[69px] w-full items-center gap-2 px-[37px]">
						<div className="flex items-center">
							<p className="px-3 text-xl">
								{getMonthInWords(date)} <span className="text-neutral-400">{date.getFullYear()}</span>
							</p>
							<span className="rounded border bg-neutral-200 px-2 py-1 text-xs">Today</span>
						</div>
						<div className="flex items-center gap-6">
							<button onClick={handleSubMonth}>
								<RiArrowLeftSLine size={24} />
							</button>
							<button onClick={handleAddMonth}>
								<RiArrowLeftSLine size={24} className="rotate-180" />
							</button>
						</div>
					</div>
					<div className="grid h-11 w-full grid-cols-7 bg-neutral-200">
						{daysOfWeek.map((day, index) => (
							<div
								key={index}
								className={`relative flex items-center border-l px-[7px] before:absolute before:left-0 before:top-full before:h-2 before:w-full before:bg-primary-100 first:border-l-0 first:px-[37px] ${String(day).toLowerCase() === formatDate(new Date(), "EEEE").toLowerCase() ? "before:block" : "before:hidden"}`}>
								<p className="text-xs text-[#252525]">{day}</p>
							</div>
						))}
					</div>
					<div className="h-full w-full overflow-y-auto pb-28">
						<div className="grid h-auto w-full grid-cols-7">
							{calendarDays.slice(0, 42).map((day, index) => (
								<div
									key={index}
									className={`h-[158px] w-full flex-shrink-0 border-b border-l py-3 first:border-l-0 ${index % 7 === 0 ? "px-[37px]" : ""}`}>
									{day && (
										<p
											className={`px-[7px] text-sm ${
												format(day, "MM-dd") === format(new Date(), "MM-dd")
													? "font-bold"
													: format(day, "MM") !== format(date, "MM")
														? "text-neutral-400"
														: ""
											}`}>
											{format(day, "d")}
										</p>
									)}
								</div>
							))}
						</div>
					</div>
				</div>
			</DashboardLayout>
		</>
	)
}
export default Page
