import { Check, ChevronsUpDown } from "lucide-react"
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
	value: string
	placeholder?: string
}

export function ComboBox({ data, onValueChange, value, placeholder }: ComboxProps) {
	const [open, setOpen] = React.useState(false)

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<button
					role="combobox"
					aria-controls="frameworks"
					aria-expanded={open}
					className="flex h-[50px] w-full items-center justify-between rounded-md border px-3">
					{value ? data.find((item) => item.value === value)?.label : placeholder}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</button>
			</PopoverTrigger>
			<PopoverContent className="w-full bg-white">
				<Command>
					<CommandInput placeholder={placeholder} />
					<CommandList>
						<CommandEmpty>No item matching the query</CommandEmpty>
						<CommandGroup>
							{data.map((item) => (
								<CommandItem
									key={item.value}
									value={item.value}
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
