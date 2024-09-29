import { RiArrowLeftSLine, RiArrowRightDoubleLine, RiCloseLine } from "@remixicon/react"
import { useFormik } from "formik"
import Link from "next/link"
import React from "react"

import { capitalizeWords, fromKebabCase, toKebabCase } from "@/lib"
import { AmenitiesIconName, ComponentUpdateProps } from "@/types"
import { UtilitiesFormProps } from "./form-components"
import { FadeTransition, Icon, Seo } from "../shared"
import { usable_amenities_list } from "@/config"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { toast } from "sonner"

const initialValues: UtilitiesFormProps = {
	utilities: [],
}

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
	const [utilities, setUtilities] = React.useState<AmenitiesIconName[]>([])
	const { handleSubmit, setFieldValue, values } = useFormik({
		initialValues,
		onSubmit: (values) => {
			console.log(values)
			handleNext()
		},
	})

	const toggleUtility = (utility: AmenitiesIconName) => {
		const utilities = values.utilities
		const index = utilities.indexOf(utility)
		if (index > -1) {
			utilities.splice(index, 1)
		} else {
			utilities.push(utility)
		}
		setFieldValue("utilities", utilities)
	}

	const isUtilitySelected = (utility: AmenitiesIconName) => values.utilities.includes(utility)

	const addUtility = (utility: AmenitiesIconName) => {
		const isPresent = utilities.includes(utility)
		if (isPresent) {
			toast.error("Utility already added!")
			return
		}
		const kebabed = toKebabCase(utility) as AmenitiesIconName
		setUtilities([...utilities, kebabed])
	}

	const removeUtility = (utility: AmenitiesIconName) =>
		setUtilities(utilities.filter((u) => u !== utility))

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter") {
			e.preventDefault()
			const utility = e.currentTarget.value.trim()
			if (utility) {
				addUtility(utility as AmenitiesIconName)
				e.currentTarget.value = ""
			}
		}
	}

	const getCharacterCount = React.useMemo(() => {
		return utilities.reduce((count, str) => count + str.length, 0)
	}, [utilities])

	return (
		<>
			<Seo title={capitalizeWords(label)} description="Become a Host" />
			<form onSubmit={handleSubmit} className="w-full">
				<FadeTransition className="mb-40 mt-[72px] grid w-full place-items-center">
					<div className="grid h-[calc(100vh-209px)] w-full grid-cols-3">
						<div className="w-full">
							<div className="flex w-[329px] flex-col gap-4">
								<button onClick={handlePrev} className="flex items-center font-semibold">
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
						<div className="col-span-2 flex w-full flex-col gap-6">
							<div className="flex w-full flex-col gap-2">
								<p className="text-xl font-medium">Property Utilities</p>
								<p className="text-sm text-neutral-400">
									You&apos;ll also need an apartment or property ready for guests, complete with essential
									amenities like clean bedding, towels, Wi-Fi, and a kitchen.
								</p>
							</div>
							<div className="flex w-full flex-col gap-4 rounded-xl border p-6">
								{usable_amenities_list.map((amenities) => (
									<div key={amenities.class} className="flex w-full flex-col gap-5">
										<Label htmlFor="utilities">{amenities.class}</Label>
										<div className="flex w-full flex-wrap gap-2">
											{amenities.amenities_list.map(({ name, icon }) => (
												<Button
													type="button"
													onClick={() => toggleUtility(icon)}
													key={name}
													variant="outline"
													className={`transition-all duration-500 ${isUtilitySelected(icon) ? "bg-warning-100 text-warning-300" : "text-neutral-400"}`}>
													<Icon name={icon} size={20} /> {name}
												</Button>
											))}
										</div>
									</div>
								))}
								<div className="flex w-full flex-col gap-5">
									<Label htmlFor="utilities">Other Utilities</Label>
									<div className="relative flex h-[120px] w-full flex-wrap gap-2 overflow-y-auto rounded-lg border px-3 py-2">
										{utilities.map((utility) => (
											<Button
												key={utility}
												type="button"
												onClick={() => removeUtility(utility)}
												variant="outline"
												className="capitalize">
												{fromKebabCase(utility)}
												<RiCloseLine size={12} />
											</Button>
										))}
										<textarea
											name="utilities"
											id="utilities"
											onKeyDown={handleKeyDown}
											className="h-full w-full resize-none text-sm outline-none"></textarea>
										<div className="absolute bottom-1 right-1 !z-[5] text-sm text-neutral-400">
											{getCharacterCount}/200
										</div>
									</div>
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
