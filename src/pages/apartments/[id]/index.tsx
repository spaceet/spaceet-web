import { addDays, differenceInCalendarDays, differenceInYears, formatDate } from "date-fns"
import { ChevronLeft, ChevronLeftCircle } from "lucide-react"
import { useQueries } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { motion } from "framer-motion"
import { useFormik } from "formik"
import { toast } from "sonner"
import Image from "next/image"
import Link from "next/link"
import React from "react"

import { Bath, Bed, CheckIn, Danger, Dumbells2, UserCheck, Users } from "@/assets/svg"
import { Appbar, Icon, Rating, RatingForm, Seo } from "@/components/shared"
import { GetPropertyQuery, GetAllReviewsQuery } from "@/queries"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { encodeQueryParams, slide } from "@/config"
import { capitalize, formatCurrency } from "@/lib"
import { Button } from "@/components/ui/button"
import { NotFound } from "@/components/layouts"
import { properties } from "@/mock/properties"
import { Input } from "@/components/ui/input"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"

const tablist = ["overview", "amenities", "pricing", "policies", "reviews", "host"] as const
type TabList = (typeof tablist)[number]

const initialValues = {
	check_in: "",
	check_out: "",
	guests: 0,
}

const Page = () => {
	const [current, setcurrent] = React.useState<TabList>("overview")
	const [dateDifference, setDateDifference] = React.useState(0)
	// const [coords, setCoords] = React.useState({lat:0,lng:0})
	const [currentImage, setCurrentImage] = React.useState(0)
	const ref = React.useRef<HTMLDivElement>(null)!
	const [open, setOpen] = React.useState(false)

	const minimumCheckInDate = addDays(new Date(), 7).toISOString().split("T")[0]
	const router = useRouter()
	const { id } = router.query

	const [] = useQueries({
		queries: [
			{
				queryFn: () => GetPropertyQuery(String(id)),
				queryKey: ["get-apartment", id],
				enabled: false,
			},
			{
				queryFn: () => GetAllReviewsQuery(String(id), {}),
				queryKey: ["get-reviews", id],
				enabled: false,
			},
		],
	})

	const { handleChange, handleSubmit, values } = useFormik({
		initialValues,
		onSubmit: (values) => {
			console.log(values)
			if (!values.check_in) {
				toast.error("Please select a check-in date")
				return
			}
			if (!values.check_out) {
				toast.error("Please select a check-out date")
				return
			}
			if (!values.guests) {
				toast.error("Please select the number of guests")
				return
			}
			router.push(`/book-a-space/${id}?${encodeQueryParams(values)}`)
		},
	})

	const apartment = properties.find((apartment) => apartment.id === id)

	const scrollIntoView = (id: string) => {
		const element = document.getElementById(id)
		if (element) {
			element.scrollIntoView({ behavior: "smooth" })
		}
	}

	const scroll = (direction: "left" | "right") => {
		if (ref.current) {
			const scrollAmount = ref.current.clientWidth / 2
			ref.current.scrollBy({
				left: direction === "left" ? -scrollAmount : scrollAmount,
				behavior: "smooth",
			})
		}
	}

	React.useEffect(() => {
		setDateDifference(differenceInCalendarDays(new Date(values.check_out), new Date(values.check_in)))
	}, [values.check_out, values.check_in])

	if (!apartment) return <NotFound />

	const handleNextImage = () => setCurrentImage((prev) => (prev + 1) % apartment.images.length)
	const handlePrevImage = () =>
		setCurrentImage((prev) => (prev - 1 + apartment.images.length) % apartment.images.length)

	return (
		<>
			<Seo title={capitalize(apartment.name)} />
			<Appbar />
			<main className="container relative mx-auto my-12 flex flex-col gap-8 px-4 lg:px-0">
				<div className="fixed bottom-0 left-0 !z-10 flex h-[99px] w-full items-center justify-between border-t bg-white px-5 lg:hidden">
					<p className="font-semibold lg:text-2xl">{formatCurrency(apartment.price, "NGN")}/night</p>
					<Button
						onClick={() =>
							router.push(
								`/book-a-space/${id}?${encodeQueryParams({ check_in: formatDate(new Date(), "yyyy-MM-dd").toString(), check_out: formatDate(new Date(), "yyyy-MM-dd").toString(), guests: 1 })}`
							)
						}
						type="button"
						className="w-[170px] rounded-3xl">
						Reserve
					</Button>
				</div>
				<div className="flex items-center gap-2">
					<button onClick={() => router.back()}>
						<ChevronLeftCircle className="stroke-[1px]" />
					</button>
					<h3 className="font-medium lg:text-2xl">{apartment.name}</h3>
				</div>
				<div className="flex items-center justify-center lg:hidden">
					{apartment.images.map((image, index) => (
						<div
							key={index}
							className={`relative aspect-[1.3/1] w-full ${index === currentImage ? "block" : "hidden"}`}>
							<Image
								src={image}
								alt={apartment.name}
								fill
								sizes="(max-width: 1024px)100%"
								className="rounded-[10px] object-cover"
							/>
						</div>
					))}
				</div>
				<div className="hidden w-full grid-cols-2 gap-5 lg:grid">
					<div className="relative aspect-square w-full">
						<Image
							src={apartment.images[0]}
							alt={apartment.name}
							fill
							sizes="(max-width: 1024px)100%"
							className="rounded-[10px] object-cover"
						/>
					</div>
					<div className="grid w-full grid-cols-2 gap-5">
						{apartment.images.slice(1, 5).map((image, index) => (
							<div key={index} className="relative aspect-square w-full">
								{index === 3 && (
									<Dialog>
										<DialogTrigger asChild>
											<button className="absolute bottom-3 right-3 !z-10 flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-light text-neutral-900">
												Show more photos
											</button>
										</DialogTrigger>
										<DialogContent className="aspect-[3/2] w-full max-w-[75vw]">
											<DialogTitle>Photos</DialogTitle>
											<DialogDescription hidden></DialogDescription>
											<div className="flex w-full flex-col items-center justify-center gap-5 overflow-hidden">
												<div className="flex w-[75%] items-center justify-center">
													{apartment.images.map((image, index) => (
														<motion.div
															{...slide("left")}
															key={index}
															className={`relative aspect-[3/2] w-full ${index === currentImage ? "block" : "hidden"}`}>
															<Image
																src={image}
																alt={`apartment-image-${index}`}
																fill
																sizes="(max-width: 1024px)100%"
																className="rounded-[10px] object-cover saturate-150"
															/>
														</motion.div>
													))}
												</div>
												<div className="flex items-center justify-center gap-6">
													<button
														onClick={handlePrevImage}
														className="grid size-8 place-items-center rounded-full border">
														<ChevronLeft size={20} />
													</button>
													<span className="font-medium text-neutral-900">
														{currentImage + 1}/{apartment.images.length}
													</span>
													<button
														onClick={handleNextImage}
														className="grid size-8 place-items-center rounded-full border">
														<ChevronLeft size={20} className="rotate-180" />
													</button>
												</div>
											</div>
										</DialogContent>
									</Dialog>
								)}
								<Image
									src={image}
									alt={`apartment-image-${index}`}
									fill
									sizes="(max-width: 1024px)100%"
									className="rounded-[10px] object-cover"
								/>
							</div>
						))}
					</div>
				</div>
				<div className="hidden w-fit items-center rounded-[43px] border p-1 lg:flex">
					{tablist.map((tab) => (
						<button
							key={tab}
							onClick={() => {
								setcurrent(tab)
								scrollIntoView(tab)
							}}
							className={`flex w-[122px] items-center justify-center rounded-[43px] py-3 text-sm capitalize transition-all duration-500 ${current === tab ? "bg-primary-100 font-semibold text-white" : "bg-transparent font-light text-neutral-600"}`}>
							{tab}
						</button>
					))}
				</div>
				<div id="overview" className="grid w-full grid-cols-1 gap-8 lg:grid-cols-3">
					<div className="col-span-2 w-full rounded-3xl border p-6">
						<div className="flex w-full items-center justify-between">
							<div className="flex w-full items-center justify-between gap-4 lg:w-fit lg:justify-start">
								<p className="font-semibold lg:text-xl">{apartment.location}</p>
								<Link href={`/`} className="text-sm text-neutral-500 underline">
									10 reviews
								</Link>
							</div>
							<div className="hidden items-center gap-2 lg:flex">
								<p className="text-sm text-neutral-500">
									Rating: <span className="text-neutral-900">{apartment.rating}</span>
								</p>
								<Rating rating={apartment.rating} />
							</div>
						</div>
						<hr className="my-6" />
						<div className="flex w-full flex-col gap-6">
							<p className="text-sm font-light text-neutral-500 lg:text-base">{apartment.description}</p>
							<button className="w-fit text-sm font-semibold text-neutral-900 underline">Read more</button>
						</div>
						<div className="mt-6 flex flex-wrap items-center gap-2">
							<div className="flex w-[150px] items-center justify-center gap-3 rounded-3xl border py-2">
								<Bed />
								<span className="text-sm text-neutral-900">{apartment.bedrooms} bedrooms</span>
							</div>
							<div className="flex w-[150px] items-center justify-center gap-3 rounded-3xl border py-2">
								<Bath />
								<span className="text-sm text-neutral-900">{apartment.bathrooms} bathrooms</span>
							</div>
							<div className="flex w-[150px] items-center justify-center gap-3 rounded-3xl border py-2">
								<Users />
								<span className="text-sm text-neutral-900">{apartment.max_guests} guest (max)</span>
							</div>
						</div>
						<hr className="my-6" />
						<div id="amenities" className="flex flex-col gap-6">
							<p className="font-semibold lg:text-xl">Amenities</p>
							<div className="grid grid-cols-2 gap-y-5 lg:grid-cols-3">
								{apartment.amenities.slice(0, 9).map((amenity) => (
									<div key={amenity.id} className="flex items-center gap-3">
										<Icon name={amenity.name} />
										<span className="text-sm capitalize text-neutral-900">{amenity.name}</span>
									</div>
								))}
							</div>
							{apartment.amenities.length > 9 && (
								<Dialog>
									<DialogTrigger asChild>
										<button className="w-fit text-sm font-semibold text-neutral-900 underline">
											Show more amenities
										</button>
									</DialogTrigger>
									<DialogContent className="w-full max-w-[600px]">
										<DialogTitle className="font-body">Amenities</DialogTitle>
										<DialogDescription hidden></DialogDescription>
										<div className="mt-5 grid grid-cols-3 gap-y-5">
											{apartment.amenities.map((amenity) => (
												<div key={amenity.id} className="flex items-center gap-3">
													<Icon name={amenity.name} />
													<span className="text-sm capitalize text-neutral-900">{amenity.name}</span>
												</div>
											))}
										</div>
									</DialogContent>
								</Dialog>
							)}
						</div>
					</div>
					<div className="hidden w-full rounded-3xl border p-6 lg:block">
						<p className="font-semibold lg:text-2xl">{formatCurrency(apartment.price, "NGN")}/night</p>
						<hr className="my-6" />
						<div className="flex w-full flex-col gap-4">
							<div className="grid w-full grid-cols-2 gap-5">
								<Input
									label="Check In"
									name="check_in"
									onChange={handleChange}
									type="date"
									min={minimumCheckInDate}
									innerClassName="rounded-3xl"
									labelClassName="text-neutral-500 font-normal"
								/>
								<Input
									label="Check Out"
									name="check_out"
									onChange={handleChange}
									type="date"
									min={values.check_in}
									innerClassName="rounded-3xl"
									disabled={values.check_in === ""}
									labelClassName="text-neutral-500 font-normal"
								/>
							</div>
							<Input
								label="Guests"
								name="guests"
								onChange={handleChange}
								type="number"
								max={apartment.max_guests}
								placeholder="2"
								innerClassName="rounded-3xl"
								labelClassName="text-neutral-500 font-normal"
							/>
						</div>
						<div className="mt-6 flex flex-col gap-4">
							<p className="text-sm font-semibold">Cost Breakdown</p>
							<form onSubmit={handleSubmit} className="flex w-full flex-col gap-3">
								<div className="flex w-full items-center justify-between">
									<p className="font-light text-neutral-400">
										{formatCurrency(apartment.price, "NGN")} x {dateDifference} nights
									</p>
									<p className="font-medium text-neutral-900">
										{formatCurrency(apartment.price * dateDifference || apartment.price, "NGN")}
									</p>
								</div>
								<div className="flex w-full items-center justify-between">
									<p className="font-light text-neutral-400">Cleaning Fee</p>
									<p className="font-medium text-neutral-900">
										{formatCurrency(apartment.cleaning_fee, "NGN")}
									</p>
								</div>
								<div className="flex w-full items-center justify-between">
									<p className="font-light text-neutral-400">Service Charge</p>
									<p className="font-medium text-neutral-900">
										{formatCurrency(apartment.service_charge, "NGN")}
									</p>
								</div>
								<div className="mt-2 flex w-full items-center justify-between">
									<p className="font-light text-neutral-400">Total</p>
									<p className="font-medium text-neutral-900">
										{formatCurrency(
											apartment.cleaning_fee +
												apartment.service_charge +
												(apartment.price * dateDifference || apartment.price),
											"NGN"
										)}
									</p>
								</div>
								<Button type="submit" className="rounded-3xl">
									Reserve
								</Button>
								<p className="text-center text-sm text-neutral-400">You won&apos;t be charged yet!</p>
							</form>
						</div>
					</div>
				</div>
				<div id="policies" className="flex w-full flex-col gap-6 rounded-3xl border p-6">
					<p className="font-semibold lg:text-xl">Policies</p>
					<div className="grid w-full grid-cols-1 gap-5 lg:grid-cols-4">
						<div className="aspect-[107/100] w-full rounded-2xl border px-5 py-6">
							<CheckIn />
							<p className="mb-2 mt-3 text-sm font-semibold">Check In/Check Out</p>
						</div>
						<div className="aspect-[107/100] w-full rounded-2xl border px-5 py-6">
							<Dumbells2 />
							<p className="mb-2 mt-3 text-sm font-semibold">Pets</p>
						</div>
						<div className="aspect-[107/100] w-full rounded-2xl border px-5 py-6">
							<Danger />
							<p className="mb-2 mt-3 text-sm font-semibold">Cancellaton/prepayment</p>
						</div>
						<div className="aspect-[107/100] w-full rounded-2xl border px-5 py-6">
							<UserCheck />
							<p className="mb-2 mt-3 text-sm font-semibold">Age restriction</p>
						</div>
					</div>
					<button className="w-fit text-sm font-semibold text-neutral-900 underline">
						Show more policies
					</button>
				</div>
				<div id="reviews" className="flex w-full flex-col gap-6 rounded-3xl border p-6">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<p className="font-semibold lg:text-xl">Reviews</p>
							<span className="grid size-5 place-items-center rounded-full bg-neutral-900 text-xs text-white">
								4
							</span>
						</div>
						<div className="flex items-center gap-5">
							<Dialog open={open} onOpenChange={setOpen}>
								<DialogTrigger asChild>
									<button className="w-fit text-sm font-semibold text-neutral-900 underline">
										Write review
									</button>
								</DialogTrigger>
								<DialogContent className="w-[400px]">
									<DialogTitle className="font-body">Reviews and Ratings</DialogTitle>
									<DialogDescription hidden></DialogDescription>
									<RatingForm id={String(id)} onClose={() => setOpen(false)} />
								</DialogContent>
							</Dialog>
							<div className="flex items-center gap-6">
								<button
									onClick={() => scroll("left")}
									className="grid size-8 place-items-center rounded-full border">
									<ChevronLeft size={20} />
								</button>
								<button
									onClick={() => scroll("right")}
									className="grid size-8 place-items-center rounded-full border">
									<ChevronLeft size={20} className="rotate-180" />
								</button>
							</div>
						</div>
					</div>
					<div
						ref={ref}
						className="flex w-auto flex-col items-center gap-x-0 gap-y-5 overflow-x-scroll scroll-smooth lg:flex-row lg:gap-x-5 lg:gap-y-0">
						{[...Array(4)].map((_, index) => (
							<div
								key={index}
								className="aspect-[1.07/1] w-full flex-shrink-0 rounded-2xl border px-5 py-6 lg:w-[276px]">
								{index + 1}
							</div>
						))}
					</div>
				</div>
				<div id="host" className="flex w-full flex-col gap-6 rounded-3xl border p-6">
					<p className="font-semibold lg:text-xl">Meet your host</p>
					<div className="flex w-full flex-col items-center rounded-2xl border px-5 py-6 lg:h-[269px] lg:flex-row">
						<div className="flex h-full flex-1 flex-col items-center lg:items-start">
							<div className="flex w-full flex-col items-center gap-4 lg:flex-row lg:justify-between">
								<div className="flex flex-col items-center gap-4 lg:flex-row">
									<Avatar className="size-24">
										<AvatarImage
											src={apartment.host.imageUrl}
											alt={apartment.host.firstName}
											className="object-cover"
										/>
									</Avatar>
									<div className="flex flex-col">
										<p className="font-medium lg:text-2xl">
											{apartment.host.firstName} {apartment.host.lastName}
										</p>
										<p className="text-sm text-neutral-400">
											Hosting since {new Date(apartment.host.createdAt).getFullYear()}
										</p>
										<p className="text-sm text-neutral-400"></p>
									</div>
								</div>
								<Link href={`/host/${apartment.host.id}`} className="w-fit">
									<Button type="button" size="sm" variant="outline" className="rounded-3xl border-gray-300">
										View Profile
									</Button>
								</Link>
							</div>
							<div className="mb-5 mt-6 flex items-center gap-2">
								<p className="font-semibold">Top rated host</p>
							</div>
							<div className="grid w-full grid-cols-3 text-center lg:text-left">
								<div className="flex w-full flex-col items-center lg:items-start">
									<p className="font-semibold lg:text-2xl">
										{differenceInYears(new Date(), new Date(apartment.host.createdAt))}
									</p>
									<p className="text-sm text-neutral-400">Years of hosting</p>
								</div>
								<div className="flex w-full flex-col items-center lg:items-start">
									<p className="font-semibold lg:text-2xl">120</p>
									<p className="text-sm text-neutral-400">Customer reviews</p>
								</div>
								<div className="flex w-full flex-col items-center lg:items-start">
									<p className="font-semibold lg:text-2xl">{apartment.host.rating}</p>
									<p className="text-sm text-neutral-400">Ratings</p>
								</div>
							</div>
						</div>
						<Separator orientation="vertical" className="mx-6 hidden bg-gray-300 lg:block" />
						<Separator className="my-6 block bg-gray-300 lg:hidden" />
						<div className="flex h-full flex-1 flex-col justify-between">
							<div className="flex flex-col items-center gap-2 lg:items-start">
								<p className="font-medium">About {apartment.host.firstName}</p>
								<p className="text-center text-sm font-light text-neutral-500 lg:text-left">
									{apartment.host.bio}
								</p>
							</div>
							<div className="mt-6 flex w-full flex-col-reverse items-center justify-between gap-3 lg:mt-0 lg:flex-row lg:gap-0">
								<p className="text-sm text-neutral-400">
									Average response time: <span className="text-neutral-900">1 hr</span>
								</p>
								<Link href={`/messages?user=${apartment.host.id}`}>
									<Button
										type="button"
										className="rounded-3xl bg-neutral-900 text-white hover:bg-neutral-900/80">
										Send a message
									</Button>
								</Link>
							</div>
						</div>
					</div>
				</div>
				<div id="location" className="flex w-full flex-col gap-6 rounded-3xl border p-6">
					<p className="font-semibold lg:text-xl">Location</p>
					<div className="h-[249px] w-full overflow-hidden rounded-xl border lg:h-[400px]"></div>
				</div>
			</main>
		</>
	)
}

export default Page
