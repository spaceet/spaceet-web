import { format } from "date-fns"
import React from "react"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"

interface Props {
	date: string
	setDate: (date?: Date | string) => void
	className?: string
	label?: string
	name?: string
	required?: boolean
}

export const DatePicker = ({ date, setDate, className, label, name, required }: Props) => {
	const [open, setOpen] = React.useState(false)

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<button className={cn("flex w-full flex-col")}>
					{label && (
						<label htmlFor={name} className="text-sm font-medium text-neutral-800">
							{label}
							{required && <span className="text-primary-200">*</span>}
						</label>
					)}
					<span
						className={cn(
							`flex h-[45px] w-full items-center gap-2 rounded-md border px-3 text-sm ${date ? "text-neutral-700" : "text-neutral-400"}`,
							className
						)}>
						{!date ? "Pick a date" : format(new Date(date), "dd/MM/yyyy")}
					</span>
				</button>
			</PopoverTrigger>
			<PopoverContent className="bg-white">
				<Calendar
					mode="single"
					selected={new Date(date)}
					onSelect={(date) => {
						setDate(date)
						setOpen(false)
					}}
					required={required}
				/>
			</PopoverContent>
		</Popover>
	)
}
