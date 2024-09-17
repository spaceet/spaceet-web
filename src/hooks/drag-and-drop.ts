import React from "react"

export interface DragAndDropProps {
	files: File[]
	handleDragEnter: (e: React.DragEvent<HTMLLabelElement>) => void
	handleDragOver: (e: React.DragEvent<HTMLLabelElement>) => void
	handleDragLeave: (e: React.DragEvent<HTMLLabelElement>) => void
	handleDrop: (e: React.DragEvent<HTMLLabelElement>) => void
	isDragging: boolean
}

export const useDragAndDrop = (): DragAndDropProps => {
	const [isDragging, setIsDragging] = React.useState(false)
	const [files, setFiles] = React.useState<File[]>([])

	const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
		e.preventDefault()
		e.stopPropagation()
		setIsDragging(true)
	}

	const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
		e.preventDefault()
		e.dataTransfer.dropEffect = "copy"
	}

	const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
		e.preventDefault()
		setIsDragging(false)
	}

	const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
		e.preventDefault()
		e.stopPropagation()
		if (!e.dataTransfer.files) return
		const files = Array.from(e.dataTransfer.files)
		setFiles((prev) => [...prev, ...files])
		setIsDragging(false)
	}

	return {
		files,
		handleDragEnter,
		handleDragOver,
		handleDragLeave,
		handleDrop,
		isDragging,
	}
}
