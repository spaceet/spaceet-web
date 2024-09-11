import React from "react"

import { Appbar, Seo } from "@/components/shared"
import { useUserStore } from "@/store/z-store"
import { capitalizeWords } from "@/lib"

const Page = () => {
	const { user } = useUserStore()

	return (
		<>
			<Seo title={capitalizeWords(String(`${user?.firstName} ${user?.lastName}`))} />
			<Appbar />
			<main className="container mx-auto my-12"></main>
		</>
	)
}

export default Page
