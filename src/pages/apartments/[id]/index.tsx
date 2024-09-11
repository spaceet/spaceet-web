import { differenceInCalendarDays, differenceInYears } from "date-fns"
import { ChevronLeft, ChevronLeftCircle } from "lucide-react"
// import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { useFormik } from "formik"
import { toast } from "sonner"
import Image from "next/image"
import Link from "next/link"
import React from "react"

import { Bath, Bed, CheckIn, Danger, Dumbells2, UserCheck, Users } from "@/assets/svg"
import { Appbar, Footer, Icon, Rating, Seo } from "@/components/shared"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { capitalize, formatCurrency } from "@/lib"
import { Button } from "@/components/ui/button"
import { NotFound } from "@/components/layouts"
import { properties } from "@/mock/properties"
import { Input } from "@/components/ui/input"
import { encodeQueryParams } from "@/config"
// import { GetPropertyQuery } from "@/queries"

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
	const today = new Date().toISOString().split("T")[0]
	const router = useRouter()
	const { id } = router.query

	// const { data: apartment } = useQuery({
	// 	queryFn: () => GetPropertyQuery(String(id)),
	// 	queryKey: ["get-apartment", id],
	// 	enabled: !!id,
	// })

	const { handleChange, handleSubmit, values } = useFormik({
		initialValues,
		onSubmit: (values) => {
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

	React.useEffect(() => {
		setDateDifference(differenceInCalendarDays(new Date(values.check_out), new Date(values.check_in)))
	}, [values.check_out, values.check_in])

	if (!apartment) return <NotFound />

	return (
		<>
			<Seo title={capitalize(apartment.name)} />
			<Appbar />
			<main className="container mx-auto my-12 flex flex-col gap-8">
				<div className="flex items-center gap-2">
					<button onClick={() => router.back()}>
						<ChevronLeftCircle className="stroke-[1px]" />
					</button>
					<h3 className="font-medium lg:text-2xl">{apartment.name}</h3>
				</div>
				<div className="grid w-full grid-cols-2 gap-5">
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
									<button className="absolute bottom-3 right-3 !z-10 flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-light text-neutral-900">
										Show more photos
									</button>
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
				<div className="flex w-fit items-center rounded-[43px] border p-1">
					{tablist.map((tab) => (
						<button
							key={tab}
							onClick={() => setcurrent(tab)}
							className={`flex w-[122px] items-center justify-center rounded-[43px] py-3 text-xs capitalize transition-all duration-500 lg:text-sm ${current === tab ? "bg-primary-100 font-semibold text-white" : "bg-transparent font-light text-neutral-600"}`}>
							{tab}
						</button>
					))}
				</div>
				<div id="overview" className="grid w-full grid-cols-3 gap-8">
					<div className="col-span-2 w-full rounded-3xl border p-6">
						<div className="flex w-full items-center justify-between">
							<div className="flex items-center gap-4">
								<p className="font-semibold lg:text-xl">{apartment.location}</p>
								<Link href={`/`} className="text-neutral-500 underline lg:text-sm">
									10 reviews
								</Link>
							</div>
							<div className="flex items-center gap-2">
								<p className="text-neutral-500 lg:text-sm">
									Rating: <span className="text-neutral-900">{apartment.rating}</span>
								</p>
								<Rating rating={apartment.rating} />
							</div>
						</div>
						<hr className="my-6" />
						<div className="flex w-full flex-col gap-6">
							<p className="font-light text-neutral-500">{apartment.description}</p>
							<button className="w-fit font-semibold text-neutral-900 underline lg:text-sm">
								Read more
							</button>
						</div>
						<div className="mt-6 flex items-center gap-2">
							<div className="flex w-[150px] items-center justify-center gap-3 rounded-3xl border py-2">
								<Bed />
								<span className="text-neutral-900 lg:text-sm">{apartment.bedrooms} bedrooms</span>
							</div>
							<div className="flex w-[150px] items-center justify-center gap-3 rounded-3xl border py-2">
								<Bath />
								<span className="text-neutral-900 lg:text-sm">{apartment.bathrooms} bathrooms</span>
							</div>
							<div className="flex w-[150px] items-center justify-center gap-3 rounded-3xl border py-2">
								<Users />
								<span className="text-neutral-900 lg:text-sm">{apartment.max_guests} guest (max)</span>
							</div>
						</div>
						<hr className="my-6" />
						<div id="amenities" className="flex flex-col gap-6">
							<p className="font-semibold lg:text-xl">Amenities</p>
							<div className="grid grid-cols-3 gap-y-5">
								{apartment.amenities.map((amenity) => (
									<div key={amenity.id} className="flex items-center gap-3">
										<Icon name={amenity.name} />
										<span className="capitalize text-neutral-900 lg:text-sm">{amenity.name}</span>
									</div>
								))}
							</div>
							<button className="w-fit font-semibold text-neutral-900 underline lg:text-sm">
								Show more amenities
							</button>
						</div>
					</div>
					<div className="w-full rounded-3xl border p-6">
						<p className="font-semibold lg:text-2xl">{formatCurrency(apartment.price, "USD")}/night</p>
						<hr className="my-6" />
						<div className="flex w-full flex-col gap-4">
							<div className="grid w-full grid-cols-2 gap-5">
								<Input
									label="Check In"
									name="check_in"
									onChange={handleChange}
									type="date"
									min={today}
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
							<p className="font-semibold lg:text-sm">Cost Breakdown</p>
							<form onSubmit={handleSubmit} className="flex w-full flex-col gap-3">
								<div className="flex w-full items-center justify-between">
									<p className="font-light text-neutral-400">
										{formatCurrency(apartment.price, "USD")} x {dateDifference} nights
									</p>
									<p className="font-medium text-neutral-900">
										{formatCurrency(apartment.price * dateDifference || apartment.price, "USD")}
									</p>
								</div>
								<div className="flex w-full items-center justify-between">
									<p className="font-light text-neutral-400">Cleaning Fee</p>
									<p className="font-medium text-neutral-900">
										{formatCurrency(apartment.cleaning_fee, "USD")}
									</p>
								</div>
								<div className="flex w-full items-center justify-between">
									<p className="font-light text-neutral-400">Service Charge</p>
									<p className="font-medium text-neutral-900">
										{formatCurrency(apartment.service_charge, "USD")}
									</p>
								</div>
								<div className="mt-2 flex w-full items-center justify-between">
									<p className="font-light text-neutral-400">Total</p>
									<p className="font-medium text-neutral-900">
										{formatCurrency(
											apartment.cleaning_fee +
												apartment.service_charge +
												(apartment.price * dateDifference || apartment.price),
											"USD"
										)}
									</p>
								</div>
								<Button type="submit" className="rounded-3xl">
									Reserve
								</Button>
								<p className="text-center text-neutral-400 lg:text-sm">You won&apos;t be charged yet!</p>
							</form>
						</div>
					</div>
				</div>
				<div id="policies" className="flex w-full flex-col gap-6 rounded-3xl border p-6">
					<p className="font-semibold lg:text-xl">Policies</p>
					<div className="grid w-full grid-cols-4 gap-5">
						<div className="aspect-[107/100] w-full rounded-2xl border px-5 py-6">
							<CheckIn />
							<p className="mb-2 mt-3 font-semibold lg:text-sm">Check In/Check Out</p>
						</div>
						<div className="aspect-[107/100] w-full rounded-2xl border px-5 py-6">
							<Dumbells2 />
							<p className="mb-2 mt-3 font-semibold lg:text-sm">Pets</p>
						</div>
						<div className="aspect-[107/100] w-full rounded-2xl border px-5 py-6">
							<Danger />
							<p className="mb-2 mt-3 font-semibold lg:text-sm">Cancellaton/prepayment</p>
						</div>
						<div className="aspect-[107/100] w-full rounded-2xl border px-5 py-6">
							<UserCheck />
							<p className="mb-2 mt-3 font-semibold lg:text-sm">Age restriction</p>
						</div>
					</div>
					<button className="w-fit font-semibold text-neutral-900 underline lg:text-sm">
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
						<div className="flex items-center gap-6">
							<button className="grid size-8 place-items-center rounded-full border">
								<ChevronLeft size={20} />
							</button>
							<button className="grid size-8 place-items-center rounded-full border">
								<ChevronLeft size={20} className="rotate-180" />
							</button>
						</div>
					</div>
					<div className="grid w-full grid-cols-4 gap-5">
						{[...Array(4)].map((_, index) => (
							<div key={index} className="aspect-[107/100] w-full rounded-2xl border px-5 py-6"></div>
						))}
					</div>
				</div>
				<div id="host" className="flex w-full flex-col gap-6 rounded-3xl border p-6">
					<p className="font-semibold lg:text-xl">Meet your host</p>
					<div className="flex h-[269px] w-full items-center rounded-2xl border px-5 py-6">
						<div className="h-full flex-1">
							<div className="flex w-full items-center justify-between">
								<div className="flex items-center gap-4">
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
										<p className="text-neutral-400 lg:text-sm">
											Hosting since {new Date(apartment.host.createdAt).getFullYear()}
										</p>
										<p className="text-neutral-400 lg:text-sm"></p>
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
							<div className="grid w-full grid-cols-3">
								<div className="flex w-full flex-col">
									<p className="font-semibold lg:text-2xl">
										{differenceInYears(new Date(), new Date(apartment.host.createdAt))}
									</p>
									<p className="text-neutral-400 lg:text-sm">Years of hosting</p>
								</div>
								<div className="flex w-full flex-col">
									<p className="font-semibold lg:text-2xl">120</p>
									<p className="text-neutral-400 lg:text-sm">Customer reviews</p>
								</div>
								<div className="flex w-full flex-col">
									<p className="font-semibold lg:text-2xl">{apartment.host.rating}</p>
									<p className="text-neutral-400 lg:text-sm">Ratings</p>
								</div>
							</div>
						</div>
						<Separator orientation="vertical" className="mx-6 bg-gray-300" />
						<div className="flex h-full flex-1 flex-col justify-between">
							<div className="flex flex-col gap-2">
								<p className="font-medium">About {apartment.host.firstName}</p>
								<p className="font-light text-neutral-500 lg:text-sm">{apartment.host.description}</p>
							</div>
							<div className="flex w-full items-center justify-between">
								<p className="text-neutral-400 lg:text-sm">
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
					<div className="h-[400px] w-full rounded-xl border"></div>
				</div>
			</main>
			<Footer />
		</>
	)
}

export default Page
