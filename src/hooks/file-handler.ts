import React from "react"

export const useFileHandler = (onValueChange: (files: File[]) => void) => {
	const inputRef = React.useRef<HTMLInputElement>(null)

	const handleClick = () => {
		if (inputRef.current) {
			inputRef.current.click()
		}
	}

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) return
		const files = Array.from(e.target.files)
		onValueChange(files)
	}

	return { handleFileChange, handleClick, inputRef }
}
