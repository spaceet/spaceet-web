import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { useFormik } from "formik"
import React from "react"

import { Appbar, Card, Footer, Loading, Pagination, Seo } from "@/components/shared"
import { GetAllPropertiesQuery, SearchPropertyDto } from "@/queries"
import { Filter as FilterIcon } from "@/assets/svg"
import { Button } from "@/components/ui/button"
import { sanitizeQueryParams } from "@/lib"

const Page = () => {
	const router = useRouter()
	const { bedrooms, limit, location, page, price, type } = router.query

	const initialValues: SearchPropertyDto = {
		bedrooms: Number(bedrooms) || 0,
		limit: Number(limit) || 20,
		location: String(location) || "",
		page: Number(page) || 1,
		price: Number(price) || 0,
		type: String(type) || "",
	}

	const { setFieldValue, values } = useFormik({
		initialValues,
		onSubmit: (values) => {
			console.log(values)
		},
	})

	const { data } = useQuery({
		queryFn: () => GetAllPropertiesQuery(sanitizeQueryParams<SearchPropertyDto>({ ...values })),
		queryKey: [
			"search-properties",
			values.bedrooms,
			values.limit,
			values.location,
			values.page,
			values.price,
			values.type,
		],
	})

	if (!data) return <Loading />

	return (
		<>
			<Seo title="Search Apartments" />
			<Appbar />
			<main className="container mx-auto">
				<div className="flex h-[100px] w-full items-center justify-center gap-6">
					<div className="flex-1"></div>
					<Button className="rounded-3xl" variant="outline">
						<FilterIcon />
						Filter
					</Button>
				</div>
				<section className="flex w-full flex-col items-center gap-6 py-10 lg:gap-12 lg:py-20">
					{data.data.data.length === 0 ? (
						<div className="grid min-h-40 w-full place-items-center text-center">
							<h1 className="text-center text-base font-medium lg:text-2xl">
								No apartments matching your search criteria.
							</h1>
						</div>
					) : (
						<div className="grid w-full grid-cols-4 gap-5">
							{data.data.data.map((apartment) => (
								<Card key={apartment.id} apartment={apartment} />
							))}
						</div>
					)}
					<Pagination
						current={Number(values.page)}
						onPageChange={(page) => setFieldValue("page", page)}
						onRowChange={(row) => setFieldValue("limit", row)}
						pageSize={data.data.meta.take}
						total={data.data.meta.itemCount}
					/>
				</section>
			</main>
			<Footer />
		</>
	)
}

export default Page
