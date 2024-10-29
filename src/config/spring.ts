// import { SpringValue } from "@react-spring/web"

export type SpringDirection = "down" | "up" | "left" | "right"
export type SpringZoom = "in" | "out"

interface SpringConfig {
	mass?: number
	tension?: number
	friction?: number
	precision?: number
	velocity?: number
	duration?: number
}

interface SpringPresetOptions {
	distance?: number // percentage for slide/stagger animations
	duration?: number // animation duration in ms
	delay?: number // delay in ms
	config?: SpringConfig
}

type SpringAnimationValue = {
	opacity?: number
	scale?: number
	x?: number | string
	y?: number | string
}

interface SpringPreset {
	from: SpringAnimationValue
	to: SpringAnimationValue
	config?: SpringConfig
	delay?: number
}

// Optimized spring configurations for different animation types
const springConfigs = {
	gentle: {
		mass: 1,
		tension: 170,
		friction: 26,
	},
	bouncy: {
		mass: 1.2,
		tension: 180,
		friction: 14,
	},
	smooth: {
		mass: 1,
		tension: 280,
		friction: 60,
	},
} as const

/**
 * Provides a set of optimized spring animation presets for different animation types, including fade, slide, stagger, and zoom.
 *
 * Each preset is defined as a function that returns a `SpringPreset` object, which contains the `from` and `to` animation values, as well as optional configuration and delay parameters.
 *
 * The `springConfigs` object provides a set of predefined spring configurations that can be used as a starting point for the animation presets.
 *
 *@example
 * import { useSpring, animated } from '@react-spring/web'
 *
 * const Component = () => {
 *
 * const props = useSpring(
 *   springs.slide('right', {
 *     distance: 75,
 *     delay: 200,
 *     config: { tension: 200 }
 *   })
 * )
 *
 * return <animated.div style={props}>Content</animated.div>
 * }
 */
export const springs = {
	/**
	 * Simple fade animation
	 */
	fade: (options: SpringPresetOptions = {}): SpringPreset => ({
		from: { opacity: 0 },
		to: { opacity: 1 },
		config: {
			...springConfigs.smooth,
			...(options.config || {}),
		},
		delay: options.delay,
	}),

	/**
	 * Slide animation with configurable distance
	 */
	slide: (direction: SpringDirection, options: SpringPresetOptions = {}): SpringPreset => {
		const distance = options.distance || 50
		const getOffset = (dir: SpringDirection) => {
			switch (dir) {
				case "left":
					return { x: `-${distance}%`, y: "0%" }
				case "right":
					return { x: `${distance}%`, y: "0%" }
				case "up":
					return { x: "0%", y: `${distance}%` }
				case "down":
					return { x: "0%", y: `-${distance}%` }
			}
		}

		const offset = getOffset(direction)

		return {
			from: {
				...offset,
				opacity: 0,
			},
			to: {
				x: "0%",
				y: "0%",
				opacity: 1,
			},
			config: {
				...springConfigs.gentle,
				...(options.config || {}),
			},
			delay: options.delay,
		}
	},

	/**
	 * Stagger animation with configurable distance and delay
	 */
	stagger: (direction: SpringDirection, options: SpringPresetOptions = {}): SpringPreset => {
		const distance = options.distance || 100

		const getOffset = (dir: SpringDirection) => {
			switch (dir) {
				case "left":
					return { x: `-${distance}%`, y: "0%" }
				case "right":
					return { x: `${distance}%`, y: "0%" }
				case "up":
					return { x: "0%", y: `${distance}%` }
				case "down":
					return { x: "0%", y: `-${distance}%` }
			}
		}

		const offset = getOffset(direction)

		return {
			from: {
				...offset,
				opacity: 0,
			},
			to: {
				x: "0%",
				y: "0%",
				opacity: 1,
			},
			config: {
				...springConfigs.bouncy,
				...(options.config || {}),
			},
			delay: options.delay,
		}
	},

	/**
	 * Zoom animation with configurable scale
	 */
	zoom: (direction: SpringZoom, options: SpringPresetOptions = {}): SpringPreset => {
		const initialScale = direction === "in" ? 0.3 : 1.5

		return {
			from: {
				scale: initialScale,
				opacity: 0,
			},
			to: {
				scale: 1,
				opacity: 1,
			},
			config: {
				...springConfigs.gentle,
				...(options.config || {}),
			},
			delay: options.delay,
		}
	},
}
