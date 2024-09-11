import React from "react"

import { Appbar, Seo } from "@/components/shared"

const Page = () => {
	return (
		<>
			<Seo title="Favorites" />
			<Appbar />
			<main className="container mx-auto my-12">Favorites</main>
		</>
	)
}

export default Page
