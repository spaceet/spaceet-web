import { RemixiconComponentType } from "@remixicon/react"
import React from "react"

import { TrendDown, TrendUp } from "@/assets/svg"

type ArrowDirection = "down" | "up"

interface Props {
	direction: ArrowDirection
	icon: RemixiconComponentType
	label: string
	percentage: number
	value: number
}

const pillClasses: Record<ArrowDirection, string> = {
	down: "bg-red-100 border-red-300 text-red-800",
	up: "bg-green-100 border-green-300 text-green-800",
}

export const DataCard = ({ direction, icon: Icon, label, percentage, value }: Props) => {
	return (
		<div className="flex w-full flex-1 items-start gap-3 px-6">
			<div className="grid size-10 place-items-center rounded-md bg-neutral-200">
				<Icon />
			</div>
			<div className="flex flex-col gap-3">
				<p className="text-sm text-neutral-400">{label}</p>
				<div className="flex items-center gap-3">
					<p className="text-[32px] font-medium">{value}</p>
					<div
						className={`${pillClasses[direction]} flex items-center rounded-md border px-2 py-0.5 text-sm font-medium`}>
						{direction === "down" ? <TrendDown /> : <TrendUp />}
						&nbsp;
						{percentage}%
					</div>
				</div>
			</div>
		</div>
	)
}
