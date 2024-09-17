import { motion } from "framer-motion"
import React from "react"

import { cn } from "@/lib"

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	delay?: number
	duration?: number
}

const FadeTransition = React.forwardRef<HTMLDivElement, Props>(
	({ children, className, delay = 0.1, duration = 0.5 }, ref) => {
		return (
			<motion.div
				ref={ref}
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				transition={{ type: "tween", delay, duration }}
				className={cn("", className)}>
				{children}
			</motion.div>
		)
	}
)

FadeTransition.displayName = "FadeTransition"

export { FadeTransition }
