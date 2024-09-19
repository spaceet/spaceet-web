import { RiArrowLeftSLine } from "@remixicon/react"
import { useFormik } from "formik"
import Image from "next/image"
import { toast } from "sonner"
import Link from "next/link"
import React from "react"

import { capitalizeWords, getFileExtension, getFileSizeInMb, getImageDimensions } from "@/lib"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { FadeTransition, PhoneInput, Seo } from "../shared"
import { ProfileFormProps } from "./form-components"
import { ProfileValidationSchema } from "./schema"
import { defaultAvatar } from "@/assets/images"
import { ComponentUpdateProps } from "@/types"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { states } from "@/config"

const allowedExtensions = /jpeg|jpg|png|svg|webp/i

const initialValues: ProfileFormProps = {
	address: "",
	bio: "",
	city: "",
	firstName: "",
	image: null,
	lastName: "",
	phoneNumber: "",
	state: "",
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
	const [previewUrl, setPreviewUrl] = React.useState<string | null>(null)
	const input = React.useRef<HTMLInputElement>(null)

	const handleClick = () => {
		if (input.current) {
			input.current.click()
		}
	}

	const { dirty, errors, handleChange, handleSubmit, isValid, setFieldValue, values } = useFormik({
		initialValues,
		validationSchema: ProfileValidationSchema,
		validateOnChange: true,
		onSubmit: (values) => {
			console.log(values)
		},
	})

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
		const hasError = Object.values(errors).some((error) => error)
		if (dirty && isValid && !hasError) {
			updateCanProceed(true)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dirty, errors, isValid])

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
			<FadeTransition className="my-[72px] grid w-full place-items-center">
				<div className="grid w-full grid-cols-3">
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
					<form onSubmit={handleSubmit} className="col-span-2 flex w-full flex-col gap-4">
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
									name="firstName"
									onChange={handleChange}
									label="First Name"
									placeholder="First Name"
									required
								/>
								<Input
									name="lastName"
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
											{states.map((state) => (
												<SelectItem key={state.value} value={state.value}>
													{state.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
								<div className="w-full">
									<Label htmlFor="city">City</Label>
									<Select>
										<SelectTrigger>
											<SelectValue placeholder="Select a state" />
										</SelectTrigger>
										<SelectContent></SelectContent>
									</Select>
								</div>
							</div>
							<Input
								name="address"
								onChange={handleChange}
								label="Home Address"
								placeholder="Enter your home address"
								required
							/>
							<Textarea
								name="bio"
								onChange={handleChange}
								label="Enter Bio"
								placeholder="Enter your description here"
								required
							/>
						</div>
					</form>
				</div>
			</FadeTransition>
		</>
	)
}

export default Page
