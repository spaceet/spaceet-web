import { RiAddLine, RiSubtractLine } from "@remixicon/react"
import React from "react"

interface Props {
	setValue: (value: number) => void
	value: number
}

export const Counter = ({ setValue, value }: Props) => {
	const decrement = () => {
		if (value === 1) return
		setValue(value - 1)
	}
	const increment = () => {
		if (value === 10) return
		setValue(value + 1)
	}
	return (
		<div className="flex h-10 items-center gap-3 rounded border">
			<button className="flex w-8 items-center justify-center disabled:opacity-50" onClick={decrement}>
				<RiSubtractLine size={18} />
			</button>
			<input type="number" value={value} readOnly className="w-4 text-center" />
			<button className="flex w-8 items-center justify-center disabled:opacity-50" onClick={increment}>
				<RiAddLine size={18} />
			</button>
		</div>
	)
}
