import { RiArrowLeftSLine, RiArrowRightDoubleLine, RiDeleteBin6Line } from "@remixicon/react"
import { animated, useSpring } from "@react-spring/web"
import { motion } from "framer-motion"
import { useFormik } from "formik"
import { toast } from "sonner"
import Link from "next/link"
import React from "react"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { capitalizeWords, getFileExtension, getFileSizeInMb } from "@/lib"
import { proofOfOwnership, springs, stagger } from "@/config"
import { FadeTransition, Seo } from "../shared"
import { ComponentUpdateProps } from "@/types"
import { useCreateHostStore } from "./store"
import { useDragAndDrop } from "@/hooks"
import { Button } from "../ui/button"
import { Label } from "../ui/label"

const allowedExtensions = /jpeg|jpg|png|svg|webp/i

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
	const { setVerifyProperty, verifyProperty } = useCreateHostStore()
	const input = React.useRef<HTMLInputElement>(null)!
	const { files, handleDragEnter, handleDragLeave, handleDragOver, handleDrop, isDragging } =
		useDragAndDrop()

	const handleClick = () => {
		if (input.current) {
			input.current.click()
		}
	}

	const springHeader = useSpring(springs.slide("right"))
	const springChild = useSpring(springs.slide("up"))

	const { handleSubmit, setFieldValue, values } = useFormik({
		initialValues: {
			documentImages: verifyProperty.documentImages,
			documentType: verifyProperty.documentType,
		},
		onSubmit: (values) => {
			if (!values.documentType) {
				toast.error("Please select the type of property verification document!")
			}
			if (!values.documentImages.length) {
				toast.error("Please upload an image of the property verification document!")
				return
			}
			setVerifyProperty(values)
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
			setFieldValue("documentImages", [...values.documentImages, ...validFiles])
		}
	}

	const handleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) return
		const files = Array.from(e.target.files)
		handleFiles(files)
	}

	const removeImage = (file: File) => {
		const updatedFiles = values.documentImages.filter((image) => image !== file)
		setFieldValue("idImages", updatedFiles)
	}

	React.useEffect(() => {
		handleFiles(files)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [files])

	return (
		<>
			<Seo title={capitalizeWords(label)} description="Become a Host" />
			<form onSubmit={handleSubmit} className="w-full">
				<FadeTransition className="my-[72px] grid w-full place-items-center">
					<div className="grid h-[calc(100vh-209px)] w-full grid-cols-3">
						<div className="w-full">
							<div className="flex w-full flex-col gap-4 lg:w-[329px]">
								<button onClick={handlePrev} className="flex items-center font-semibold">
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
						<div className="col-span-2 flex w-full flex-col gap-6">
							<div className="flex w-full flex-col gap-2">
								<p className="text-xl font-medium">Verify Property</p>
								<p className="text-sm text-neutral-400">
									You&apos;ll also need an apartment or property ready for guests, complete with essential
									amenities like clean bedding, towels, Wi-Fi, and a kitchen.
								</p>
							</div>
							<div className="flex w-full flex-col gap-4 rounded-xl border p-6">
								<div className="flex w-full flex-col gap-5">
									<Label htmlFor="documentType">Choose Document to Upload</Label>
									<Select
										value={values.documentType}
										onValueChange={(value) => setFieldValue("documentType", value)}>
										<SelectTrigger>
											<SelectValue placeholder="Select a document" />
										</SelectTrigger>
										<SelectContent>
											{proofOfOwnership.map(({ label, value }) => (
												<SelectItem key={value} value={value}>
													{label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
								<div className="flex w-full flex-col gap-5">
									<Label htmlFor="documentImages">Upload Document</Label>
									<label
										htmlFor="documentImages"
										onDragEnter={handleDragEnter}
										onDragOver={handleDragOver}
										onDragLeave={handleDragLeave}
										onDrop={handleDrop}
										draggable
										className="flex h-[150px] w-full flex-col items-center justify-center rounded-md border border-dashed py-5 text-center">
										<input
											ref={input}
											onChange={handleImages}
											type="file"
											accept="image/*"
											className="hidden"
											id="documentImages"
											name="documentImages"
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
										{values.documentImages.map((file, index) => (
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
