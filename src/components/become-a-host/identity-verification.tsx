import { RiAlertFill, RiArrowLeftSLine, RiDeleteBin6Line } from "@remixicon/react"
import { differenceInDays } from "date-fns"
import { useFormik } from "formik"
import { toast } from "sonner"
import Link from "next/link"
import React from "react"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { capitalizeWords, getFileExtension, getFileSizeInMb } from "@/lib"
import { IdentityFormProps } from "./form-components"
import { DatePicker, FadeTransition, Seo } from "../shared"
import { ComponentUpdateProps } from "@/types"
import { useDragAndDrop } from "@/hooks"
import { identity_types } from "./data"
import { Label } from "../ui/label"
import { Input } from "../ui/input"

const allowedExtensions = /jpeg|jpg|png|svg|webp/i
const initialValues: IdentityFormProps = {
	idExpiry: "",
	idImages: [],
	idType: "",
	idNumber: "",
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
	const input = React.useRef<HTMLInputElement>(null)!
	const { files, handleDragEnter, handleDragLeave, handleDragOver, handleDrop, isDragging } =
		useDragAndDrop()

	const handleClick = () => {
		if (input.current) {
			input.current.click()
		}
	}

	const { handleChange, handleSubmit, setFieldValue, values } = useFormik({
		initialValues,
		onSubmit: (values) => {
			console.log(values)
			if (values.idExpiry) {
				if (differenceInDays(new Date(values.idExpiry), new Date()) < 90) {
					toast.error("Expiry date must be at least 90 days from today")
					return
				}
			}
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
			setFieldValue("idImages", [...values.idImages, ...validFiles])
		}
	}

	const handleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) return
		const files = Array.from(e.target.files)
		handleFiles(files)
	}

	const removeImage = (file: File) => {
		const updatedFiles = values.idImages.filter((image) => image !== file)
		setFieldValue("idImages", updatedFiles)
	}

	React.useEffect(() => {
		handleFiles(files)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [files])

	React.useEffect(() => {
		updateCanProceed(true)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<>
			<Seo title={capitalizeWords(label)} description="Become a Host" />
			<FadeTransition className="my-[72px] grid w-full place-items-center">
				<div className="mx-auto flex h-full items-start gap-[54px]">
					<div className="w-[300px]">
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
					<form
						onSubmit={handleSubmit}
						className="flex h-full w-[600px] flex-col gap-6 rounded-2xl border p-6">
						<div className="flex w-full flex-col gap-1">
							<Label htmlFor="idType">Verify your identity</Label>
							<Select value={values.idType} onValueChange={(value) => setFieldValue("idType", value)}>
								<SelectTrigger className="w-full">
									<SelectValue placeholder="Select an option" />
								</SelectTrigger>
								<SelectContent>
									{identity_types.map(({ label, value }) => (
										<SelectItem key={value} value={value}>
											{label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
						<Input
							type="text"
							name="idNumber"
							label="Enter ID Number"
							placeholder="ID Number"
							inputMode="numeric"
							onChange={handleChange}
							required
						/>
						{(values.idType === "internationlPassport" || values.idType === "driversLicense") && (
							<DatePicker
								date={values.idExpiry}
								setDate={(date) => setFieldValue("idExpiry", date)}
								name="idExpiry"
								label="Expiry Date"
								required
							/>
						)}
						<div className="flex w-full flex-col gap-1">
							<Label htmlFor="idImages">Upload Document</Label>
							<div className="flex w-full flex-col gap-3">
								<div className="flex w-full items-center gap-2 rounded-md bg-primary-50 px-4 py-3 text-primary-200">
									<RiAlertFill size={20} />
									<p>Please upload the front and back image of your passport</p>
								</div>
								<label
									htmlFor="idImages"
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
										id="idImages"
										name="idImages"
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
									{values.idImages.map((file, index) => (
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
					</form>
				</div>
			</FadeTransition>
		</>
	)
}

export default Page
