import React from "react"

export const useWindowSize = () => {
	const [windowSize, setWindowSize] = React.useState<[number, number]>([
		window.innerWidth,
		window.innerHeight,
	])

	React.useEffect(() => {
		const handleResize = () => {
			setWindowSize([window.innerWidth, window.innerHeight])
		}

		window.addEventListener("resize", handleResize)

		return () => {
			window.removeEventListener("resize", handleResize)
		}
	}, [])

	return windowSize
}
