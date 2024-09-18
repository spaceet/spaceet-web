import React from "react"

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	onValueChange: (value: boolean) => void
}

const CustomCheckable = React.forwardRef<HTMLInputElement, Props>(
	({ checked, className, onValueChange, ...props }, ref) => {
		const handleToggle = (newValue: boolean) => {
			onValueChange(newValue)
		}

		return (
			<div className={`flex items-center gap-4 ${className}`}>
				<input
					ref={ref}
					type="checkbox"
					checked={checked}
					onChange={(e) => handleToggle(e.target.checked)}
					className="peer hidden"
					{...props}
				/>
				<button
					type="button"
					onClick={() => handleToggle(false)}
					className="inline-flex h-[45px] w-[70px] items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-primary-100 px-4 py-2 text-sm font-medium text-white transition-colors peer-checked:border peer-checked:bg-transparent peer-checked:text-neutral-900">
					No
				</button>
				<button
					type="button"
					onClick={() => handleToggle(true)}
					className="inline-flex h-[45px] w-[70px] items-center justify-center gap-2 whitespace-nowrap rounded-lg border px-4 py-2 text-sm font-medium text-neutral-900 transition-colors peer-checked:border-0 peer-checked:bg-primary-100 peer-checked:text-white">
					Yes
				</button>
			</div>
		)
	}
)

CustomCheckable.displayName = "CustomCheckable"

export { CustomCheckable }
