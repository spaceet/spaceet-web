import { useMapsLibrary } from "@vis.gl/react-google-maps"
import React from "react"

export const useGeocoding = (address: string) => {
	const [result, setResult] = React.useState<google.maps.GeocoderResult>()
	const [error, setError] = React.useState<string | null>(null)
	const [loading, setLoading] = React.useState(false)
	const geocodingLib = useMapsLibrary("geocoding")

	React.useEffect(() => {
		if (!geocodingLib || !address) return

		const geocoder = new window.google.maps.Geocoder()
		setLoading(true)
		setError(null)

		geocoder.geocode({ address }, (results, status) => {
			setLoading(false)
			if (status === "OK" && results && results.length > 0) {
				setResult(results[0])
			} else {
				setError(`Geocoding failed with status: ${status}`)
			}
		})
	}, [address, geocodingLib])

	return { error, loading, result }
}
