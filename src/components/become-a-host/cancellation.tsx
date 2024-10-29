import { RiArrowLeftSLine, RiArrowRightDoubleLine } from "@remixicon/react"
import { animated, useSpring } from "@react-spring/web"
import { useFormik } from "formik"
import { motion } from "framer-motion"
import Link from "next/link"
import React from "react"

import { springs, stagger } from "@/config"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { cancellation_policies } from "@/config"
import { FadeTransition, Seo } from "../shared"
import { ComponentUpdateProps } from "@/types"
import { capitalizeWords } from "@/lib"
import { Button } from "../ui/button"


const Page = ({
	active,
	activeIndex,
	components,
	handleGoTo,
	handleNext,
	handlePrev,
	label,
	subtitle,
	totalItems,
	width,
}: ComponentUpdateProps) => {
	const { handleSubmit, setFieldValue } = useFormik({
		initialValues: { cancellation_policy: "" },
		onSubmit: (values) => {
			console.log(values)
			handleNext()
		},
	})

	const springHeader = useSpring(springs.slide("right"))
	const springChild = useSpring(springs.slide("up"))


	return (
		<>
			<Seo title={capitalizeWords(label)} description="Become a Host" />
			<form onSubmit={handleSubmit} className="w-full">
				<FadeTransition className="my-[72px] grid w-full place-items-center">
					<div className="grid h-[calc(100vh-209px)] w-full grid-cols-3">
						<div className="w-full">
							<div className="flex w-[329px] flex-col gap-4">
								<button onClick={handlePrev} className="flex items-center font-semibold">
									<RiArrowLeftSLine size={20} />
									Back
								</button>
								<animated.p style={{...springHeader}}
								 className="text-4xl font-semibold">{label}
								 </animated.p>
								 <animated.p style={{...springChild}}
								 className="text-sm text-neutral-500">
									Things to get started. Read our{" "}
									<Link href="/help-center" className="underline">
										policy
									</Link>
								</animated.p>
								<div className="flex w-full flex-col gap-3 rounded-xl border p-6">
									<p className="text-xs text-neutral-400">{subtitle}</p>
									<div className="flex w-full flex-col gap-3">
										{components.map(({ icon: Icon, name }, index) => (
											<motion.button
											{...stagger("left", (index + 1) * 0.25)}
												onClick={() => handleGoTo(index)}
												key={index}
												className={`flex w-full items-center gap-1 rounded-md p-2 font-medium ${active === name ? "bg-neutral-200" : ""}`}>
												<Icon size={20} /> {name}
											</motion.button>
										))}
									</div>
								</div>
							</div>
						</div>
						<div className="col-span-2 flex h-full w-full flex-1 flex-col gap-6 overflow-y-auto">
							<div className="flex w-full flex-col gap-2">
								<p className="text-xl font-medium">Cancellation</p>
								<p className="text-sm text-neutral-400">
									Read through our cancellation policies at the{" "}
									<Link href="/help-center" className="font-bold underline">
										Help Center
									</Link>
								</p>
							</div>
							<RadioGroup
								onValueChange={(value) => setFieldValue("cancellation_policy", value)}
								className="flex w-full flex-col gap-4">
								{cancellation_policies.map(({ description, label }, index) => (
									<div
										key={index}
										className="flex w-full items-center justify-between rounded-xl border p-6">
										<div className="flex max-w-[356px] flex-col gap-2">
											<p className="text-sm font-medium capitalize text-neutral-900">{label}</p>
											<p className="text-sm text-neutral-600">{description}</p>
										</div>
										<RadioGroupItem value={label} />
									</div>
								))}
							</RadioGroup>
						</div>
					</div>
				</FadeTransition>
				<div className="fixed bottom-0 left-0 right-0 z-10 h-[100px] w-full bg-white">
					<div className="flex h-[10px] w-full bg-neutral-300">
						<div style={{ width: `${width}%` }} className="h-full bg-primary-100"></div>
					</div>
					<div className="container mx-auto flex h-[99px] items-center justify-end">
						<div className="flex items-center gap-4">
							{activeIndex > 0 && activeIndex < totalItems - 1 && (
								<Button className="w-[170px]" variant="outline">
									Save and Exit
								</Button>
							)}
							<Button className="w-[170px]" type="submit">
								{activeIndex === 0 ? (
									"Let's go!"
								) : activeIndex === totalItems - 1 ? (
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
			</form>
		</>
	)
}

export default Page
