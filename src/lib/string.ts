export const capitalize = (value: string) => value.charAt(0).toUpperCase() + value.slice(1)

export const capitalizeWords = (value: string) => {
	const words = value.split(" ")
	return words.map((word) => capitalize(word)).join(" ")
}

export const getInitials = (value: string) => {
	return value
		.split(" ")
		.map((word) => word.charAt(0).toUpperCase())
		.join("")
}

export const generateUuid = () => {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
		const r = (Math.random() * 16) | 0
		const v = c === "x" ? r : (r & 0x3) | 0x8
		return v.toString(16)
	})
}

export const normalized = (path?: string): string => {
	let normalPath = ""
	if (path) {
		if (path.split("/").length > 2) {
			const pathParts = `/${path.split("/")[1]}/${path.split("/")[2]}`
			normalPath = pathParts
		} else {
			normalPath = path
		}
	}
	return normalPath
}

export const toKebabCase = (value: string) => {
	return value
		.replace(/([a-z])([A-Z])/g, "$1-$2")
		.replace(/[\s_]+/g, "-")
		.toLowerCase()
}

export const fromKebabCase = (value: string) => value.split("-").join(" ")

export const toTitleCase = (value: string) => {
	return value
		.replace(/([a-z])([A-Z])/g, "$1 $2")
		.replace(/[\s_]+/g, " ")
		.replace(/(^|\s)\S/g, (match) => match.toUpperCase())
}

export const urlify = (text: string) => {
	const urlRegex = /(https?:\/\/[^\s]+)/g
	return text.replace(urlRegex, (url) => {
		return "<a href=" + url + " target='_blank' rel='noreferrer noopener'>" + url + "</a>"
	})
}

export const createFlagEmoji = (code: string) => {
	const codePoints = code
		.toUpperCase()
		.split("")
		.map((char) => 127397 + char.charCodeAt(0))
	return String.fromCodePoint(...codePoints)
}

export const makeNullish = <T extends string | number>(value: T) => {
	if (value === "" || value === null || value === undefined || value === 0) {
		return null
	}
	return value
}
