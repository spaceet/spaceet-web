import { Calendar as CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import React from "react"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"

interface Props {
	date: string
	setDate: React.Dispatch<React.SetStateAction<string>>
	className?: string
	label?: string
	name?: string
}

export const DatePicker = ({ date, setDate, className, label, name }: Props) => {
	const [open, setOpen] = React.useState(false)
	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<button className={cn("flex w-fit flex-col py-1", className)}>
					{label && (
						<label htmlFor={name} className="px-2 text-sm font-medium text-neutral-400">
							{label}
						</label>
					)}
					<span
						className={`flex h-[51px] w-full items-center justify-center gap-2 rounded-3xl border px-3 text-sm ${date ? "text-neutral-700" : "text-neutral-400"}`}>
						<CalendarIcon size={16} />
						{!date ? "Pick a date" : format(new Date(date), "dd/MM/yyyy")}
					</span>
				</button>
			</PopoverTrigger>
			<PopoverContent className="bg-white">
				<Calendar
					mode="single"
					selected={new Date(date)}
					onSelect={(date) => {
						setDate(format(String(date), "yyyy-MM-dd"))
						setOpen(false)
					}}
				/>
			</PopoverContent>
		</Popover>
	)
}
