import { RiMapPinLine } from "@remixicon/react"
import React from "react"

import { dummyGeocodeAddress } from "@/lib"
import { useDebounce } from "@/hooks"

interface Props {
	address: string
	onValueChange: (address: string) => void
}

export const AddressPicker = ({ address, onValueChange }: Props) => {
	const [coordinates, setCoordinates] = React.useState({ lat: 0, lng: 0 })

	const _address = useDebounce(address, 500)

	React.useEffect(() => {
		dummyGeocodeAddress(_address).then((res) => setCoordinates(res))
	}, [address])

	return (
		<div className="flex w-full flex-col gap-3">
			<div className="flex h-[45px] w-full items-center gap-3 rounded-md border border-primary-100 px-3">
				<input
					type="text"
					value={address}
					onChange={(e) => onValueChange(e.target.value)}
					placeholder="Enter your address"
					className="flex h-full w-full flex-1 border-0 bg-transparent text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
				/>
				<RiMapPinLine size={20} className="text-primary-100" />
			</div>
			<div className="grid h-[200px] w-full place-items-center rounded-xl border">
				<p className="text-sm text-neutral-400">
					Lat: {coordinates.lat}, Lng: {coordinates.lng}
				</p>
			</div>
		</div>
	)
}
