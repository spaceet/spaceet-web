import { useRouter } from "next/router"
import React from "react"

import { Button } from "@/components/ui/button"

export const NotFound = () => {
	const router = useRouter()

	return (
		<main className="grid h-screen w-screen place-items-center bg-white">
			<div className="flex flex-col gap-4"></div>
			<h3 className="text-2xl font-medium">Not found!</h3>
			<Button className="rounded-3xl" onClick={() => router.back()}>
				Go back
			</Button>
		</main>
	)
}
