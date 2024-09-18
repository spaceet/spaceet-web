import { addDays, differenceInCalendarDays, formatDate } from "date-fns"
import { RiErrorWarningLine } from "@remixicon/react"
import { ChevronLeftCircle } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { useFormik } from "formik"
import { toast } from "sonner"
import Image from "next/image"
import Link from "next/link"
import React from "react"

import { Appbar, Footer, Rating, Seo } from "@/components/shared"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { NotFound } from "@/components/layouts"
import { Button } from "@/components/ui/button"
import { properties } from "@/mock/properties"
import { GetPropertyQuery } from "@/queries"
import { formatCurrency } from "@/lib"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"

const payment_methods = ["debit card", "bank transfer"] as const
type PaymentMethod = (typeof payment_methods)[number] | (string & {})

const Page = () => {
	const [paymentMethod, setPaymentMethod] = React.useState<PaymentMethod | null>(null)
	const [dateDifference, setDateDifference] = React.useState(0)
	const [agreed, setAgreed] = React.useState(false)
	const [open, setOpen] = React.useState(false)

	const router = useRouter()
	const { check_in, check_out, guests, id } = router.query

	const apartment = properties.find((apartment) => apartment.id === id)
	const {} = useQuery({
		queryFn: () => GetPropertyQuery(String(id)),
		queryKey: ["get-apartment", id],
		enabled: false,
	})

	const handleReservation = () => {
		if (paymentMethod === null) {
			toast.error("Please select a payment method")
			return
		}
		if (!agreed) {
			toast.error("Please agree to the terms and conditions")
			return
		}
		console.log("Reserving a space")
	}

	const { values } = useFormik({
		initialValues: {
			check_in: String(check_in),
			check_out: String(check_out),
			guests: Number(guests),
		},
		onSubmit: (values) => {
			console.log(values)
		},
	})

	React.useEffect(() => {
		setDateDifference(differenceInCalendarDays(new Date(values.check_out), new Date(values.check_in)))
	}, [values.check_out, values.check_in])

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
							<div className="flex w-full flex-col gap-6">
								<div className="flex w-full flex-col gap-3">
									<div className="flex w-full items-center gap-3 rounded-2xl border border-neutral-200 p-5">
										<button
											onClick={() => setPaymentMethod("debit card")}
											className={`relative size-4 rounded-full border border-neutral-900 before:absolute before:left-1/2 before:top-1/2 before:size-2 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-primary-100 ${paymentMethod === "debit card" ? "before:block" : "before:hidden"}`}
										/>
										<span className="font-medium capitalize lg:text-sm">Debit Card</span>
									</div>
									{paymentMethod === "debit card" && (
										<div className="w-full rounded-2xl border px-5 py-[18px]">
											<div className="flex w-full flex-col gap-3">
												<div className="h-[57px] w-full rounded-xl border"></div>
												<div className="grid w-full grid-cols-2 gap-2">
													<div className="h-[57px] w-full rounded-xl border"></div>
													<div className="h-[57px] w-full rounded-xl border"></div>
												</div>
											</div>
											<p className="mt-3 text-sm">
												<b>Please note:</b> We will never ask you for your password, PIN, CVV or full card
												details over the phone or via email
											</p>
										</div>
									)}
								</div>
								<div className="flex w-full flex-col gap-3">
									<div className="flex w-full items-center gap-3 rounded-2xl border border-neutral-200 p-5">
										<button
											onClick={() => setPaymentMethod("bank transfer")}
											className={`relative size-4 rounded-full border border-neutral-900 before:absolute before:left-1/2 before:top-1/2 before:size-2 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-primary-100 ${paymentMethod === "bank transfer" ? "before:block" : "before:hidden"}`}
										/>
										<span className="font-medium capitalize lg:text-sm">Bank Transfer</span>
									</div>
									{paymentMethod === "bank transfer" && (
										<div className="w-full rounded-2xl border px-5 py-[18px]">
											<div className="flex w-full flex-col gap-3">
												<div className="flex h-6 items-center gap-2">
													<p className="w-32 text-neutral-600">Bank Name</p>
												</div>
												<div className="flex h-6 items-center gap-2">
													<p className="w-32 text-neutral-600">Account Number</p>
												</div>
												<div className="flex h-6 items-center gap-2">
													<p className="w-32 text-neutral-600">Account Name</p>
												</div>
											</div>
											<div className="mt-4 flex w-full items-center gap-2 text-sm text-red-700">
												<RiErrorWarningLine size={16} />
												<p>
													The account is one time use. You will be automatically redirected once payment is
													confirmed
												</p>
											</div>
										</div>
									)}
								</div>
							</div>
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
							<p className="text-neutral-900">
								Free cancellation before {formatDate(addDays(new Date(values.check_in), -7), "MMM dd")}.
								Cancel before check-in {formatDate(addDays(new Date(values.check_in), -2), "MMM dd")} for a
								partial refund.
							</p>
							<Link
								href="/help-center/cancellation-policy"
								className="w-fit font-semibold text-neutral-900 underline lg:text-sm">
								Learn more
							</Link>
						</div>
						<div className="flex w-full flex-col gap-3 rounded-2xl border p-6">
							<p className="font-semibold text-neutral-900 lg:text-xl">Ground rules</p>
							<p className="text-neutral-900">
								We ask every guest to remember a few simple things about what makes a great guest.
							</p>
							<ul className="flex w-full list-disc flex-col pl-6 font-normal">
								<li className="list-item">Follow the house rules</li>
								<li className="list-item">Treat you Host&apos;s home like your own</li>
							</ul>
						</div>
						<div className="flex w-full flex-col gap-3 rounded-2xl border p-6">
							<p className="font-semibold text-neutral-900 lg:text-xl">Reservation confirmation</p>
							<p className="text-neutral-900">
								The host has 24 hours to confirm your booking. You&apos;ll be charged when the request is
								accepted. If after that, there was no confirmation, you will be fully refunded.
							</p>
						</div>
					</div>
					<div className="flex w-full flex-col gap-6 rounded-2xl border p-6">
						<div className="flex w-full items-center justify-between">
							<p className="font-semibold lg:text-xl">{formatCurrency(apartment.price, "NGN")}/night</p>
							<Dialog open={open} onOpenChange={setOpen}>
								<DialogTrigger asChild>
									<button type="button" className="font-medium underline lg:text-sm">
										Edit
									</button>
								</DialogTrigger>
								<DialogContent className="w-full max-w-[400px]">
									<DialogTitle>Edit reservation</DialogTitle>
									<DialogDescription hidden></DialogDescription>
									<div className="min-h-[200px] w-full"></div>
								</DialogContent>
							</Dialog>
						</div>
						<hr />
						<div className="flex w-full flex-col gap-3">
							<p className="font-semibold lg:text-sm">Reserve details</p>
							<div className="flex w-full items-center justify-between">
								<p className="font-light text-neutral-400">Check in</p>
								<p className="font-medium text-neutral-900">{formatDate(values.check_in, "dd MMM yyyy")}</p>
							</div>
							<div className="flex w-full items-center justify-between">
								<p className="font-light text-neutral-400">Check out</p>
								<p className="font-medium text-neutral-900">
									{formatDate(values.check_out, "dd MMM yyyy")}
								</p>
							</div>
							<div className="flex w-full items-center justify-between">
								<p className="font-light text-neutral-400">Number of guests</p>
								<p className="font-medium text-neutral-900">{values.guests}</p>
							</div>
						</div>
						<div className="flex w-full flex-col gap-3">
							<p className="font-semibold lg:text-sm">Cost Breakdown</p>
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
