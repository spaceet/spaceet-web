import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "@radix-ui/react-slot"
import * as React from "react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
	{
		variants: {
			variant: {
				default: "bg-primary-100 text-white hover:bg-primary-100/80",
				destructive: "bg-red-800 text-red-200 hover:bg-red-800/80",
				outline: "border border-neutral-400 bg-transparent text-neutral-600",
				secondary: "bg-secondary-400 text-white hover:bg-secondary-400/80",
				ghost: "hover:bg-neutral-100 hover:text-primary-600",
				link: "text-primary underline-offset-4 hover:underline",
			},
			size: {
				default: "h-[45px] px-4 py-2",
				sm: "h-9 rounded-md px-3",
				lg: "h-14 rounded-md px-8",
				icon: "h-10 w-10",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	}
)

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : "button"
		return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
	}
)
Button.displayName = "Button"

export { Button, buttonVariants }
