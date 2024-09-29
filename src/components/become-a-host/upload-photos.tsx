import { RiArrowLeftSLine, RiArrowRightDoubleLine } from "@remixicon/react"
import { useFormik } from "formik"
import { toast } from "sonner"
import Link from "next/link"
import React from "react"

import { capitalizeWords, getFileExtension, getFileSize, getImageDimensions } from "@/lib"
import { FadeTransition, ImagePicker, Seo } from "../shared"
import { UploadFormProps } from "./form-components"
import { ComponentUpdateProps } from "@/types"
import { Button } from "../ui/button"
import { Label } from "../ui/label"

const allowedExtensions = /jpeg|jpg|png|svg|webp/i
const initialValues: UploadFormProps = {
	images: [],
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
	const { handleSubmit, setFieldValue, values } = useFormik({
		initialValues,
		onSubmit: async (values) => {
			console.log(values)
			handleNext()
		},
	})

	const handleFiles = (files: File[]) => {
		const validFiles = files.filter(async (file) => {
			const ext = getFileExtension(file)
			if (!allowedExtensions.test(ext)) {
				toast.error(`${file.name} is not a valid file!`)
				return false
			}
			const { height, width } = await getImageDimensions(file)
			if (height < 500 || width < 500) {
				toast.error(`${file.name} is too small! Please upload a file greater than 500x500 pixels`)
				return false
			}
			const size = getFileSize(file)
			if (size < 100) {
				toast.error(`${file.name} is too small! Please upload a file greater than 100MB`)
				return false
			}
			if (size > 1000) {
				toast.error(`${file.name} is too large! Please upload a file less than 1GB`)
				return false
			}
			return true
		})

		if (validFiles.length > 0) {
			setFieldValue("images", [...values.images, ...validFiles])
		}
	}

	const onValueChange = (files: File[]) => {
		const updatedFiles = [...values.images, ...files]
		handleFiles(updatedFiles)
	}
	const removeImage = (file: File) => {
		const updatedFiles = values.images.filter((image) => image !== file)
		setFieldValue("images", updatedFiles)
	}

	return (
		<>
			<Seo title={capitalizeWords(label)} description="Become a Host" />
			<form onSubmit={handleSubmit} className="w-full">
				<FadeTransition className="mb-40 mt-[72px] grid w-full place-items-center">
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
						<div className="col-span-2 flex w-full flex-col gap-6">
							<div className="flex w-full flex-col gap-2">
								<p className="text-xl font-medium">Upload Photos</p>
								<p className="text-sm text-neutral-400">
									You&apos;ll also need an apartment or property ready for guests, complete with essential
									amenities like clean bedding, towels, Wi-Fi, and a kitchen.
								</p>
							</div>
							<div className="flex w-full flex-col gap-4 rounded-xl border p-6">
								<div className="flex w-full flex-col gap-5">
									<Label htmlFor="images">Property Photos</Label>
									<ImagePicker
										images={values.images}
										onValueChange={onValueChange}
										removeImage={removeImage}
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
