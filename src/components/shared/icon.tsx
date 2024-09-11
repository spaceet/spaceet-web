import React from "react"

import { AmenitiesIconName } from "@/types"
import { icons } from "@/config"

interface Props extends React.SVGProps<SVGSVGElement> {
	name: AmenitiesIconName
}

const Icon = React.forwardRef<SVGSVGElement, Props>(({ name, ...props }, ref) => {
	const IconComponent = icons[name]

	return <IconComponent ref={ref} {...props} />
})

Icon.displayName = "Icon"

export { Icon }
