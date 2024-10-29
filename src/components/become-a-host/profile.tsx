import { RiArrowRightDoubleLine, RiArrowLeftSLine } from "@remixicon/react"
import { animated, useSpring } from "@react-spring/web" //@lolubabafemi here is the spring library import
import { motion } from "framer-motion" //@lolubabafemi here is the framer motion library import
import { useFormik } from "formik"
import Image from "next/image"
import { toast } from "sonner"
import Link from "next/link"
import React from "react"

import { capitalizeWords, getFileExtension, getFileSizeInMb, getImageDimensions } from "@/lib"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { AddressPicker, FadeTransition, PhoneInput, Seo } from "../shared"
import { springs, stagger, statesAndLgas } from "@/config" //@lolubabafemi here is the preset import
import { ProfileFormProps } from "./form-components"
import { defaultAvatar } from "@/assets/images"
import { ComponentUpdateProps } from "@/types"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Input } from "../ui/input"

const allowedExtensions = /jpeg|jpg|png|svg|webp/i

const initialValues: ProfileFormProps = {
	address: "",
	bio: "",
	city: "",
	first_name: "",
	image: null,
	last_name: "",
	phoneNumber: "",
	state: "",
}

const Page = ({
	active,
	activeIndex,
	components,
	handleGoTo,
	handlePrev,
	handleNext,
	label,
	subtitle,
	totalItems,
	width,
}: ComponentUpdateProps) => {
	const [previewUrl, setPreviewUrl] = React.useState<string | null>(null)
	const input = React.useRef<HTMLInputElement>(null)

	// @lolubabafemi here is the spring animation
	const springHeader = useSpring(springs.slide("right"))
	const springChild = useSpring(springs.slide("up"))

	const handleClick = () => {
		if (input.current) {
			input.current.click()
		}
	}

	const { handleChange, handleSubmit, setFieldValue, values } = useFormik({
		initialValues,
		onSubmit: (values) => {
			// if (!values.first_name || !values.last_name) {
			// 	toast.error("Please enter your first and last name")
			// 	return
			// }
			// if (!values.address || !values.city || !values.state) {
			// 	toast.error("Please enter your full address, including city and state")
			// 	return
			// }
			// if (!values.phoneNumber) {
			// 	toast.error("Please enter your phone number")
			// 	return
			// }
			// if (!values.image) {
			// 	toast.error("Please select a profile image")
			// 	return
			// }
			console.log(values)
			handleNext()
		},
	})

	const lgas = React.useMemo(() => {
		return (
			statesAndLgas.find((state) => state.name.toLowerCase() === values.state.toLowerCase())?.lgas ||
			[]
		)
	}, [values.state])

	const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) return
		const file = e.target.files[0]
		const ext = getFileExtension(file)
		if (!allowedExtensions.test(ext)) {
			toast.error("Invalid file type. Please upload a JPEG, PNG, SVG or WebP image")
			return
		}
		const fileSize = getFileSizeInMb(file)
		if (fileSize > 5) {
			toast.error("File size should be less than 5MB")
			return
		}
		const { height, width } = await getImageDimensions(file)
		if (height < 400 || width < 400) {
			toast.error(
				"Image resolution is too low. Please upload an image with a resolution of at least 400px"
			)
			return
		}
		setFieldValue("image", file)
	}

	React.useEffect(() => {
		if (values.image) {
			const reader = new FileReader()
			reader.onload = () => {
				setPreviewUrl(reader.result as string)
			}
			reader.readAsDataURL(values.image)
		}
	}, [values.image])

	return (
		<>
			<Seo title={capitalizeWords(label)} description="Become a Host" />
			<form onSubmit={handleSubmit} className="mb-36 mt-[72px] h-full w-full">
				<FadeTransition className="grid w-full place-items-center">
					<div className="grid w-full grid-cols-3">
						<div className="w-full">
							<div className="flex w-[329px] flex-col gap-4">
								<button onClick={handlePrev} className="flex items-center font-semibold">
									<RiArrowLeftSLine size={20} />
									Back
								</button>
								{/* @lolubabafemi here is the spring animation usage */}
								<animated.p style={{ ...springHeader }} className="text-4xl font-semibold">
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
											// @lolubabafemi here is the stagger animation usage
											<motion.button
												{...stagger("left", (index + 1) * 0.25)}
												key={index}
												onClick={() => handleGoTo(index)}
												className={`flex w-full items-center gap-1 rounded-md p-2 font-medium ${active === name ? "bg-neutral-200" : ""}`}>
												<Icon size={20} /> {name}
											</motion.button>
										))}
									</div>
								</div>
							</div>
						</div>
						<div className="col-span-2 flex w-full flex-col gap-4">
							<div className="flex w-full items-center justify-between rounded-xl border p-6">
								<div className="flex items-center gap-3">
									<div className="relative size-16 rounded-full border">
										<Image
											src={previewUrl || defaultAvatar}
											alt="image"
											fill
											sizes="(max-width: 1024px)100%"
											className="rounded-full object-cover"
										/>
									</div>
									<div className="flex flex-col">
										<p className="font-semibold">Profile Image</p>
										<p className="text-sm text-neutral-400">Min. 400x400px, PNG or JPEG</p>
									</div>
								</div>
								<label htmlFor="image-upload" className="w-fit">
									<input
										ref={input}
										type="file"
										accept="image/*"
										multiple={false}
										id="image-upload"
										className="hidden"
										onChange={handleImage}
									/>
									<Button type="button" onClick={handleClick} variant="outline">
										Upload Image
									</Button>
								</label>
							</div>
							<div className="flex w-full flex-col gap-4 rounded-xl border p-6">
								<div className="grid w-full grid-cols-2 gap-4">
									<Input
										name="first_name"
										onChange={handleChange}
										label="First Name"
										placeholder="First Name"
										required
									/>
									<Input
										name="last_name"
										onChange={handleChange}
										label="Last Name"
										placeholder="Last Name"
										required
									/>
								</div>
								<PhoneInput
									name="phoneNumber"
									label="Phone Number"
									onPhoneNumberChange={(value) => setFieldValue("phoneNumber", value)}
									placeholder="(+1) 123-456-7890"
									required
								/>
								<div className="grid w-full grid-cols-2 gap-4">
									<div className="w-full">
										<Label htmlFor="state">State</Label>
										<Select value={values.state} onValueChange={(value) => setFieldValue("state", value)}>
											<SelectTrigger>
												<SelectValue placeholder="Select a state" />
											</SelectTrigger>
											<SelectContent>
												{statesAndLgas.map((state) => (
													<SelectItem key={state.code} value={state.name}>
														{state.name}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>
									<div className="w-full">
										<Label htmlFor="city">City</Label>
										<Select
											value={values.city}
											onValueChange={(value) => setFieldValue("city", value)}
											disabled={!values.state}>
											<SelectTrigger>
												<SelectValue placeholder="Select a city" />
											</SelectTrigger>
											<SelectContent>
												{lgas.map((lga) => (
													<SelectItem key={lga} value={lga}>
														{lga}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>
								</div>
								<AddressPicker
									address={values.address}
									onValueChange={(value) => setFieldValue("address", value)}
								/>
								<Textarea
									name="bio"
									onChange={handleChange}
									label="Enter Bio"
									placeholder="Enter your description here"
									required
								/>
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
