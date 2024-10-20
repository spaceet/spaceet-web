import { useQuery } from "@tanstack/react-query"
import { RiSearchLine } from "@remixicon/react"
import { useRouter } from "next/router"
import { useFormik } from "formik"
import React from "react"

import { Appbar, Card, ComboBox, Counter, Footer, Loading, Rating, Seo } from "@/components/shared"
import { GetAllPropertiesQuery, SearchPropertyDto } from "@/queries"
import { capitalize, sanitizeQueryParams } from "@/lib"
import { Filter as FilterIcon } from "@/assets/svg"
import { apartment_types, places } from "@/config"
import { Button } from "@/components/ui/button"

const Page = () => {
	const [open, setOpen] = React.useState(false)
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

	const { handleSubmit, setFieldValue, values } = useFormik({
		initialValues,
		onSubmit: (values) => {
			console.log(values)
		},
	})

	let ratings: number[] = []
	for (let i = 5; i >= 1; i--) {
		ratings.push(i)
	}

	const { data } = useQuery({
		queryFn: () => GetAllPropertiesQuery(sanitizeQueryParams<SearchPropertyDto>({ ...values })),
		queryKey: [
			"search-properties",
			// values.bedrooms,
			// values.limit,
			// values.location,
			// values.page,
			// values.price,
			// values.type,
		],
	})
	const locations = React.useMemo(() => {
		let locations: string[] = ["All"]
		if (data) {
			data.data.data.forEach((apartment) => {
				if (!locations.includes(apartment.Apartment_city)) {
					locations.push(apartment.Apartment_city)
				}
			})
		}
		return locations
	}, [data])

	if (!data) return <Loading />

	return (
		<>
			<Seo title="Search Apartments" />
			<Appbar />
			<main className="container mx-auto">
				<div className="flex w-full flex-col items-center gap-8 py-6">
					<h1 className="font-medium lg:text-[32px]">Search Apartments</h1>
					<form onSubmit={handleSubmit} className="flex items-center gap-2">
						<ComboBox
							data={places}
							value={values.location}
							onValueChange={(value) => setFieldValue("location", value)}
							placeholder="Location"
							className="h-[45px] w-[180px]"
						/>
						<ComboBox
							data={apartment_types.map((type) => ({
								label: capitalize(type),
								value: type,
							}))}
							value={values.type}
							onValueChange={(value) => setFieldValue("type", value)}
							placeholder="Apartment Type"
							className="h-[45px] w-[180px]"
						/>
						<ComboBox
							data={[...Array(10)].map((_, index) => ({
								label: String(index + 1),
								value: String(index + 1),
							}))}
							value={String(values.bedrooms)}
							onValueChange={(value) => setFieldValue("bedrooms", value)}
							placeholder="Bedrooms"
							className="h-[45px] w-[180px]"
						/>
						<ComboBox
							data={[...Array(10)].map((_, index) => ({
								label: String((index + 1) * 25000),
								value: String((index + 1) * 25000),
							}))}
							value={String(values.price)}
							onValueChange={(value) => setFieldValue("price", value)}
							placeholder="Price Range"
							className="h-[45px] w-[180px]"
						/>
						<Button type="submit" className="w-[129px]">
							Search <RiSearchLine size={18} />
						</Button>
					</form>
				</div>
				<div className="flex h-[100px] w-full items-center justify-center gap-6 border-t">
					<div className="flex w-full flex-1 items-center gap-8 overflow-x-auto">
						{locations.map((location) => (
							<button
								key={location}
								onClick={() => setFieldValue("location", location)}
								className={`w-fit flex-shrink-0 capitalize ${location === values.location ? "font-medium text-neutral-900" : "text-neutral-400"}`}>
								{location}
							</button>
						))}
					</div>
					<Button className="rounded-3xl" onClick={() => setOpen(!open)} variant="outline">
						<FilterIcon />
						Filter
					</Button>
				</div>
				<section className="mb-8 mt-2 flex w-full items-start gap-5">
					<div className={`w-[285px] flex-col gap-1 rounded-lg border ${open ? "flex" : "hidden"}`}>
						<div className="flex w-full items-center justify-between p-4">
							<p className="font-medium lg:text-xl">Filter by</p>
							<button className="text-sm font-medium text-primary-100">APPLY</button>
						</div>
						<div className="flex w-full flex-col gap-2 border-t p-4">
							<div className="flex w-full items-center justify-between">
								<p className="font-medium">Budget</p>
							</div>
							<div className="flex w-full flex-col"></div>
						</div>
						<div className="flex w-full flex-col gap-2 border-t p-4">
							<div className="flex w-full items-center justify-between">
								<p className="font-medium">Location</p>
								<span className="grid min-w-7 place-items-center rounded-full bg-black px-2 py-1 text-xs text-white">
									{locations.length}
								</span>
							</div>
							<div className="flex w-full flex-col gap-2">
								{locations
									.filter((location) => location.toLowerCase() !== "all")
									.map((location) => (
										<div key={location} className="flex h-10 items-center gap-2">
											<input type="checkbox" className="cursor-pointer" />
											<label htmlFor="location" className="capitalize">
												{location}
											</label>
										</div>
									))}
							</div>
						</div>
						<div className="flex w-full flex-col gap-2 border-t p-4">
							<div className="flex w-full items-center justify-between">
								<p className="font-medium">Apartments</p>
								<span className="grid min-w-7 place-items-center rounded-full bg-black px-2 py-1 text-xs text-white">
									{data.data.meta.itemCount}
								</span>
							</div>
							<div className="flex w-full flex-col gap-2">
								{apartment_types.map((type, index) => (
									<div key={index} className="flex h-10 items-center gap-2">
										<input type="checkbox" className="cursor-pointer" />
										<label htmlFor="type" className="capitalize">
											{type}
										</label>
									</div>
								))}
							</div>
						</div>
						<div className="flex w-full flex-col gap-2 border-t p-4">
							<div className="flex w-full items-center justify-between">
								<p className="font-medium">Amenities</p>
								<span className="grid min-w-7 place-items-center rounded-full bg-black px-2 py-1 text-xs text-white">
									0
								</span>
							</div>
						</div>
						<div className="flex w-full flex-col gap-2 border-t p-4">
							<div className="flex w-full items-center justify-between">
								<p className="font-medium">Bedroom & Bathrooms</p>
							</div>
							<div className="flex w-full flex-col gap-2">
								<div className="flex w-full items-center justify-between">
									<p>Bedrooms</p>
									<Counter
										value={Number(values.bedrooms)}
										setValue={(value) => setFieldValue("bedrooms", value)}
									/>
								</div>
								<div className="flex w-full items-center justify-between">
									<p>Bathrooms</p>
									<Counter value={0} setValue={(value) => setFieldValue("bathrooms", value)} />
								</div>
							</div>
						</div>
						<div className="flex w-full flex-col gap-2 border-t p-4">
							<div className="flex w-full items-center justify-between">
								<p className="font-medium">Ratings</p>
							</div>
							<div className="flex w-full flex-col gap-2">
								{ratings.map((index) => (
									<div key={index} className="flex h-10 items-center gap-2">
										<input type="checkbox" className="cursor-pointer" />
										<Rating rating={index} />
									</div>
								))}
							</div>
						</div>
					</div>
					<div className="flex flex-1 flex-wrap">
						{data.data.data.length === 0 ? (
							<div className="grid min-h-40 w-full place-items-center text-center">
								<h1 className="text-center text-base font-medium lg:text-2xl">
									No apartments matching your search criteria.
								</h1>
							</div>
						) : (
							<div className="flex w-full flex-wrap gap-5">
								{data.data.data.map((apartment) => (
									<Card key={apartment.id} apartment={apartment} />
								))}
							</div>
						)}
					</div>
				</section>
			</main>
			<Footer />
		</>
	)
}

export default Page
