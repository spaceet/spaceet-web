export const getCoordinatesFromAddress = async (
	address: string
): Promise<{ lat: number; lng: number }> => {
	if (typeof google === "undefined") {
		throw new Error("Google Maps JavaScript API not loaded")
	}

	const geocoder = new google.maps.Geocoder()

	try {
		const result = await new Promise<google.maps.GeocoderResult[]>((resolve, reject) => {
			geocoder.geocode({ address }, (results, status) => {
				if (status === google.maps.GeocoderStatus.OK && results) {
					resolve(results)
				} else {
					reject(new Error(`Geocoding failed: ${status}`))
				}
			})
		})

		if (result[0]) {
			const location = result[0].geometry.location
			return { lat: location.lat(), lng: location.lng() }
		}

		return { lat: 0, lng: 0 }
	} catch (error) {
		console.error("Geocoding error:", error)
		return { lat: 0, lng: 0 }
	}
}

export const dummyGeocodeAddress = (_address: string): Promise<{ lat: number; lng: number }> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			const lat = Math.random() * 180 - 90
			const lng = Math.random() * 360 - 180

			resolve({ lat, lng })
		}, 5000)
	})
}
