import { differenceInDays, format } from "date-fns"
import { motion } from "framer-motion"
import { animated, useSpring } from "@react-spring/web"
import { useFormik } from "formik"
import { toast } from "sonner"
import Link from "next/link"
import React from "react"
import {
	RiAlertFill,
	RiArrowLeftSLine,
	RiArrowRightDoubleLine,
	RiDeleteBin6Line,
} from "@remixicon/react"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { identityTypes, idNumberValidator, idTypesWithExpiry } from "./data"
import { capitalizeWords, getFileExtension, getFileSizeInMb } from "@/lib"
import { DatePicker, FadeTransition, Seo, Spinner } from "../shared"
import { IdentityFormProps } from "./form-components"
import { header, springs, stagger } from "@/config"
import { ComponentUpdateProps } from "@/types"
import { useCreateHostStore } from "./store"
import { useDragAndDrop } from "@/hooks"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Input } from "../ui/input"

const allowedExtensions = /jpeg|jpg|png|svg|webp/i
const initialValues: IdentityFormProps = {
	identification_expiry_date: "",
	identification_number: "",
	identification_type: "INTERNATIONAL_PASSPORT",
	images: [],
}

const Page = ({
	active,
	activeIndex,
	components,
	handleGoTo,
	handleNext,
	handlePrev,
	isLoading,
	label,
	subtitle,
	totalItems,
	width,
}: ComponentUpdateProps) => {
	const input = React.useRef<HTMLInputElement>(null)!
	const { files, handleDragEnter, handleDragLeave, handleDragOver, handleDrop, isDragging } =
		useDragAndDrop()

	const { setIdentityVerification } = useCreateHostStore()

	const handleClick = () => {
		if (input.current) {
			input.current.click()
		}
	}

	const springChild = useSpring(springs.slide("up"))

	const { handleChange, handleSubmit, setFieldValue, values } = useFormik({
		initialValues,
		onSubmit: (values) => {
			handleNext()
			if (!values.identification_type) {
				toast.error("Please select an ID type")
				return
			}
			if (!values.identification_number) {
				toast.error("Please enter your ID number")
				return
			}
			if (
				idTypesWithExpiry.includes(values.identification_type) &&
				!values.identification_expiry_date
			) {
				toast.error("Please enter your ID expiry date")
				return
			}
			const validator = idNumberValidator[values.identification_type]
			if (!validator.pattern.test(values.identification_number)) {
				toast.error(validator.message)
				return
			}
			if (values.identification_expiry_date) {
				if (differenceInDays(new Date(values.identification_expiry_date), new Date()) < 90) {
					toast.error("Expiry date must be at least 90 days from today")
					return
				}
			}
			if (!values.images.length) {
				toast.error("Please upload your ID images")
				return
			}
			const payload = {
				...values,
				identification_expiry_date: values.identification_expiry_date
					? format(new Date(values.identification_expiry_date), "MM/dd/yyyy")
					: format(new Date(), "MM/dd/yyyy"),
			}
			setIdentityVerification(payload)
			handleNext()
		},
	})

	const handleFiles = (files: File[]) => {
		const validFiles = files.filter((file) => {
			const ext = getFileExtension(file)
			if (!allowedExtensions.test(ext)) {
				toast.error(`${file.name} is not a valid file!`)
				return false
			}
			const size = getFileSizeInMb(file)
			if (size > 5) {
				toast.error(`${file.name} is too large! Please upload a file less than 5MB`)
				return false
			}
			return true
		})

		if (validFiles.length > 0) {
			setFieldValue("images", [...values.images, ...validFiles])
		}
	}

	const handleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) return
		const files = Array.from(e.target.files)
		handleFiles(files)
	}

	const removeImage = (file: File) => {
		const updatedFiles = values.images.filter((image) => image !== file)
		setFieldValue("images", updatedFiles)
	}

	React.useEffect(() => {
		handleFiles(files)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [files])

	return (
		<>
			<Seo title={capitalizeWords(label)} description="Become a Host" />
			<form onSubmit={handleSubmit} className="mb-36 mt-[72px] w-full">
				<FadeTransition className="grid w-full place-items-center">
					<div className="mx-auto flex h-full items-start gap-[54px]">
						<div className="w-full lg:w-[300px]">
							<div className="flex w-full flex-col gap-4 lg:w-[329px]">
								<button onClick={handlePrev} className="flex items-center font-semibold">
									<RiArrowLeftSLine size={20} />
									Back
								</button>
								<motion.p {...header} className="text-4xl font-semibold">
									{label}
								</motion.p>
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
						<div className="flex h-full w-[600px] flex-col gap-6 rounded-2xl border p-6">
							<div className="flex w-full flex-col gap-1">
								<Label htmlFor="identification_type">Verify your identity</Label>
								<Select
									value={values.identification_type}
									onValueChange={(value) => setFieldValue("identification_type", value)}>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Select an option" />
									</SelectTrigger>
									<SelectContent>
										{identityTypes.map(({ label, value }) => (
											<SelectItem key={value} value={value}>
												{label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
							<Input
								type="text"
								name="identification_number"
								label="Enter ID Number"
								placeholder="ID Number"
								inputMode="numeric"
								onChange={handleChange}
								required
							/>
							{(values.identification_type === "INTERNATIONAL_PASSPORT" ||
								values.identification_type === "DRIVERS_LICENSE") && (
								<DatePicker
									date={values.identification_expiry_date}
									setDate={(date) => setFieldValue("identification_expiry_date", date)}
									name="identification_expiry_date"
									label="Expiry Date"
									required
								/>
							)}
							<div className="flex w-full flex-col gap-1">
								<Label htmlFor="images">Upload Document</Label>
								<div className="flex w-full flex-col gap-3">
									<div className="flex w-full items-center gap-2 rounded-md bg-primary-50 px-4 py-3 text-primary-200">
										<RiAlertFill size={20} />
										<p>Please upload the front and back image of your passport</p>
									</div>
									<label
										htmlFor="images"
										onDragEnter={handleDragEnter}
										onDragOver={handleDragOver}
										onDragLeave={handleDragLeave}
										onDrop={handleDrop}
										draggable
										className="flex w-full flex-col items-center justify-center rounded-md border border-dashed py-5 text-center">
										<input
											ref={input}
											onChange={handleImages}
											type="file"
											id="images"
											name="images"
											accept="image/*"
											className="hidden"
											multiple
										/>
										{isDragging ? (
											<div className="text-sm">
												<p>Drop the files here ...</p>
											</div>
										) : (
											<div>
												<div className="flex items-center text-sm">
													<button type="button" onClick={handleClick} className="mr-1 text-primary-200">
														Click to upload{" "}
													</button>{" "}
													or drag and drop
												</div>
												<p className="text-xs">SVG, PNG, JPG, WEBP or GIF (max. 800x400px)</p>
											</div>
										)}
									</label>
									<div className="flex w-full flex-col gap-3">
										{values.images.map((file, index) => (
											<div
												key={index}
												className="flex w-full items-center gap-3 rounded-md border px-3 py-[10px]">
												<div className="size-9"></div>
												<div className="flex w-full flex-1 flex-col">
													<p className="text-sm text-neutral-500">{file.name}</p>
													<p className="text-xs text-neutral-400">{getFileSizeInMb(file)} MB</p>
												</div>
												<button type="button" onClick={() => removeImage(file)} className="text-red-700">
													<RiDeleteBin6Line size={20} />
												</button>
											</div>
										))}
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
									<>{isLoading ? <Spinner /> : "Next"}</>
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
