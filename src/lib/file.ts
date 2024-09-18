export type FileMetricProps = "Kb" | "Mb" | "Gb"

export const getFileExtension = (file: File) => {
	const parts = file.name.split(".")
	return parts[parts.length - 1]
}

export const getFileSizeInMb = (file: File) => file.size / (1024 * 1024)

export const getFileSize = (file: File, metric: FileMetricProps = "Mb") => {
	switch (metric) {
		case "Kb":
			return file.size / 1024
		case "Mb":
			return file.size / (1024 * 1024)
		case "Gb":
			return file.size / (1024 * 1024 * 1024)
		default:
			return file.size / (1024 * 1024)
	}
}

export const getImageDimensions = async (
	file: File
): Promise<{ width: number; height: number }> => {
	return new Promise((resolve, reject) => {
		const img = new Image()
		const objectUrl = URL.createObjectURL(file)

		img.onload = () => {
			const dimensions = { width: img.width, height: img.height }
			URL.revokeObjectURL(objectUrl)
			resolve(dimensions)
		}

		img.onerror = (error) => {
			URL.revokeObjectURL(objectUrl)
			reject(error)
		}

		img.src = objectUrl
	})
}

export const getPreviewUrl = (file: File) => {
	return URL.createObjectURL(file)
}
