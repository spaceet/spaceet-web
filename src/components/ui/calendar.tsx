import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"
import * as React from "react"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
	return (
		<DayPicker
			showOutsideDays={showOutsideDays}
			className={cn("p-3", className)}
			classNames={{
				months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
				month: "space-y-4",
				caption: "flex justify-center pt-1 relative items-center",
				caption_label: "text-sm font-medium",
				nav: "space-x-1 flex items-center",
				nav_button: cn(
					buttonVariants({ variant: "outline" }),
					"h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
				),
				nav_button_previous: "absolute left-1",
				nav_button_next: "absolute right-1",
				table: "w-full border-collapse space-y-1",
				head_row: "flex",
				head_cell: "text-neutral-400 rounded-md w-9 font-normal text-[0.8rem]",
				row: "flex w-full mt-2",
				cell:
					"h-8 w-8 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-md [&:has([aria-selected].day-outside)]:bg-neutral-500/50 [&:has([aria-selected])]:bg-neutral-500 first:[&:has([aria-selected])]:rounded-md last:[&:has([aria-selected])]:rounded-md focus-within:relative focus-within:z-20",
				day: cn(
					buttonVariants({ variant: "ghost" }),
					"h-8 w-8 p-0 font-normal aria-selected:opacity-100"
				),
				day_range_end: "day-range-end",
				day_selected:
					"bg-primary-100 text-white hover:bg-primary-100/50 hover:text-white rounded-md focus:bg-primary-/75",
				day_today: "bg-neutral-500 text-neutral-700",
				day_outside:
					"day-outside text-neutral-400 opacity-50 aria-selected:bg-neutral-500/50 aria-selected:text-neutral-400 aria-selected:opacity-30",
				day_disabled: "text-neutral-400 opacity-50",
				day_range_middle: "aria-selected:bg-neutral-500 aria-selected:text-neutral-700",
				day_hidden: "invisible",
				...classNames,
			}}
			components={{
				IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" {...props} />,
				IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" {...props} />,
			}}
			{...props}
		/>
	)
}
Calendar.displayName = "Calendar"

export { Calendar }
