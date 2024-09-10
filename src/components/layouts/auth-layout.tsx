import Image, { StaticImageData } from "next/image"
import React from "react"

import { images } from "@/assets/layout"

interface Props {
	children: React.ReactNode
}

export const AuthLayout = ({ children }: Props) => {
	return (
		<main className="grid h-screen w-screen grid-cols-2 gap-7 px-4">
			<div className="grid h-full w-full place-items-center">{children}</div>
			<div className="grid h-full w-full grid-cols-3 gap-5 overflow-hidden">
				<AutoScroll images={images} />
				<AutoScroll images={images} offset={-75} />
				<AutoScroll images={images} />
			</div>
		</main>
	)
}

interface AutoScrollProps {
	offset?: number
	images: (StaticImageData | string)[]
}

const AutoScroll = ({ images, offset = 0 }: AutoScrollProps) => {
	const ref = React.useRef<HTMLDivElement>(null)!

	function shuffleArray<T>(array: T[]): T[] {
		const shuffledArray = [...array]
		for (let i = shuffledArray.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1))
			;[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]
		}
		return shuffledArray
	}

	React.useEffect(() => {
		const column = ref.current

		if (!column) return

		let animationFrameId: number
		let startTime: number

		const animate = (timestamp: number) => {
			if (!startTime) startTime = timestamp
			const progress = (timestamp - startTime) * 0.025
			column.style.transform = `translateY(${-progress % (column.scrollHeight / 2)}px)`
			if (progress >= column.scrollHeight / 2) {
				startTime = timestamp
			}
			animationFrameId = requestAnimationFrame(animate)
		}

		animationFrameId = requestAnimationFrame(animate)
		return () => cancelAnimationFrame(animationFrameId)
	}, [ref])

	return (
		<div className="h-full w-full overflow-hidden">
			<div ref={ref} className="animate-scroll flex flex-col gap-5">
				{shuffleArray(images).map((image, index) => (
					<div
						key={index}
						className="relative aspect-[1/1.7] w-full rounded-lg"
						style={{ transform: `translateY(${offset}px)` }}>
						<Image
							src={image}
							alt=""
							fill
							sizes="(max-width: 1024px)100%"
							className="rounded-lg object-cover"
							priority
						/>
					</div>
				))}
			</div>
		</div>
	)
}
