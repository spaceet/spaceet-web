declare module "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions" {
	import { IControl, Map as MapboxMap } from "mapbox-gl"

	/**
	 * Options for configuring the Mapbox Directions control.
	 *
	 * @property {string} [accessToken] - The Mapbox API access token.
	 * @property {string} [api] - The URL of the Mapbox Directions API.
	 * @property {string} [profile] - The routing profile to use, one of "mapbox/driving-traffic", "mapbox/driving", "mapbox/walking", or "mapbox/cycling".
	 * @property {boolean} [alternatives] - Whether to generate alternative routes.
	 * @property {boolean} [congestion] - Whether to include congestion information in the route.
	 * @property {string} [unit] - The unit system to use, either "imperial" or "metric".
	 * @property {function(string, any): string} [compile] - A custom function to compile the route template.
	 * @property {object} [geocoder] - Options for the geocoder used to search for locations.
	 * @property {object} [controls] - Options for the UI controls, including "inputs", "instructions", and "profileSwitcher".
	 * @property {boolean} [interactive] - Whether the control should be interactive.
	 * @property {boolean} [proximity] - Whether to use the user's location to bias the geocoder.
	 * @property {any[]} [styles] - Custom styles to apply to the control.
	 * @property {boolean} [flyTo] - Whether to fly the map to the route.
	 * @property {string} [exclude] - A comma-separated list of road types to exclude from the route.
	 * @property {number} [zoom] - The zoom level to use when displaying the route.
	 * @property {string} [language] - The language to use for the control.
	 * @property {string} [placeholderOrigin] - The placeholder text for the origin input.
	 * @property {string} [placeholderDestination] - The placeholder text for the destination input.
	 * @property {number} [bearingSnap] - The maximum angle difference between the user's bearing and the route bearing for the route to be considered straight.
	 */
	export interface MapboxDirectionsOptions {
		accessToken?: string
		api?: string
		profile?: "mapbox/driving-traffic" | "mapbox/driving" | "mapbox/walking" | "mapbox/cycling"
		alternatives?: boolean
		congestion?: boolean
		unit?: "imperial" | "metric"
		compile?: (template: string, data: any) => string
		geocoder?: object
		controls?: {
			inputs?: boolean
			instructions?: boolean
			profileSwitcher?: boolean
		}
		interactive?: boolean
		proximity?: boolean
		styles?: any[]
		flyTo?: boolean
		exclude?: string
		zoom?: number
		language?: string
		placeholderOrigin?: string
		placeholderDestination?: string
		bearingSnap?: number
	}

	interface MapboxDirections extends IControl {
		new (options?: MapboxDirectionsOptions): MapboxDirections
		onAdd(map: MapboxMap): void
		onRemove(map: MapboxMap): void
		setOrigin(query: string | [number, number]): this
		setDestination(query: string | [number, number]): this
		setWaypoint(index: number, waypoint: [number, number]): this
		removeWaypoint(index: number): this
		setProfile(
			profile: "mapbox/driving-traffic" | "mapbox/driving" | "mapbox/walking" | "mapbox/cycling"
		): this
		getOrigin(): { geometry: { coordinates: [number, number] } } | undefined
		getDestination(): { geometry: { coordinates: [number, number] } } | undefined
		getWaypoints(): { geometry: { coordinates: [number, number] } }[]
		getProfile(): "mapbox/driving-traffic" | "mapbox/driving" | "mapbox/walking" | "mapbox/cycling"
		removeRoutes(): this
		on(type: string, fn: Function): this
		off(type: string, fn: Function): this
	}

	/**
	 * A Mapbox GL directions control that provides a user interface for requesting and displaying directions between locations.
	 *
	 * @param {MapboxDirectionsOptions} [options] - Options for configuring the directions control.
	 * @returns {MapboxDirections} - A new instance of the MapboxDirections control.
	 */
	export default class MapboxDirections implements IControl {
		constructor(options?: MapboxDirectionsOptions)
		onAdd(map: MapboxMap): HTMLElement
		onRemove(map: MapboxMap): void

		setOrigin(query: string | [number, number]): this
		setDestination(query: string | [number, number]): this
		setWaypoint(index: number, waypoint: [number, number]): this
		setProfile(
			profile: "mapbox/driving-traffic" | "mapbox/driving" | "mapbox/walking" | "mapbox/cycling"
		): this
		removeWaypoint(index: number): this

		getOrigin(): { geometry: { coordinates: [number, number] } } | undefined
		getDestination(): { geometry: { coordinates: [number, number] } } | undefined
		getWaypoints(): { geometry: { coordinates: [number, number] } }[]

		removeRoutes(): this

		on(type: string, fn: Function): this
		off(type: string, fn: Function): this
	}
}
