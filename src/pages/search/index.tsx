import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { useFormik } from "formik"
import React from "react"

import { Appbar, Footer, Seo } from "@/components/shared"
import { Filter as FilterIcon } from "@/assets/svg"
import { SearchPropertiesQuery } from "@/queries"
import { Button } from "@/components/ui/button"

const Page = () => {
	const router = useRouter()
	const { bedrooms, location, price, propertyType } = router.query

	const { values } = useFormik({
		initialValues: {
			bedrooms: Number(bedrooms) || 1,
			location: String(location) || "",
			price: Number(price) || 0,
			propertyType: String(propertyType) || "",
		},
		onSubmit: (values) => {
			console.log(values)
		},
	})

	const {} = useQuery({
		queryFn: () => SearchPropertiesQuery(values),
		queryKey: ["search-properties", bedrooms, location, price, propertyType],
		enabled: false,
	})

	return (
		<>
			<Seo title="Search Apartments" />
			<Appbar />
			<main className="container mx-auto">
				<div className="flex h-[100px] w-full items-center justify-center gap-4">
					<div className="flex-1"></div>
					<Button className="rounded-3xl" variant="outline">
						<FilterIcon />
						Filter
					</Button>
				</div>
				<section className="grid w-full grid-cols-4 gap-5"></section>
			</main>
			<Footer />
		</>
	)
}

export default Page
