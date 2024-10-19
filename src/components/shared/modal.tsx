import { RemixiconComponentType, RiArrowRightDoubleLine } from "@remixicon/react"
import Link from "next/link"
import React from "react"

import { cn } from "@/lib"

type PriorityLevel = "error" | "success" | "warning" | "default"

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	icon: RemixiconComponentType
	href: string
	label: string
	text: string
	priority?: PriorityLevel
}

const PriorityColor: Record<PriorityLevel, string> = {
	error: "var(--error-300)",
	success: "var(--success-700)",
	warning: "var(--warning-300)",
	default: "var(--primary-100)",
}

const Modal = React.forwardRef<HTMLDivElement, Props>(
	({ icon: Icon, href, label, children, className, priority = "default", text, ...props }, ref) => {
		return (
			<div ref={ref} className={cn("w-full rounded-lg", className)} {...props}>
				<div className="flex w-full flex-col gap-6 rounded-t-lg p-6">
					<div className="flex w-full items-center justify-end"></div>
					<div className="flex w-full flex-col gap-4">
						<div
							style={{ borderColor: PriorityColor[priority] }}
							className="grid size-12 place-items-center rounded-full border-[10px]">
							<Icon size={16} />
						</div>
						<div className="flex w-full flex-col gap-1">
							<p className="font-semibold lg:text-xl">{label}</p>
							<div className="w-full">{children}</div>
						</div>
					</div>
				</div>
				<Link
					href={href}
					style={{ background: PriorityColor[priority] }}
					className="flex h-[50px] w-full items-center justify-center gap-2 rounded-b-lg font-medium text-white">
					{text}
					<RiArrowRightDoubleLine size={16} />
				</Link>
			</div>
		)
	}
)

Modal.displayName = "Modal"

export { Modal }
