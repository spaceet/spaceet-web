export type AnimationDirectionProps = "down" | "up" | "left" | "right"
export type StaggerDirectionProps = "up" | "down" | "left" | "right"
export type AnimationZoomProps = "in" | "out"

export const transition = { type: "spring", duration: 1 }

export const fade = {
	initial: {
		opacity: 0.5,
		transition: { ...transition, delay: 0.75 },
	},
	whileInView: {
		opacity: 1,
		transition: { ...transition, delay: 0 },
	},
}

export const flash = {
	initial: {
		height: 0,
		tranformOrigin: "center",
		transition: { ...transition, delay: 0.75 },
	},
	whileInView: {
		height: "100%",
		transition: { ...transition, delay: 0 },
	},
}

export const slide = (direction: AnimationDirectionProps) => {
	return {
		initial: {
			x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
			y: direction === "up" ? "100%" : direction === "down" ? "-100%" : 0,
			opacity: 0,
			transition: { ...transition, delay: 0.75 },
		},
		whileInView: {
			x: 0,
			y: 0,
			opacity: 1,
			transition: { ...transition, delay: 0 },
		},
		exit: {
			x: direction === "left" ? "100%" : direction === "right" ? "-100%" : 0,
			y: direction === "up" ? "-100%" : direction === "down" ? "100%" : 0,
			opacity: 0,
			transition: { ...transition, delay: 0 },
		},
	}
}
export const stagger = (direction: StaggerDirectionProps, index: number) => {
	return {
		initial: {
			x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
			y: direction === "up" ? "100%" : direction === "down" ? "-100%" : 0,
			opacity: 0,
			transition: { ...transition, delay: 0.75 },
		},
		whileInView: {
			x: 0,
			y: 0,
			opacity: 1,
			transition: { ...transition, delay: (index + 1) * 0.1 },
		},
	}
}

export const zoom = (direction: AnimationZoomProps) => {
	return {
		initial: {
			scale: direction === "in" ? 0 : 1,
			opacity: 0,
			transition: { ...transition, delay: 0.75 },
		},
		whileInView: {
			scale: 1,
			opacity: 1,
			transition: { ...transition, delay: 0 },
		},
	}
}
