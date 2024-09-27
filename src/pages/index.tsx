import { RiArrowRightUpLine } from "@remixicon/react"
import { useQueries } from "@tanstack/react-query"
import { toast } from "sonner"
import Image from "next/image"
import Link from "next/link"
import React from "react"

import { GetAllPropertiesQuery, GetPropertiesByLocationQuery, GetAllReviewsQuery } from "@/queries"
import {
	Appbar,
	Card,
	Footer,
	Reviews,
	ScrollContainer,
	SearchWidget,
	Seo,
} from "@/components/shared"
import { Filter as FilterIcon } from "@/assets/svg"
import { booking_steps, places } from "@/config"
import { Button } from "@/components/ui/button"
import { properties } from "@/mock/properties"
import { Input } from "@/components/ui/input"
import { mock_reviews } from "@/mock/reviews"

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

	const [{}, {}, {}] = useQueries({
		queries: [
			{
				queryFn: () => GetAllPropertiesQuery({ limit: 12, page: 1 }),
				queryKey: ["all-properties"],
				enabled: false,
			},
			{
				queryFn: () => GetPropertiesByLocationQuery(),
				queryKey: ["properties-by-location"],
				enabled: false,
			},
			{
				queryFn: () => GetAllReviewsQuery("", {}),
				queryKey: ["get-reviews"],
				enabled: false,
			},
		],
	})

	const filtered = (location: string) => {
		return properties.filter((property) => {
			if (location === "all" || location === "") return property
			return property.location.toLowerCase().includes(location.toLowerCase())
		})
	}

	return (
		<>
			<Seo title="Vacation rentals, cabins, beach houses, and more" />
			<Appbar />
			<main className="w-full">
				<div className="place-tems-center grid h-[calc(100vh-100px)] w-full bg-black/50 bg-hero-2 bg-cover bg-center bg-no-repeat bg-blend-overlay">
					<div className="container mx-auto flex items-center justify-between">
						<div className="flex w-[511px] flex-col gap-5 text-white">
							<h1 className="text-[64px] font-bold leading-[70px]">Discover Your Next Adventure.</h1>
							<p className="text-xl">
								With so many choices, you might just become a fan of any city - even your rivals.
							</p>
							<Button className="h-[52px] w-[210px]">Find Apartment</Button>
						</div>
						<SearchWidget />
					</div>
				</div>
				<section className="container mx-auto flex flex-col gap-6 py-[26px]">
					<h4 className="text-[32px] font-medium">Explore Top Destinations</h4>
					<ScrollContainer properties={properties} />
				</section>
				<section className="w-full py-10">
					<div className="container mx-auto py-6">
						<h4 className="text-[32px] font-medium">For You</h4>
					</div>
					<hr />
					<div className="container mx-auto flex h-[100px] items-center justify-center gap-4">
						<div className="flex flex-1 items-center gap-8 overflow-x-auto">
							{places.map(({ value }) => (
								<button
									key={value}
									onClick={() => setLocation(value)}
									className={`w-fit flex-shrink-0 capitalize ${value === location ? "font-medium text-neutral-900" : "text-neutral-400"}`}>
									{value}
								</button>
							))}
						</div>
						<Button onClick={handleFilter} className="rounded-3xl" variant="outline">
							<FilterIcon />
							Filter
						</Button>
					</div>
					<div className="container grid grid-cols-4 gap-x-5 gap-y-10">
						{filtered(location)
							.slice(0, 12)
							.map((property) => (
								<Card key={property.id} apartment={property} />
							))}
					</div>
				</section>
				<section className="bg-primary-50 py-[88px]">
					<div className="container mx-auto flex flex-col items-center justify-center gap-10">
						<div className="flex w-[433px] flex-col items-center gap-3 text-center">
							<div className="rounded-full bg-white px-4 py-2 text-sm text-black">Get Started</div>
							<h2 className="text-[42px] font-medium leading-[46px] text-black">
								Book your Apartment in Three steps
							</h2>
						</div>
						<div className="grid w-full grid-cols-3 gap-6">
							{booking_steps.map((step, index) => (
								<div
									key={index}
									className="flex aspect-[96/100] w-full flex-col gap-[26px] rounded-[10px] border border-[#eceff3] bg-white p-6">
									<div className="mx-auto grid aspect-square w-[200px] place-items-center">
										<Image
											src={step.image}
											alt={step.label}
											width={step.size}
											height={step.size}
											className="object-cover"
										/>
									</div>
									<div className="flex w-full flex-col gap-1 text-black">
										<h4 className="text-xl font-semibold">{step.label}</h4>
										<p className="leading-4 text-neutral-600">{step.content}</p>
										<Link href="/apartments" className="flex items-center gap-x-1">
											<span className="font-medium underline">Get Started</span>
											<RiArrowRightUpLine size={16} />
										</Link>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>
				<section className="bg-[#f5f5f5] py-24">
					<div className="flex w-full flex-col gap-16">
						<div className="container mx-auto flex flex-col gap-5">
							<div className="w-fit rounded-full bg-white px-4 py-2 text-sm text-black">Testimonials</div>
							<div className="flex w-full items-center justify-between">
								<h2 className="w-[433px] text-[42px] font-medium leading-[46px] text-black">
									What people are saying about us
								</h2>
								<p className="w-[414px] text-xl text-black">
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
						<h2 className="font-bold leading-[70px] text-white lg:text-[64px]">
							Get Latest Listing Updates
						</h2>
						<p className="text-white lg:text-xl">
							With so many choices, you just might become a fan of any city - even your rivals.
						</p>
						<form onSubmit={handleSubmit} className="flex w-full flex-col items-center gap-2 lg:flex-row">
							<Input
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="Enter your email"
								innerClassName="bg-white"
							/>
							<Button type="submit">Subscribe</Button>
						</form>
					</div>
				</section>
			</main>
			<Footer />
		</>
	)
}

export default Page
