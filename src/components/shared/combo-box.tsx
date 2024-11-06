import { Check, ChevronDown } from "lucide-react"
import React from "react"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib"
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command"

interface ComboxProps {
	data: {
		label: string
		value: string
	}[]
	onValueChange: (value: string) => void
	className?: string
	placeholder?: string
	value?: string
}

export function ComboBox({ data, onValueChange, className, placeholder, value }: ComboxProps) {
	const [open, setOpen] = React.useState(false)

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<button
					role="combobox"
					aria-controls="frameworks"
					aria-expanded={open}
					className={cn(
						`flex h-[45px] w-full items-center justify-between rounded-md border border-neutral-400 px-3 text-sm text-neutral-900`,
						className
					)}>
					<span className="flex flex-1 items-start">
						{value ? data.find((item) => item.value === value)?.label : placeholder}
					</span>
					<ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</button>
			</PopoverTrigger>
			<PopoverContent className="w-full bg-white">
				<Command className="w-full">
					<CommandInput placeholder={placeholder} />
					<CommandList>
						<CommandEmpty>No item matching the query</CommandEmpty>
						<CommandGroup>
							{data.map((item, index) => (
								<CommandItem
									key={`${item.value}-${index}`}
									value={item.value}
									className="cursor-pointer"
									onSelect={(currentValue) => {
										onValueChange(currentValue === value ? "" : currentValue)
										setOpen(false)
									}}>
									<Check
										className={cn("mr-2 h-4 w-4", value === item.value ? "opacity-100" : "opacity-0")}
									/>
									{item.label}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
