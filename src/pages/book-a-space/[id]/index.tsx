import { differenceInCalendarDays, formatDate } from "date-fns"
import { ChevronLeftCircle } from "lucide-react"
import { useRouter } from "next/router"
import { toast } from "sonner"
import Image from "next/image"
import Link from "next/link"
import React from "react"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Appbar, Footer, Rating, Seo } from "@/components/shared"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { NotFound } from "@/components/layouts"
import { Button } from "@/components/ui/button"
import { properties } from "@/mock/properties"
import { formatCurrency } from "@/lib"

const payment_methods = ["debit card", "bank transfer"] as const
// type PaymentMethod = (typeof payment_methods)[number] | (string & {})

const Page = () => {
	const [dateDifference, setDateDifference] = React.useState(0)
	const [agreed, setAgreed] = React.useState(false)

	const router = useRouter()
	const { check_in, check_out, guests, id } = router.query

	const apartment = properties.find((apartment) => apartment.id === id)

	const handleReservation = () => {
		if (!agreed) {
			toast.error("Please agree to the terms and conditions")
			return
		}
		console.log("Reserving a space")
	}

	React.useEffect(() => {
		setDateDifference(
			differenceInCalendarDays(new Date(check_out as string), new Date(check_in as string))
		)
	}, [check_out, check_in])

	if (!apartment) return <NotFound />

	return (
		<>
			<Seo title="Dashboard" />
			<Appbar />
			<main className="container mx-auto my-12 flex flex-col gap-8">
				<div className="flex items-center gap-2">
					<button onClick={() => router.back()}>
						<ChevronLeftCircle className="stroke-[1px]" />
					</button>
					<h3 className="font-medium lg:text-2xl">Reserving a space</h3>
				</div>
				<div className="grid w-full grid-cols-3 gap-8">
					<div className="col-span-2 flex w-full flex-col gap-8">
						<div className="flex w-full items-center gap-4 rounded-2xl border p-6">
							<div className="relative h-[173px] w-[334px]">
								<Image
									src={apartment.images[0]}
									alt={apartment.name}
									fill
									sizes="(max-width: 1024px)100%"
									className="rounded-md object-cover"
								/>
							</div>
							<div className="flex flex-col gap-3">
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
						</div>
						<div className="flex w-full flex-col gap-3 rounded-2xl border p-6">
							<p className="font-semibold text-neutral-900 lg:text-xl">Choose how to pay</p>
							<RadioGroup className="flex w-full flex-col gap-6">
								{payment_methods.map((payment_method) => (
									<div key={payment_method} className="flex w-full flex-col">
										<div className="flex w-full items-center gap-3 rounded-2xl border border-neutral-200 p-5">
											<RadioGroupItem value={payment_method} id={payment_method} />
											<span className="font-medium capitalize lg:text-sm">{payment_method}</span>
										</div>
									</div>
								))}
							</RadioGroup>
						</div>
						<div className="flex w-full flex-col gap-3 rounded-2xl border p-6">
							<p className="font-semibold text-neutral-900 lg:text-xl">Message the host</p>
							<p className="text-neutral-400 lg:text-sm">
								Share why you&apos;re traveling, who is coming with you, and what you love about the space
							</p>
							<div className="flex items-center gap-4">
								<Avatar className="size-16">
									<AvatarImage
										src={apartment.host.imageUrl}
										alt={apartment.host.firstName}
										className="object-cover"
									/>
								</Avatar>
								<div className="">
									<p className="font-medium">
										{apartment.host.firstName} {apartment.host.lastName}
									</p>
									<p className="text-neutral-400 lg:text-sm">
										Host • Joined since {new Date(apartment.host.createdAt).getFullYear()}
									</p>
								</div>
							</div>
							<div className="h-[126px] w-full rounded-2xl border"></div>
						</div>
						<div className="flex w-full flex-col gap-3 rounded-2xl border p-6">
							<p className="font-semibold text-neutral-900 lg:text-xl">Cancellation policy</p>
						</div>
						<div className="flex w-full flex-col gap-3 rounded-2xl border p-6">
							<p className="font-semibold text-neutral-900 lg:text-xl">Ground rules</p>
						</div>
						<div className="flex w-full flex-col gap-3 rounded-2xl border p-6">
							<p className="font-semibold text-neutral-900 lg:text-xl">Reservation confirmation</p>
						</div>
					</div>
					<div className="flex w-full flex-col gap-6 rounded-2xl border p-6">
						<div className="flex w-full items-center justify-between">
							<p className="font-semibold lg:text-xl">{formatCurrency(apartment.price, "USD")}/night</p>
							<button type="button" className="font-medium underline lg:text-sm">
								Edit
							</button>
						</div>
						<hr />
						<div className="flex w-full flex-col gap-3">
							<p className="font-semibold lg:text-sm">Reserve details</p>
							<div className="flex w-full items-center justify-between">
								<p className="font-light text-neutral-400">Check in</p>
								<p className="font-medium text-neutral-900">
									{formatDate(check_in as string, "dd MMM yyyy")}
								</p>
							</div>
							<div className="flex w-full items-center justify-between">
								<p className="font-light text-neutral-400">Check out</p>
								<p className="font-medium text-neutral-900">
									{formatDate(check_out as string, "dd MMM yyyy")}
								</p>
							</div>
							<div className="flex w-full items-center justify-between">
								<p className="font-light text-neutral-400">Number of guests</p>
								<p className="font-medium text-neutral-900">{Number(guests)}</p>
							</div>
						</div>
						<div className="flex w-full flex-col gap-3">
							<p className="font-semibold lg:text-sm">Cost Breakdown</p>
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
						</div>
						<div className="flex items-start gap-2">
							<Checkbox checked={agreed} onCheckedChange={() => setAgreed(!agreed)} />
							<p className="text-neutral-400 lg:text-sm">
								I agree to the Spaceet{" "}
								<Link href="/help-center/terms-of-service" className="underline">
									policies
								</Link>{" "}
								by reserving this space.
							</p>
						</div>
						<Button type="button" onClick={handleReservation} className="rounded-3xl">
							Reserve
						</Button>
					</div>
				</div>
			</main>
			<Footer />
		</>
	)
}

export default Page
