import React from "react"

import { Appbar, Footer, Seo } from "@/components/shared"

const Page = () => {
	return (
		<>
			<Seo title="Vacation rentals, cabins, beach houses, and more" />
			<Appbar />
			<main className="w-full">
				<div className="h-[600px] w-full">
					<div className="container mx-auto"></div>
				</div>
				<section className="container mx-auto"></section>
			</main>
			<Footer />
		</>
	)
}

export default Page
