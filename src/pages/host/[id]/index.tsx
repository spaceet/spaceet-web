import { useQuery } from "@tanstack/react-query"
import { differenceInYears } from "date-fns"
import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/router"
import Link from "next/link"
import React from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Appbar, Loading, Rating, Review, Seo } from "@/components/shared"
import { capitalizeWords, getInitials } from "@/lib"
import { Button } from "@/components/ui/button"
// import { NotFound } from "@/components/layouts"
import { GetUserByIdQuery } from "@/queries"

const tablist = ["about", "reviews", "listings"] as const
type TabList = (typeof tablist)[number]

const Page = () => {
	const [current, setcurrent] = React.useState<TabList>("about")
	const router = useRouter()
	const { id } = router.query

	const { data: host } = useQuery({
		queryFn: () => GetUserByIdQuery(String(id)),
		queryKey: ["get-host", id],
		enabled: !!id,
	})

	if (!host) return <Loading />

	return (
		<>
			<Seo title={capitalizeWords(host.data.full_name)} />
			<Appbar />
			<main className="container mx-auto my-12">
				<div className="grid w-full grid-cols-1 gap-8 px-5 lg:grid-cols-3 lg:px-0">
					<div className="flex w-full flex-col gap-8">
						<div className="flex w-fit items-center rounded-[43px] border p-1">
							{tablist.map((tab) => (
								<button
									key={tab}
									onClick={() => setcurrent(tab)}
									className={`flex w-[122px] items-center justify-center rounded-[43px] py-3 text-xs capitalize transition-all duration-500 ${current === tab ? "bg-primary-100 font-semibold text-white" : "bg-transparent font-light text-neutral-600"}`}>
									{tab}
								</button>
							))}
						</div>
						<div className="w-full rounded-2xl border p-6">
							<div className="flex flex-col items-center">
								<Avatar className="size-24">
									<AvatarImage
										src={host.data.profile_image}
										alt={host.data.full_name}
										className="object-cover"
									/>
									<AvatarFallback className="bg-black text-white lg:text-xl">
										{getInitials(host.data.full_name)}
									</AvatarFallback>
								</Avatar>
								<p className="mt-4 font-semibold capitalize lg:text-xl">{host.data.full_name}</p>
								<p className="text-neutral-400 lg:text-sm">
									Hosting since {new Date(host.data.createdOn).getFullYear()}
								</p>
							</div>
							<hr className="my-8" />
							<div className="flex flex-col items-center">
								<div className="mb-5 mt-6 flex items-center gap-2">
									<p className="font-semibold">Top rated host</p>
								</div>
								<div className="grid w-full grid-cols-3">
									<div className="flex w-full flex-col items-center text-center">
										<p className="font-semibold lg:text-2xl">
											{differenceInYears(new Date(), new Date(host.data.createdOn))}
										</p>
										<p className="text-neutral-400 lg:text-sm">Years of hosting</p>
									</div>
									<div className="flex w-full flex-col items-center text-center">
										<p className="font-semibold lg:text-2xl">120</p>
										<p className="text-neutral-400 lg:text-sm">Reviews</p>
									</div>
									<div className="flex w-full flex-col items-center text-center">
										<p className="font-semibold lg:text-2xl">{host.data.rating}</p>
										<p className="text-neutral-400 lg:text-sm">Ratings</p>
									</div>
								</div>
							</div>
							<hr className="my-8" />
							<div className="flex flex-col items-center gap-6">
								<Link href={`/messages?user=${host.data.id}`} className="w-full">
									<Button
										type="button"
										className="w-full rounded-3xl bg-neutral-900 text-white hover:bg-neutral-900/80">
										Send a message
									</Button>
								</Link>
								<p className="text-neutral-400 lg:text-sm">
									Average response time: <span className="text-neutral-900">1 hr</span>
								</p>
							</div>
						</div>
					</div>
					<div className="flex w-full flex-col gap-8 lg:col-span-2">
						<div className="w-full rounded-3xl border p-6">
							<div className="flex w-full items-center justify-between">
								<p className="font-semibold lg:text-xl">About {host.data.first_name}</p>
								<div className="flex items-center gap-2">
									<p className="text-neutral-500 lg:text-sm">
										Rating: <span className="text-neutral-900">{host.data.rating}</span>
									</p>
									<Rating rating={host.data.rating} />
								</div>
							</div>
							<hr className="my-6" />
							<div className="flex w-full flex-col gap-2">
								<p className="font-light text-neutral-500 lg:text-sm">{host.data.bio}</p>
								<button className="w-fit font-semibold text-neutral-900 underline lg:text-sm">
									Read more
								</button>
							</div>
						</div>
						<div className="flex w-full flex-col gap-6 rounded-3xl border p-6">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2">
									<p className="font-semibold lg:text-xl">Reviews</p>
									<span className="grid size-5 place-items-center rounded-full bg-neutral-900 text-xs text-white">
										{host.data.reviews.length}
									</span>
								</div>
								<div className="flex items-center gap-6">
									<button className="grid size-8 place-items-center rounded-full border">
										<ChevronLeft size={20} />
									</button>
									<button className="grid size-8 place-items-center rounded-full border">
										<ChevronLeft size={20} className="rotate-180" />
									</button>
								</div>
							</div>
							{host.data.reviews.length === 0 ? (
								<div className="grid h-[269px] w-full place-items-center rounded-2xl border">
									<p className="font-medium lg:text-lg">No reviews yet</p>
								</div>
							) : (
								<div className="grid w-full grid-cols-1 gap-5 lg:grid-cols-2">
									{host.data.reviews.map((review, index) => (
										<Review key={index} review={review} />
									))}
								</div>
							)}
						</div>
						<div className="flex w-full flex-col gap-6 rounded-3xl border p-6">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2">
									<p className="font-semibold lg:text-xl">More Listing</p>
									<span className="grid size-5 place-items-center rounded-full bg-neutral-900 text-xs text-white">
										4
									</span>
								</div>
								<div className="flex items-center gap-6">
									<button className="grid size-8 place-items-center rounded-full border">
										<ChevronLeft size={20} />
									</button>
									<button className="grid size-8 place-items-center rounded-full border">
										<ChevronLeft size={20} className="rotate-180" />
									</button>
								</div>
							</div>
							<div className="grid w-full grid-cols-1 gap-5 lg:grid-cols-2">
								{[...Array(2)].map((_, index) => (
									<div key={index} className="aspect-[1.25/1] w-full rounded-2xl border px-5 py-6"></div>
								))}
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	)
}

export default Page
