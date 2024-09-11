import React from "react"

import { Seo } from "../shared"

const PropertyListing = ({}: { handlePrev: () => void; handleNext: () => void }) => {
	return (
		<>
			<Seo title="Property listing" />
			<div className="w-full"></div>
		</>
	)
}

export default PropertyListing
