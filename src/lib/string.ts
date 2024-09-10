export const capitalize = (value: string) => value.charAt(0).toUpperCase() + value.slice(1)

export const capitalizeWords = (value: string) => {
	const words = value.split(" ")
	return words.map((word) => capitalize(word)).join(" ")
}
