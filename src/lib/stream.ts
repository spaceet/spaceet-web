import React from "react"

interface StreamOptions {
	url: string
	update: React.Dispatch<React.SetStateAction<string | null>>
}

export const stream = async ({ update, url }: StreamOptions) => {
	const response = await fetch(url, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
	})
	if (!response.body) {
		throw new Error("No response body")
	}

	const reader = response.body.getReader()
	let readResult = await reader.read()
	const decoder = new TextDecoder()
	while (!readResult.done) {
		const chunk = decoder.decode(readResult.value)
		update((prev) => {
			if (!prev) {
				return chunk
			}
			return prev + chunk
		})
		readResult = await reader.read()
	}
}
