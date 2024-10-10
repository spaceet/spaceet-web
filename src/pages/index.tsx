import { RiArrowRightUpLine } from "@remixicon/react"
import { useQueries } from "@tanstack/react-query"
import { toast } from "sonner"
import Image from "next/image"
import Link from "next/link"
import React from "react"

import { GetAllPropertiesQuery, GetAllReviewsQuery } from "@/queries"
import { Filter as FilterIcon } from "@/assets/svg"
import { booking_steps, places } from "@/config"
import { Button } from "@/components/ui/button"
import { properties } from "@/mock/properties"
import { Input } from "@/components/ui/input"
import { mock_reviews } from "@/mock/reviews"
import {
	Appbar,
	Card,
	Footer,
	Loading,
	Reviews,
	ScrollContainer,
	SearchWidget,
	Seo,
} from "@/components/shared"

const EMAIL_REGEX =
	/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

const Page = () => {
	const [location, setLocation] = React.useState("all")
	const [email, setEmail] = React.useState("")

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (!email || !EMAIL_REGEX.test(email)) {
			toast.error("Please enter a valid email address")
			return
		}
	}

	const handleFilter = () => {
		console.log(location)
	}

	const [{ data: apartments }, {}] = useQueries({
		queries: [
			{
				queryFn: () => GetAllPropertiesQuery({ limit: 12, page: 1 }),
				queryKey: ["all-apartments"],
			},
			{
				queryFn: () => GetAllReviewsQuery("", {}),
				queryKey: ["get-reviews"],
				enabled: false,
			},
		],
	})

	if (!apartments) return <Loading />

	const filtered = (location: string) => {
		return (
			apartments.data.data.filter((apartment) => {
				if (location === "all" || location === "") return apartment
				return apartment.Apartment_city.toLowerCase().includes(location.toLowerCase())
			}) ?? []
		)
	}

	return (
		<>
			<Seo title="Vacation rentals, cabins, beach houses, and more" />
			<Appbar />
			<main className="w-full">
				<div className="place-tems-center grid h-auto w-full bg-black/50 bg-hero-2 bg-cover bg-center bg-no-repeat bg-blend-overlay lg:h-[calc(100vh-100px)]">
					<div className="container mx-auto flex flex-col items-center gap-9 px-5 py-12 lg:flex-row lg:justify-between lg:px-0 lg:py-0">
						<div className="flex w-full flex-col gap-5 text-white lg:w-[511px]">
							<h1 className="text-[32px] font-bold leading-[38.4px] lg:text-[64px] lg:leading-[70px]">
								Discover Your Next Adventure.
							</h1>
							<p className="text-xl">
								With so many choices, you might just become a fan of any city - even your rivals.
							</p>
							<Button className="h-[52px] w-[210px]">Find Apartment</Button>
						</div>
						<SearchWidget />
					</div>
				</div>
				<section className="container mx-auto flex flex-col gap-6 px-5 py-8 lg:px-0 lg:py-[26px]">
					<div className="flex w-full items-center justify-between">
						<h4 className="text-xl font-medium lg:text-[32px]">Explore Top Destinations</h4>
					</div>
					<ScrollContainer properties={properties.slice(0, 6)} />
				</section>
				<section className="w-full px-5 py-8 lg:px-0 lg:py-10">
					<div className="container mx-auto py-2 lg:py-6">
						<h4 className="text-xl font-medium lg:text-[32px]">For You</h4>
					</div>
					<div className="container mx-auto flex flex-col items-center justify-center gap-4 border-t py-4 lg:h-[100px] lg:flex-row lg:py-0">
						<div className="flex w-full flex-1 items-center gap-8 overflow-x-auto">
							{places.map(({ value }) => (
								<button
									key={value}
									onClick={() => setLocation(value)}
									className={`w-fit flex-shrink-0 capitalize ${value === location ? "font-medium text-neutral-900" : "text-neutral-400"}`}>
									{value}
								</button>
							))}
						</div>
						<Button onClick={handleFilter} className="w-full rounded-3xl lg:w-fit" variant="outline">
							<FilterIcon />
							Filter
						</Button>
					</div>
					<div className="container flex items-start gap-x-5 gap-y-10 overflow-x-scroll lg:grid lg:grid-cols-4">
						{filtered(location)
							.slice(0, 12)
							.map((property) => (
								<Card key={property.id} apartment={property} />
							))}
					</div>
				</section>
				<section className="bg-primary-50 px-5 py-8 lg:px-0 lg:py-[88px]">
					<div className="container mx-auto flex flex-col items-center justify-center gap-10">
						<div className="flex w-full flex-col items-start gap-3 text-center lg:w-[433px] lg:items-center">
							<div className="rounded-full bg-white px-4 py-2 text-sm text-black">Get Started</div>
							<h2 className="text-xl font-medium leading-[22px] text-black lg:text-[42px] lg:leading-[46px]">
								Book your Apartment in Three steps
							</h2>
						</div>
						<div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
							{booking_steps.map((step, index) => (
								<div
									key={index}
									className="flex w-full flex-col gap-[26px] rounded-[10px] border border-[#eceff3] bg-white p-6 lg:aspect-[96/100]">
									<div className="mx-auto grid aspect-square w-[200px] place-items-center">
										<Image
											src={step.image}
											alt={step.label}
											width={step.size}
											height={step.size}
											className="object-cover"
										/>
									</div>
									<div className="flex w-full flex-col gap-5 text-black">
										<div className="flex flex-col gap-1">
											<h4 className="font-semibold lg:text-xl">{step.label}</h4>
											<p className="text-sm leading-4 text-neutral-600 lg:text-base">{step.content}</p>
										</div>
										<Link href="/search" className="flex items-center gap-x-1">
											<span className="font-medium underline">Get Started</span>
											<RiArrowRightUpLine size={16} />
										</Link>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>
				<section className="bg-[#f5f5f5] px-5 py-16 lg:px-0 lg:py-[120px]">
					<div className="flex w-full flex-col gap-16">
						<div className="container mx-auto flex flex-col gap-5">
							<div className="w-fit rounded-full bg-white px-4 py-2 text-sm text-black">Testimonials</div>
							<div className="flex w-full flex-col items-center lg:flex-row lg:justify-between">
								<h2 className="w-full text-xl font-medium leading-[46px] text-black lg:w-[433px] lg:text-[42px]">
									What people are saying about us
								</h2>
								<p className="w-full text-sm text-black lg:w-[414px] lg:text-xl">
									Whether you&apos;re a small startup or a multinational corporation, let us be your trusted
									advisor on the path to success.
								</p>
							</div>
						</div>
						<Reviews reviews={mock_reviews} />
					</div>
				</section>
				<section className="grid h-[350px] w-full place-items-center bg-black/50 bg-footer bg-cover bg-center px-4 bg-blend-overlay lg:h-[600px] lg:px-0">
					<div className="flex h-full w-full max-w-[496px] flex-col items-center justify-center gap-5 text-center">
						<div className="flex w-full flex-col items-center gap-2 lg:gap-5">
							<h2 className="text-2xl font-bold leading-7 text-white lg:text-[64px] lg:leading-[70px]">
								Get Latest Listing Updates
							</h2>
							<p className="text-sm text-white lg:text-xl">
								With so many choices, you just might become a fan of any city - even your rivals.
							</p>
						</div>
						<form onSubmit={handleSubmit} className="flex w-full flex-col items-center gap-2 lg:flex-row">
							<Input
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="Enter your email"
								innerClassName="bg-white"
							/>
							<Button type="submit" className="w-full lg:w-fit">
								Subscribe
							</Button>
						</form>
					</div>
				</section>
			</main>
			<Footer />
		</>
	)
}

export default Page
