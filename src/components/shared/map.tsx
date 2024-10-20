import "mapbox-gl/dist/mapbox-gl.css"
import Map, { GeolocateControl, MapRef, Marker, NavigationControl } from "react-map-gl"
import React from "react"

interface Props {
	center: [number, number]
	draggable?: boolean
	handleCoordinateChange?: (coordinates: [number, number]) => void
	zoom?: number
}

export const Maps = ({ center, handleCoordinateChange, draggable = true, zoom = 11 }: Props) => {
	const mapRef = React.useRef<MapRef>(null)

	React.useEffect(() => {
		if (mapRef.current) {
			mapRef.current.flyTo({
				center,
				zoom: zoom,
				duration: 2000,
			})
		}
	}, [center, zoom])

	return (
		<Map
			ref={mapRef}
			mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
			initialViewState={{
				longitude: center[0],
				latitude: center[1],
				zoom: zoom,
			}}
			onDblClick={(e) => handleCoordinateChange?.([e.lngLat.lng, e.lngLat.lat])}
			mapStyle="mapbox://styles/mapbox/streets-v11"
			style={{ height: "100%", width: "100%", borderRadius: "10px" }}>
			<NavigationControl visualizePitch />
			<GeolocateControl
				positionOptions={{ enableHighAccuracy: true }}
				trackUserLocation={true}
				onGeolocate={(e) => handleCoordinateChange?.([e.coords.longitude, e.coords.latitude])}
			/>
			<Marker
				longitude={center[0]}
				latitude={center[1]}
				anchor="bottom"
				draggable={draggable}
				scale={0.75}
				onDrag={(e) => handleCoordinateChange?.([e.lngLat.lng, e.lngLat.lat])}
			/>
		</Map>
	)
}
