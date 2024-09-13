import { RiArrowRightDoubleLine } from "@remixicon/react"
import React from "react"

import { Appbar, Seo } from "@/components/shared"
import { Button } from "@/components/ui/button"
import { become_a_host } from "@/config"

const Page = () => {
	const [activeIndex, setActiveIndex] = React.useState(0)
	const [current, setCurrent] = React.useState(0)
	const [width, setWidth] = React.useState(0)

	const handleNext = () => {
		if (current < become_a_host[activeIndex].components.length - 1) {
			setCurrent(current + 1)
		} else if (activeIndex < become_a_host.length - 1) {
			setActiveIndex(activeIndex + 1)
			setCurrent(0)
		}
	}

	const handlePrev = () => {
		if (current > 0) {
			setCurrent(current - 1)
		} else {
			setActiveIndex(activeIndex - 1)
			setCurrent(become_a_host[activeIndex - 1].components.length - 1)
		}
	}

	const currentIteration = become_a_host[activeIndex]
	const { component: ActiveComponent } = currentIteration.components[current]

	React.useEffect(() => {
		setWidth(Math.ceil(((activeIndex + 1) / become_a_host.length) * 100))
	}, [activeIndex])

	return (
		<>
			<Seo title="Become a Host" />
			<Appbar />
			<main className="w-full">
				<div className="container mx-auto h-[calc(100vh-209px)]">
					<ActiveComponent
						active={currentIteration.components[current].name}
						components={currentIteration.components}
						handlePrev={handlePrev}
						label={currentIteration.label}
						subtitle={currentIteration.subtitle}
					/>
				</div>
				<div className="w-full">
					<div className="flex h-[10px] w-full bg-neutral-300">
						<div style={{ width: `${width}%` }} className="h-full bg-primary-100"></div>
					</div>
					<div className="container mx-auto flex h-[99px] items-center justify-end">
						<div className="flex items-center gap-4">
							{activeIndex > 0 && activeIndex < become_a_host.length - 1 && (
								<Button className="w-[170px]" variant="outline">
									Save and Exit
								</Button>
							)}
							<Button className="w-[170px]" onClick={handleNext}>
								{activeIndex === 0 ? (
									"Let's go!"
								) : activeIndex === become_a_host.length - 1 ? (
									<span className="flex w-full items-center gap-2">
										Go to Dashboard <RiArrowRightDoubleLine size={20} />
									</span>
								) : (
									"Next"
								)}
							</Button>
						</div>
					</div>
				</div>
			</main>
		</>
	)
}

export default Page
