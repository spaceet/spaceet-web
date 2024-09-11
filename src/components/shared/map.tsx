import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"
import React from "react"

import { Spinner } from "./spinner"

interface Props {
	center: {
		lat: number
		lng: number
	}
}

export const Map = ({ center }: Props) => {
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: "",
		libraries: ["places", "maps"],
	})

	if (loadError) {
		return (
			<div className="grid size-full place-items-center rounded-xl">
				<p className="text-sm text-neutral-400">Error loading maps</p>
			</div>
		)
	}

	if (!isLoaded) {
		return (
			<div className="grid size-full place-items-center rounded-xl">
				<Spinner size="xl" variant="primary" />
			</div>
		)
	}

	return (
		<div className="size-full rounded-xl">
			<GoogleMap center={center} mapContainerStyle={{ width: "100%", height: "100%" }} zoom={10}>
				<Marker position={center} />
			</GoogleMap>
		</div>
	)
}
