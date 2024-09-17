import { RiArrowLeftSLine } from "@remixicon/react"
import { useFormik } from "formik"
import Link from "next/link"
import React from "react"

import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { CustomCheckable, FadeTransition, Seo } from "../shared"
import { RulesFormProps } from "./form-components"
import { ComponentUpdateProps } from "@/types"
import { CustomRules } from "./custom-rules"
import { Separator } from "../ui/separator"
import { TimeUpdate } from "./time-update"
import { capitalizeWords } from "@/lib"

const initialValues: RulesFormProps = {
	checkIn: ["flexible", "12:00 PM"],
	checkOut: "12:00 PM",
	customRules: [],
	events: false,
	filming: false,
	maxGuests: 2,
	pets: false,
	quietHours: false,
	smoking: false,
}

const Page = ({
	active,
	components,
	handleGoTo,
	handlePrev,
	label,
	subtitle,
	updateCanProceed,
}: ComponentUpdateProps) => {
	const [isAddRules, setIsAddRules] = React.useState(false)
	const [isAddTime, setIsAddTime] = React.useState(false)

	const { handleSubmit, setFieldValue, values } = useFormik({
		initialValues,
		onSubmit: (values) => {
			console.log(values)
		},
	})

	const removeCustomRule = (value: string) => {
		setFieldValue(
			"customRules",
			values.customRules.filter((rule) => rule !== value)
		)
	}

	React.useEffect(() => {
		updateCanProceed(true)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<>
			<Seo title={capitalizeWords(label)} description="Become a Host" />
			<FadeTransition className="my-[72px] grid w-full place-items-center">
				<div className="flex w-full items-start gap-[54px]">
					<div className="w-full max-w-[329px]">
						<div className="flex w-[329px] flex-col gap-4">
							<button type="button" onClick={handlePrev} className="flex items-center font-semibold">
								<RiArrowLeftSLine size={20} />
								Back
							</button>
							<p className="text-4xl font-semibold">{label}</p>
							<p className="text-sm text-neutral-500">
								Things to get started. Read our{" "}
								<Link href="/help-center" className="underline">
									policy
								</Link>
							</p>
							<div className="flex w-full flex-col gap-3 rounded-xl border p-6">
								<p className="text-xs text-neutral-400">{subtitle}</p>
								<div className="flex w-full flex-col gap-3">
									{components.map(({ icon: Icon, name }, index) => (
										<button
											type="button"
											onClick={() => handleGoTo(index)}
											key={index}
											className={`flex w-full items-center gap-1 rounded-md p-2 font-medium ${active === name ? "bg-neutral-200" : ""}`}>
											<Icon size={20} /> {name}
										</button>
									))}
								</div>
							</div>
						</div>
					</div>
					<div className="flex h-full w-full flex-1 flex-col gap-6 overflow-y-auto">
						<div className="flex w-full flex-col gap-2">
							<p className="text-xl font-medium">House Rules</p>
							<p className="text-sm text-neutral-400">
								Guests are expected to follow your rules and may be removed from Spaceet if they don&apos;t.
							</p>
						</div>
						<form onSubmit={handleSubmit} className="flex w-full flex-col gap-6 rounded-xl border p-6">
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
								<p className="text-sm font-medium">Number of Guests</p>
								<Select
									value={values.maxGuests.toString()}
									onValueChange={(value) => setFieldValue("maxGuests", parseInt(value))}>
									<SelectTrigger className="w-[170px]">
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										{[...Array(9)].map((_, index) => (
											<SelectItem key={index} value={`${index + 2}`}>
												{index + 2}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
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
						</form>
					</div>
				</div>
			</FadeTransition>
		</>
	)
}

export default Page
