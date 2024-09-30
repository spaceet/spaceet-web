import { useRouter } from "next/router"
import React from "react"

import { Appbar, Seo } from "@/components/shared"
import { become_a_host } from "@/config"

const Page = () => {
	const [activeIndex, setActiveIndex] = React.useState(0)
	const [current, setCurrent] = React.useState(0)
	const [width, setWidth] = React.useState(0)
	const router = useRouter()

	const isFirstStep = activeIndex === 0 && current === 0
	const isLastStep =
		activeIndex === become_a_host.length - 1 &&
		current === become_a_host[activeIndex].components.length - 1

	const handleNext = () => {
		if (current < become_a_host[activeIndex].components.length - 1) {
			setCurrent(current + 1)
		} else if (activeIndex < become_a_host.length - 1) {
			setActiveIndex(activeIndex + 1)
			setCurrent(0)
		} else {
			router.push("/dashboard")
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

	const handleGoTo = (activeIndex: number, targetIndex: number) => {
		setActiveIndex(activeIndex)
		setCurrent(targetIndex)
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
			<main className="h-[calc(100vh-100px)] w-full overflow-hidden">
				<div className="container mx-auto h-full overflow-y-scroll">
					<ActiveComponent
						active={currentIteration.components[current].name}
						activeIndex={activeIndex}
						components={currentIteration.components}
						handleGoTo={(index) => handleGoTo(activeIndex, index)}
						handleNext={handleNext}
						handlePrev={handlePrev}
						isNotFirstOrLast={isFirstStep || isLastStep}
						label={currentIteration.label}
						subtitle={currentIteration.subtitle}
						totalItems={become_a_host.length}
						width={width}
					/>
				</div>
			</main>
		</>
	)
}

export default Page
