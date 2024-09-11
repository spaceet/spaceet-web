import React from "react"

import { Seo } from "../shared"

const ProfileSetup = ({}: { handlePrev: () => void; handleNext: () => void }) => {
	return (
		<>
			<Seo title="Profile setup" />
			<div className="w-full"></div>
		</>
	)
}

export default ProfileSetup
