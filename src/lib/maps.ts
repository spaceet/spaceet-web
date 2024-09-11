export const getCoordinatesFromAddress = (address: string) => {
	return new Promise((resolve, reject) => {
		var geocoder = new google.maps.Geocoder()
		console.log(geocoder)
		geocoder.geocode({ address }, (results: any, status: any) => {
			console.log({ results, status })
			if (status === google.maps.GeocoderStatus.OK) {
				resolve(results[0].geometry.location)
			} else {
				reject(status)
			}
		})
	})
}
