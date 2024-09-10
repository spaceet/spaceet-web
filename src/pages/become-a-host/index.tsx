import { ChevronLeftCircle } from "lucide-react"
import { useRouter } from "next/router"
import React from "react"

import { Appbar, Footer, Seo } from "@/components/shared"

const Page = () => {
	const router = useRouter()

	return (
		<>
			<Seo title="Dashboard" />
			<Appbar />
			<main className="container mx-auto my-12">
				<div className="flex items-center gap-2">
					<button onClick={() => router.back()}>
						<ChevronLeftCircle className="stroke-[1px]" />
					</button>
					<h3 className="font-medium lg:text-2xl">Become a Host</h3>
				</div>
			</main>
			<Footer />
		</>
	)
}

export default Page
