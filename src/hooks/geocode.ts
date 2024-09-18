import React from "react"

export const useGeocoding = (address: string) => {
	const [coordinates, setCoordinates] = React.useState({ lat: 0, lng: 0 })

	React.useEffect(() => {
		const fetchCoordinates = async () => {
			try {
				const response = await fetch(
					`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}`
				)
				const data = await response.json()
				if (data.status === "OK") {
					const { lat, lng } = data.results[0].geometry.location
					setCoordinates({ lat, lng })
				} else {
					console.error("Geocoding failed:", data.status)
				}
			} catch (error) {
				console.error("Error fetching coordinates:", error)
			}
		}
		fetchCoordinates()
	}, [address])

	return coordinates
}
