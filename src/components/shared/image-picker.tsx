import Image from "next/image"
import React from "react"
import {
	RiAddLine,
	RiDeleteBin6Line,
	RiDownloadCloud2Line,
	RiUploadCloud2Line,
} from "@remixicon/react"

import { useDragAndDrop } from "@/hooks"
import { cn } from "@/lib"

interface Props {
	images: File[]
	onValueChange: (images: File[]) => void
	removeImage: (file: File) => void
	maxFileSize?: number
}

export const ImagePicker = ({ images, onValueChange, removeImage }: Props) => {
	const { handleDragEnter, handleDragLeave, handleDragOver, handleDrop, isDragging } =
		useDragAndDrop()
	const ref = React.useRef<HTMLInputElement>(null)!

	const handleClick = () => {
		if (ref.current) {
			ref.current.click()
		}
	}

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) return
		const files = Array.from(e.target.files)
		onValueChange(files)
	}

	return (
		<label
			htmlFor="images"
			draggable
			onDragEnter={handleDragEnter}
			onDragLeave={handleDragLeave}
			onDragOver={handleDragOver}
			onDrop={handleDrop}
			className={cn("flex h-full w-full flex-col gap-3 text-neutral-400 transition-all duration-500")}>
			<input
				ref={ref}
				type="file"
				name="iimage"
				id="images"
				onChange={handleFileChange}
				accept="image/*"
				multiple
				className="sr-only hidden"
			/>
			{!images.length ? (
				<>
					{isDragging ? (
						<div className="grid h-[420px] w-full place-items-center rounded-lg border border-dashed [border-dash-array:_20px_20px]">
							<div className="flex flex-col items-center justify-center gap-[10px]">
								<div className="size-10">
									<RiDownloadCloud2Line />
								</div>
							</div>
						</div>
					) : (
						<div className="flex w-full flex-col gap-3">
							<div className="grid h-[204px] w-full place-items-center rounded-lg border border-dashed [border-dash-array:_20px_20px]">
								<div className="flex flex-col items-center justify-center gap-[10px]">
									<div className="size-10">
										<RiUploadCloud2Line />
									</div>
									<div className="flex items-center text-sm text-neutral-500">
										<button type="button" onClick={handleClick} className="mr-1 underline">
											Upload
										</button>
										or drag property photos
									</div>
									<p className="text-xs">Max. file size (JPEG, PNG, SVG, & WEBP)</p>
								</div>
							</div>
							<div className="flex h-[204px] w-full items-center gap-3">
								<button
									type="button"
									onClick={handleClick}
									className="grid h-full w-full flex-1 cursor-pointer place-items-center rounded-lg border border-dashed [border-dash-array:_20px_20px]">
									<RiAddLine className="text-neutral-500" />
								</button>
								<button
									type="button"
									onClick={handleClick}
									className="grid h-full w-full flex-1 cursor-pointer place-items-center rounded-lg border border-dashed [border-dash-array:_20px_20px]">
									<RiAddLine className="text-neutral-500" />
								</button>
							</div>
						</div>
					)}
				</>
			) : (
				<div className="grid w-full grid-cols-2 gap-3">
					{images.slice(0, 5).map((file, index) => (
						<div
							key={index}
							className={`group relative h-[206px] w-full rounded-lg border ${index === 0 ? "col-span-2" : ""}`}>
							{index === 0 && (
								<div className="absolute left-3 top-3 !z-[5] rounded-md bg-white px-3 py-2 text-sm font-medium text-neutral-900">
									Cover Photo
								</div>
							)}
							<button
								type="button"
								onClick={() => removeImage(file)}
								className="absolute right-3 top-3 !z-[5] grid size-6 place-items-center rounded-md bg-white text-neutral-900">
								<RiDeleteBin6Line size={14} />
							</button>
							<Image
								src={URL.createObjectURL(file)}
								alt={`property-image-${index}`}
								fill
								sizes="(max-width:1024px)1000%"
								className="rounded-lg object-cover"
							/>
						</div>
					))}
				</div>
			)}
			<button
				type="button"
				onClick={handleClick}
				className="flex w-full items-center justify-center gap-2 rounded-lg border bg-neutral-200 py-4 text-sm text-neutral-600">
				<RiAddLine />
				Add more photos
			</button>
		</label>
	)
}
