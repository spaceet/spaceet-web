import { addMonths, eachDayOfInterval, endOfMonth, format, startOfMonth, subMonths } from "date-fns"
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

	const calendarDays = Array(42).fill(null)

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
								className="flex items-center border-l px-[7px] first:border-l-0 first:px-[37px]">
								<p className="text-xs text-[#252525]">{day}</p>
							</div>
						))}
					</div>
					<div className="h-full w-full overflow-y-auto pb-5">
						<div className="grid w-full grid-cols-7">
							{calendarDays.map((day, index) => (
								<div
									key={index}
									className={`h-[158px] w-full flex-shrink-0 border-b border-l py-3 first:border-l-0 hover:bg-primary-100/15 ${index % 7 === 0 ? "px-[37px]" : ""}`}>
									{day && (
										<p
											className={`px-[7px] text-sm ${format(day, "MM-dd") === format(new Date(), "MM-dd") ? "font-bold" : ""}`}>
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
