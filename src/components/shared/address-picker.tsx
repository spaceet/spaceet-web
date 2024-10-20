import { useQueries } from "@tanstack/react-query"
import { RiMapPinLine } from "@remixicon/react"
import React from "react"
import axios from "axios"

import { MapboxFeature, MapboxSuggestion } from "@/types"
import { useDebounce } from "@/hooks"
import { Maps } from "./map"

interface Props {
	address: string
	onValueChange: (address: string) => void
}

type MapboxGeoJsonResponse = {
	attribution: string
	features: MapboxFeature[]
	type: string
}

export const AddressPicker = ({ address, onValueChange }: Props) => {
	const [suggestions, setSuggestions] = React.useState<MapboxSuggestion[]>([])
	const [coordinates, setCoordinates] = React.useState<[number, number]>([0, 0])
	const [isUserInput, setIsUserInput] = React.useState(false)
	const [query, setQuery] = React.useState(address)
	const ref = React.useRef<HTMLDivElement>(null)!
	const debouncedQuery = useDebounce(query, 500)

	const [{ data: geojson }, {}] = useQueries({
		queries: [
			{
				queryFn: () =>
					axios
						.get<MapboxGeoJsonResponse>(
							`https://api.mapbox.com/search/geocode/v6/forward?q=${debouncedQuery}&access_token=${process.env.NEXT_PUBLIC_MAPBOX_API_KEY}&autocomplete=true`
						)
						.then((res) => res.data),
				queryKey: ["geocoding", debouncedQuery],
				enabled: !!debouncedQuery && isUserInput,
			},
			{
				queryFn: () =>
					axios
						.get<MapboxGeoJsonResponse>(
							`https://api.mapbox.com/search/geocode/v6/reverse?longitude=${coordinates[0]}&latitude=${coordinates[1]}&access_token=${process.env.NEXT_PUBLIC_MAPBOX_API_KEY}`
						)
						.then((res) => res.data),
				queryKey: ["geocoding"],
				enabled: false,
			},
		],
	})

	React.useEffect(() => {
		if (geojson && isUserInput) {
			const suggestions: MapboxSuggestion[] = geojson.features.map((feature) => {
				const { properties, geometry } = feature
				const { context } = properties

				const country = context.country?.name || ""
				const district = context.district?.name || ""
				const locality = context.locality?.name || ""
				const place = context.place?.name || ""
				const postcode = context.postcode?.name || ""
				const region = context.region?.name || ""
				const street = context.street?.name || ""

				return {
					name: properties.name,
					namePreferred: properties.name_preferred,
					placeFormatted: properties.place_formatted,
					coordinates: {
						latitude: geometry.coordinates[1],
						longitude: geometry.coordinates[0],
					},
					country,
					district,
					locality,
					place,
					postcode,
					region,
					street,
				}
			})
			setSuggestions(suggestions)
		}
	}, [geojson, isUserInput])

	const handleSelect = (suggestion: MapboxSuggestion) => {
		const { coordinates, namePreferred, placeFormatted } = suggestion
		setCoordinates([coordinates.longitude, coordinates.latitude])
		setQuery(placeFormatted || namePreferred)
		onValueChange(placeFormatted || namePreferred)
		setSuggestions([])
		setIsUserInput(false)
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value)
		setIsUserInput(true)
	}

	const handleClickOutside = (e: MouseEvent) => {
		if (ref.current && !ref.current.contains(e.target as Node)) {
			setSuggestions([])
		}
	}

	React.useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside)
		return () => document.removeEventListener("mousedown", handleClickOutside)
	})

	return (
		<div className="flex w-full flex-col gap-3">
			<div className="relative w-full">
				<div className="flex h-[45px] w-full items-center gap-3 rounded-md border border-primary-100 px-3">
					<input
						type="text"
						value={query}
						onChange={handleInputChange}
						placeholder="Enter your address"
						className="flex h-full w-full flex-1 border-0 bg-transparent text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
					/>
					<RiMapPinLine size={20} className="text-primary-100" />
				</div>
				{suggestions.length > 0 && (
					<div
						ref={ref}
						className="absolute left-0 top-full !z-10 flex w-full flex-col gap-2 overflow-y-scroll rounded-lg border bg-white p-2 shadow-xl">
						{suggestions.map((suggestion, index) => (
							<div
								key={index}
								onClick={() => handleSelect(suggestion)}
								className="flex max-h-[250px] w-full cursor-pointer items-center gap-2 rounded-lg p-1 hover:bg-neutral-200">
								<div className="grid size-6 place-items-center rounded-md bg-primary-50 text-primary-100">
									<RiMapPinLine size={16} />
								</div>
								<div className="flex flex-1 flex-col">
									<p className="text-sm font-medium capitalize lg:text-sm">{suggestion.name}</p>
									<p className="text-[10px] text-neutral-400 lg:text-xs">
										{suggestion.street} {suggestion.locality} {suggestion.region}, {suggestion.country}
									</p>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
			<div className="grid h-[200px] w-full place-items-center rounded-xl border">
				<Maps
					center={coordinates}
					handleCoordinateChange={(coordinates) => setCoordinates(coordinates)}
					zoom={15}
				/>
			</div>
		</div>
	)
}
