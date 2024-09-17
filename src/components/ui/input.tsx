import { Eye, EyeOff } from "lucide-react"
import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	error?: string
	label?: string
	labelClassName?: string
	innerClassName?: string
	wrapperClassName?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	(
		{
			className,
			error,
			innerClassName,
			label,
			labelClassName,
			required,
			type,
			wrapperClassName,
			...props
		},
		ref
	) => {
		const [showPassword, setShowPassword] = React.useState(false)

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
						"flex h-[45px] w-full items-center gap-2 rounded-md border border-neutral-400 px-3 py-2",
						innerClassName
					)}>
					<input
						type={showPassword ? "text" : type}
						className={cn(
							"flex h-full w-full border-0 bg-transparent text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
							className
						)}
						ref={ref}
						{...props}
					/>
					{type === "password" && (
						<button
							type="button"
							className="size-4 text-neutral-600"
							onClick={() => setShowPassword(!showPassword)}>
							{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
						</button>
					)}
				</div>
				{error && <span className="text-xs font-medium text-error-400">{error}</span>}
			</div>
		)
	}
)
Input.displayName = "Input"

export { Input }
