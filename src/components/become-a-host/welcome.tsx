import React from "react"

import { Seo } from "../shared"

const Welcome = ({}: { handleNext: () => void }) => {
	return (
		<>
			<Seo title="Become a Host" />
			<div className="flex w-full flex-col gap-6"></div>
		</>
	)
}

export default Welcome
