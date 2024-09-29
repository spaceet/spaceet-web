import { RiArrowLeftSLine, RiArrowRightDoubleLine } from "@remixicon/react"
import { useFormik } from "formik"
import Link from "next/link"
import React from "react"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { AddressPicker, FadeTransition, Seo } from "../shared"
import { PropertyFormProps } from "./form-components"
import { ComponentUpdateProps } from "@/types"
import { apartment_types } from "@/config"
import { Textarea } from "../ui/textarea"
import { capitalizeWords } from "@/lib"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { states } from "@/config"

const initialValues: PropertyFormProps = {
	address: "",
	bedrooms: 0,
	bathrooms: 0,
	city: "",
	description: "",
	name: "",
	price: 0,
	propertyType: "",
	serviceCharge: 0,
	state: "",
	postalCode: "",
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
	const { handleChange, handleSubmit, setFieldValue, values } = useFormik({
		initialValues,
		onSubmit: (values) => {
			console.log(values)
			handleNext()
		},
	})

	return (
		<>
			<Seo title={capitalizeWords(label)} description="Become a Host" />
			<form onSubmit={handleSubmit} className="w-full">
				<FadeTransition className="my-[72px] grid w-full place-items-center">
					<div className="grid w-full grid-cols-3">
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
						<div className="col-span-2 flex w-full flex-col gap-6">
							<div className="flex w-full flex-col gap-2">
								<p className="text-xl font-medium">Property Details</p>
								<p className="text-sm text-neutral-400">
									You&apos;ll also need an apartment or property ready for guests, complete with essential
									amenities like clean bedding, towels, Wi-Fi, and a kitchen.
								</p>
							</div>
							<div className="flex w-full flex-col gap-4 rounded-xl border p-6">
								<div className="grid w-full grid-cols-2 gap-4">
									<Input
										name="name"
										onChange={handleChange}
										label="Name of Property"
										placeholder="Deluxe Apartment"
										required
									/>
									<div className="flex w-full flex-col gap-2">
										<Label htmlFor="propertyType">Property Type</Label>
										<Select
											value={values.propertyType}
											onValueChange={(value) => setFieldValue("propertyType", value)}>
											<SelectTrigger className="capitalize">
												<SelectValue placeholder="Duplex" />
											</SelectTrigger>
											<SelectContent className="capitalize">
												{apartment_types.map((type) => (
													<SelectItem key={type} value={type}>
														{type}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>
								</div>
								<div className="grid w-full grid-cols-2 gap-4">
									<div className="flex w-full flex-col gap-2">
										<Label htmlFor="bedrooms">No. of Rooms</Label>
										<Select
											value={String(values.bedrooms)}
											onValueChange={(value) => setFieldValue("bedrooms", Number(value))}>
											<SelectTrigger className="capitalize">
												<SelectValue placeholder="1" />
											</SelectTrigger>
											<SelectContent className="capitalize">
												{[...Array(5)].map((_, index) => (
													<SelectItem key={index} value={String(index + 1)}>
														{index + 1}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>
									<div className="flex w-full flex-col gap-2">
										<Label htmlFor="bathrooms">No. of Toilets</Label>
										<Select
											value={String(values.bathrooms)}
											onValueChange={(value) => setFieldValue("bathrooms", Number(value))}>
											<SelectTrigger className="capitalize">
												<SelectValue placeholder="1" />
											</SelectTrigger>
											<SelectContent className="capitalize">
												{[...Array(5)].map((_, index) => (
													<SelectItem key={index} value={String(index + 1)}>
														{index + 1}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>
								</div>
								<Textarea
									name="description"
									onChange={handleChange}
									label="Description"
									placeholder="Describe your property"
									required
								/>
								<div className="grid w-full grid-cols-2 gap-4">
									<Input
										type="number"
										name="price"
										label="Price Per Night"
										onChange={handleChange}
										placeholder="10000"
										required
									/>
									<Input
										type="number"
										name="serviceCharge"
										onChange={handleChange}
										label="Service Charge"
										placeholder="1000"
										readOnly
										required
									/>
								</div>
								<div className="flex w-full flex-col gap-2">
									<Label htmlFor="address">Property Address</Label>
									<AddressPicker
										address={values.address}
										onValueChange={(address) => setFieldValue("address", address)}
									/>
								</div>
								<div className="grid w-full grid-cols-2 gap-4">
									<div className="flex w-full flex-col gap-2">
										<Label htmlFor="state">State</Label>
										<Select value={values.state} onValueChange={(value) => setFieldValue("state", value)}>
											<SelectTrigger>
												<SelectValue placeholder="Select a state" />
											</SelectTrigger>
											<SelectContent>
												{states.map((state) => (
													<SelectItem key={state.value} value={state.value}>
														{state.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>
									<div className="flex w-full flex-col gap-2">
										<Label htmlFor="city">City</Label>
										<Select value={values.city} onValueChange={(value) => setFieldValue("city", value)}>
											<SelectTrigger>
												<SelectValue placeholder="Select a city" />
											</SelectTrigger>
											<SelectContent></SelectContent>
										</Select>
									</div>
								</div>
								<div className="grid w-full grid-cols-2 gap-4">
									<Input
										type="number"
										name="postalCode"
										label="Postal Code"
										onChange={handleChange}
										placeholder="100011"
										required
									/>
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
