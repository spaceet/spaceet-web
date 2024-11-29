import { RiArrowLeftSLine, RiArrowRightDoubleLine } from "@remixicon/react"
import { animated, useSpring } from "@react-spring/web"
import { motion } from "framer-motion"
import { useFormik } from "formik"
import { toast } from "sonner"
import Link from "next/link"
import React from "react"

import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "../ui/dialog"
import { CustomCheckable, FadeTransition, Seo } from "../shared"
import { RulesFormProps } from "./form-components"
import { ComponentUpdateProps } from "@/types"
import { CustomRules } from "./custom-rules"
import { useCreateHostStore } from "./store"
import { springs, stagger } from "@/config"
import { Separator } from "../ui/separator"
import { TimeUpdate } from "./time-update"
import { capitalizeWords } from "@/lib"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

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
	const { rules, setRules } = useCreateHostStore()

	const initialValues: RulesFormProps = {
		checkIn: rules.checkIn,
		checkOut: rules.checkOut,
		customRules: rules.customRules,
		events: rules.events,
		filming: rules.filming,
		maxGuests: rules.maxGuests,
		pets: rules.pets,
		quietHours: rules.quietHours,
		smoking: rules.smoking,
	}

	const [isAddRules, setIsAddRules] = React.useState(false)
	const [isAddTime, setIsAddTime] = React.useState(false)

	const { handleChange, handleSubmit, setFieldValue, values } = useFormik({
		initialValues,
		onSubmit: (values) => {
			if (!values.checkIn[0]) {
				toast.error("Please set a start time for check in")
				return
			}
			if (values.checkIn[0] !== "flexible" && values.checkIn[1] === "") {
				toast.error("Please set an end time for check in")
				return
			}
			if (!values.checkOut) {
				toast.error("Please set a check out time!")
				return
			}
			if (!values.maxGuests) {
				toast.error("Please select the maximum number of guests allowed!")
				return
			}
			const payload = {
				...values,
				checkIn: values.checkIn[0] === "flexible" ? ["flexible", "00:00:00"] : values.checkIn,
			} as RulesFormProps
			setRules(payload)
			handleNext()
		},
	})

	const springHeader = useSpring(springs.slide("right"))
	const springChild = useSpring(springs.slide("up"))

	const removeCustomRule = (value: string) => {
		setFieldValue(
			"customRules",
			values.customRules.filter((rule) => rule !== value)
		)
	}

	return (
		<>
			<Seo title={capitalizeWords(label)} description="Become a Host" />
			<form onSubmit={handleSubmit} className="w-full">
				<FadeTransition className="mb-40 mt-[72px] grid w-full place-items-center">
					<div className="flex w-full items-start gap-[54px]">
						<div className="w-full max-w-[329px]">
							<div className="flex w-full flex-col gap-4 lg:w-[329px]">
								<button type="button" onClick={handlePrev} className="flex items-center font-semibold">
									<RiArrowLeftSLine size={20} />
									Back
								</button>
								<animated.p style={{ ...springHeader }} className="text-2xl font-semibold lg:text-4xl">
									{label}
								</animated.p>
								<animated.p style={{ ...springChild }} className="text-sm text-neutral-500">
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
												type="button"
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
						<div className="flex h-full w-full flex-1 flex-col gap-6 overflow-y-auto">
							<div className="flex w-full flex-col gap-2">
								<p className="text-xl font-medium">House Rules</p>
								<p className="text-sm text-neutral-400">
									Guests are expected to follow your rules and may be removed from Spaceet if they
									don&apos;t.
								</p>
							</div>
							<div className="flex w-full flex-col gap-6 rounded-xl border p-6">
								<div className="flex min-h-[37px] w-full items-center justify-between">
									<p className="text-sm font-medium">Events allowed</p>
									<CustomCheckable
										checked={values.events}
										onValueChange={(value) => setFieldValue("events", value)}
									/>
								</div>
								<Separator className="bg-neutral-300" />
								<div className="flex min-h-[37px] w-full items-center justify-between">
									<div className="flex flex-col gap-2">
										<p className="text-sm font-medium">Pets Allowed</p>
										<span className="text-xs text-neutral-500">
											You can refuse pets, but must reasonably accommodate service animals.
										</span>
									</div>
									<CustomCheckable
										checked={values.pets}
										onValueChange={(value) => setFieldValue("pets", value)}
									/>
								</div>
								<Separator className="bg-neutral-300" />
								<div className="flex min-h-[37px] w-full items-center justify-between">
									<p className="text-sm font-medium">Quiet Hours</p>
									<CustomCheckable
										checked={values.quietHours}
										onValueChange={(value) => setFieldValue("quietHours", value)}
									/>
								</div>
								<Separator className="bg-neutral-300" />
								<div className="flex min-h-[37px] w-full items-center justify-between">
									<p className="text-sm font-medium">Smoking, Vaping, e-cigarettes allowed</p>
									<CustomCheckable
										checked={values.smoking}
										onValueChange={(value) => setFieldValue("smoking", value)}
									/>
								</div>
								<Separator className="bg-neutral-300" />
								<div className="flex min-h-[37px] w-full items-center justify-between">
									<p className="text-sm font-medium">Commercial Photography and Filming allowed</p>
									<CustomCheckable
										checked={values.filming}
										onValueChange={(value) => setFieldValue("filming", value)}
									/>
								</div>
								<Separator className="bg-neutral-300" />
								<div className="flex min-h-[37px] w-full items-center justify-between">
									<p className="text-sm font-medium">Maximum Number of Guests</p>
									<Input type="number" name="maxGuests" onChange={handleChange} min={1} />
								</div>
								<Separator className="bg-neutral-300" />
								<div className="flex min-h-[37px] w-full items-center justify-between">
									<div className="flex flex-col gap-2">
										<p className="text-sm font-medium">Check-in and Checkout Times</p>
										{values.checkIn[0] && values.checkIn[0] === "flexible" ? (
											<span className="text-sm text-neutral-500">Arrival time is flexible</span>
										) : (
											<span className="text-sm text-neutral-500">
												Arrival time is between {values.checkIn[0]} and {values.checkIn[1]}
											</span>
										)}
										{values.checkOut && (
											<span className="text-sm text-neutral-500">
												Checkout time on or before {values.checkOut}
											</span>
										)}
									</div>
									<Dialog open={isAddTime} onOpenChange={setIsAddTime}>
										<DialogTrigger>
											<RiArrowLeftSLine className="rotate-180" />
										</DialogTrigger>
										<DialogContent className="w-[400px]">
											<DialogTitle className="font-body">Check-in and checkout times</DialogTitle>
											<DialogDescription hidden></DialogDescription>
											<TimeUpdate
												checkIn={values.checkIn}
												checkOut={values.checkOut}
												setFieldValue={setFieldValue}
												onClose={() => setIsAddTime(false)}
											/>
										</DialogContent>
									</Dialog>
								</div>
								<Separator className="bg-neutral-300" />
								<div className="flex min-h-[37px] w-full items-center justify-between">
									<div className="flex flex-col gap-2">
										<p className="text-sm font-medium">Add Custom Rules</p>
										<div className="flex flex-col gap-1">
											{values.customRules.map((rule) => (
												<span key={rule} className="text-sm text-neutral-500">
													{rule}
												</span>
											))}
										</div>
									</div>
									<Dialog open={isAddRules} onOpenChange={setIsAddRules}>
										<DialogTrigger>
											<RiArrowLeftSLine className="rotate-180" />
										</DialogTrigger>
										<DialogContent className="w-[400px]">
											<DialogTitle className="font-body">Add Custom Rules</DialogTitle>
											<DialogDescription hidden></DialogDescription>
											<CustomRules
												customRules={values.customRules}
												setFieldValue={setFieldValue}
												removeCustomRule={removeCustomRule}
												onClose={() => setIsAddRules(false)}
											/>
										</DialogContent>
									</Dialog>
								</div>
							</div>
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
