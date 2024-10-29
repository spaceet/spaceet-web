import "mapbox-gl/dist/mapbox-gl.css"
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css"
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions"
import Map, { GeolocateControl, Marker, NavigationControl } from "react-map-gl"
import type { MapRef } from "react-map-gl"
import React from "react"

// import { mapStyles } from "@/config"

interface Props {
	center: [number, number]
	draggable?: boolean
	enableDirections?: boolean
	enableGeolocate?: boolean
	enablePan?: boolean
	enableScrollZoom?: boolean
	handleCoordinateChange?: (coordinates: [number, number]) => void
	zoom?: number
}

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_API_KEY
// const MAPBOX_STYLES = [
// 	"mapbox://styles/mapbox/streets-v11",
// 	"mapbox://styles/mapbox/outdoors-v11",
// 	"mapbox://styles/mapbox/light-v11",
// 	"mapbox://styles/mapbox/dark-v11",
// 	"mapbox://styles/mapbox/satellite-v9",
// 	"mapbox://styles/mapbox/satellite-streets-v11",
// 	"mapbox://styles/mapbox/navigation-day-v1",
// 	"mapbox://styles/mapbox/navigation-night-v1",
// 	"mapbox://styles/mapbox/navigation-guidance-day-v1",
// 	"mapbox://styles/mapbox/navigation-guidance-night-v1",
// ]

export const Maps = ({
	center,
	draggable = true,
	enableDirections = true,
	enableGeolocate = true,
	enablePan = true,
	enableScrollZoom = true,
	handleCoordinateChange,
	zoom = 11,
}: Props) => {
	const directions = React.useRef<MapboxDirections | null>(null)
	const map = React.useRef<MapRef>(null)!

	React.useEffect(() => {
		if (map.current) {
			map.current.flyTo({
				center: [center[0], center[1]],
				zoom: zoom,
				duration: 2000,
			})

			if (enableDirections) {
				if (!directions.current) {
					directions.current = new MapboxDirections({
						accessToken: MAPBOX_TOKEN!,
						unit: "metric",
						profile: "mapbox/driving",
						placeholderOrigin: "Choose a starting place",
						placeholderDestination: "Choose destination",
						// styles: mapStyles,
					})
					map.current.addControl(directions.current, "top-left")
				}

				// Set the destination to the predefined location
				directions.current.setDestination(center)
			}
		}
	}, [center, enableDirections, map, zoom])

	const handleGeolocate = (center: [number, number]) => {
		handleCoordinateChange?.([center[0], center[1]])
		map.current?.setZoom(zoom)

		// Set the origin to the user's current location
		if (directions.current) {
			directions.current.setOrigin([center[0], center[1]])
		}
	}

	return (
		<Map
			initialViewState={{
				longitude: center[0],
				latitude: center[1],
				zoom,
			}}
			dragPan={enablePan}
			scrollZoom={enableScrollZoom}
			ref={map}
			mapboxAccessToken={MAPBOX_TOKEN}
			onDblClick={(e) => handleCoordinateChange?.([e.lngLat.lng, e.lngLat.lat])}
			mapStyle="mapbox://styles/mapbox/streets-v11"
			style={{ height: "100%", width: "100%", borderRadius: "10px" }}>
			<NavigationControl visualizePitch />
			{enableGeolocate && (
				<GeolocateControl
					positionOptions={{ enableHighAccuracy: true }}
					trackUserLocation={true}
					onGeolocate={(e) => handleGeolocate([e.coords.longitude, e.coords.latitude])}
				/>
			)}
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
