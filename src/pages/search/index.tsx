import { useQuery } from "@tanstack/react-query"
import { RiSearchLine } from "@remixicon/react"
import { useRouter } from "next/router"
import { useFormik } from "formik"
import React from "react"

import { Appbar, Card, ComboBox, Counter, Footer, Loading, Rating, Seo } from "@/components/shared"
import { GetAllPropertiesQuery, SearchPropertyDto } from "@/queries"
import { capitalize, makeNullish, sanitizeQueryParams } from "@/lib"
import { Filter as FilterIcon } from "@/assets/svg"
import { apartment_types, places } from "@/config"
import { Button } from "@/components/ui/button"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"

const Page = () => {
	const [open, setOpen] = React.useState(false)
	const router = useRouter()
	const { bedrooms, limit, location, page, price, type } = router.query

	const [searchParams, setSearchParams] = React.useState<SearchPropertyDto>({
		bedrooms: makeNullish(bedrooms as string) ?? "",
		limit: Number(limit) ?? 20,
		location: makeNullish(location as string) ?? "",
		page: Number(page) ?? 1,
		price: makeNullish(price as string) ?? "",
		type: makeNullish(type as string) ?? "",
	})

	const initialValues: SearchPropertyDto = {
		bedrooms: searchParams.bedrooms,
		limit: searchParams.limit,
		location: searchParams.location,
		page: searchParams.page,
		price: searchParams.price,
		type: searchParams.type,
	}

	const { handleSubmit, setFieldValue, values } = useFormik({
		initialValues,
		enableReinitialize: true,
		onSubmit: (values) => {
			setSearchParams(values)
		},
	})

	let ratings: number[] = []
	for (let i = 5; i >= 1; i--) {
		ratings.push(i)
	}

	const { data } = useQuery({
		queryFn: () => GetAllPropertiesQuery(sanitizeQueryParams<SearchPropertyDto>({ ...searchParams })),
		queryKey: [
			"search-properties",
			searchParams?.bedrooms,
			searchParams?.limit,
			searchParams?.location,
			searchParams?.page,
			searchParams?.price,
			searchParams?.type,
		],
	})

	const handleApplyFilters = () => {
		setSearchParams(values)
	}

	const handleLocationFilter = (location: string) => {
		setFieldValue("location", location)
		setSearchParams({ ...values, location })
	}

	const locations = React.useMemo(() => {
		if (!data) return ["All"]
		const uniqueLocations = new Set(["All"])
		data.data.data.forEach((apartment) => uniqueLocations.add(apartment.Apartment_city))
		return Array.from(uniqueLocations)
	}, [data])

	if (!data) return <Loading />

	return (
		<>
			<Seo title="Search Apartments" />
			<Appbar />
			<main className="container mx-auto">
				<div className="flex w-full flex-col items-center gap-8 py-6">
					<h1 className="font-medium lg:text-[32px]">Search Apartments</h1>
					<form
						onSubmit={handleSubmit}
						className="flex w-full flex-col items-center gap-2 px-4 lg:w-fit lg:flex-row lg:px-0">
						<ComboBox
							data={places}
							value={values.location}
							onValueChange={(value) => setFieldValue("location", value)}
							placeholder="Location"
							className="h-[45px] w-full lg:w-[180px]"
						/>
						<Select
							value={values.type}
							onValueChange={(value) => setFieldValue("type", value === "all" ? "" : value)}>
							<SelectTrigger className="h-[45px] w-full lg:w-[180px]">
								<SelectValue placeholder="Apartment Type" />
							</SelectTrigger>
							<SelectContent>
								{apartment_types.map((type) => (
									<SelectItem key={type} value={type}>
										{capitalize(type)}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						<Select value={values.bedrooms} onValueChange={(value) => setFieldValue("bedrooms", value)}>
							<SelectTrigger className="h-[45px] w-full lg:w-[180px]">
								<SelectValue placeholder="Bedrooms" />
							</SelectTrigger>
							<SelectContent>
								{[...Array(10)].map((_, index) => (
									<SelectItem key={index} value={String(index + 1)}>
										{String(index + 1)}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						<Select value={values.price} onValueChange={(value) => setFieldValue("price", value)}>
							<SelectTrigger className="h-[45px] w-full lg:w-[180px]">
								<SelectValue placeholder="Price Range" />
							</SelectTrigger>
							<SelectContent>
								{[...Array(10)].map((_, index) => (
									<SelectItem key={index} value={String((index + 1) * 25000)}>
										{String((index + 1) * 25000)}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						<Button type="submit" className="w-full lg:w-[129px]">
							Search <RiSearchLine size={18} />
						</Button>
					</form>
				</div>
				<div className="flex h-[100px] w-full items-center justify-center gap-6 border-t px-4 lg:px-0">
					<div className="flex w-full flex-1 items-center gap-8 overflow-x-auto">
						{locations.map((location) => (
							<button
								key={location}
								onClick={() => handleLocationFilter(location)}
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
					<div
						className={`w-[285px] flex-col gap-1 rounded-lg border ${open ? "hidden lg:flex" : "hidden"}`}>
						<div className="flex w-full items-center justify-between p-4">
							<p className="font-medium lg:text-xl">Filter by</p>
							<button onClick={handleApplyFilters} className="text-sm font-medium text-primary-100">
								APPLY
							</button>
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
					<div className="flex flex-1 flex-wrap px-4 lg:px-0">
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
