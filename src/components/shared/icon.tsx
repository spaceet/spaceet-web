import { RiCompass4Line } from "@remixicon/react"
import React from "react"

import { AmenitiesIconName } from "@/types"
import { icons } from "@/config"

interface Props extends React.SVGProps<SVGSVGElement> {
	name: AmenitiesIconName
	size?: number
}

const Icon = React.forwardRef<SVGSVGElement, Props>(({ className, name, size }, ref) => {
	const isIconNotDefined = !icons[name]

	if (isIconNotDefined) {
		return <RiCompass4Line ref={ref} size={size} className={className} />
	}

	const IconComponent = icons[name]

	return <IconComponent ref={ref} size={size} className={className} />
})

Icon.displayName = "Icon"

export { Icon }
