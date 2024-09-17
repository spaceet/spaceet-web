import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	error?: string
	label?: string
	labelClassName?: string
	innerClassName?: string
	wrapperClassName?: string
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
	(
		{ className, error, innerClassName, label, labelClassName, required, wrapperClassName, ...props },
		ref
	) => {
		return (
			<div className={cn("flex w-full flex-col gap-1", wrapperClassName)}>
				{label && (
					<label
						htmlFor={props.id ?? props.name}
						className={cn("text-sm font-medium text-neutral-800", labelClassName)}>
						{label} {required && <span className="text-primary-200">*</span>}
					</label>
				)}
				<div
					className={cn(
						"flex h-[100px] w-full items-center gap-2 rounded-md border border-neutral-400 px-3 py-2",
						innerClassName
					)}>
					<textarea
						className={cn(
							"flex h-full w-full resize-none bg-transparent text-sm placeholder:text-neutral-300 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
							className
						)}
						ref={ref}
						{...props}
					/>
				</div>
				{error && <span className="text-xs font-medium text-error-400">{error}</span>}
			</div>
		)
	}
)
Textarea.displayName = "Textarea"

export { Textarea }
