import { useMutation, useQueries } from "@tanstack/react-query"
import { addDays, format, formatDate } from "date-fns"
import { ChevronLeftCircle } from "lucide-react"
import { useRouter } from "next/router"
import { useFormik } from "formik"
import { toast } from "sonner"
import Image from "next/image"
import Link from "next/link"
import React from "react"

import { Appbar, Footer, Rating, Seo, Spinner } from "@/components/shared"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { NotFound } from "@/components/layouts"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { formatCurrency } from "@/lib"
import { HttpError } from "@/types"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import {
	GenerateLinkDto,
	GeneratePaymentLink,
	GetPropertyQuery,
	GetPricingQuery,
	MakeReservationMutation,
	ReservationDto,
} from "@/queries"

const Page = () => {
	const [agreed, setAgreed] = React.useState(false)
	const [open, setOpen] = React.useState(false)

	const router = useRouter()
	const { check_in, check_out, guests, id } = router.query
	const minimumCheckInDate = new Date().toISOString().split("T")[0]

	const { mutateAsync: generatePaymentLink } = useMutation({
		mutationFn: (payload: GenerateLinkDto) => GeneratePaymentLink(payload),
		mutationKey: ["generate-payment-link"],
		onSuccess: (data) => {
			const {
				data: {
					data: {
						data: { authorization_url },
					},
				},
			} = data
			window.location.replace(authorization_url)
		},
		onError: (error) => {
			console.error(error)
		},
	})

	const { isPending: isReserving, mutateAsync: makeReservation } = useMutation({
		mutationFn: (payload: ReservationDto) => MakeReservationMutation(payload),
		mutationKey: ["make-reservation"],
		onSuccess: (data) => {
			const {
				data: { id, price_details },
			} = data
			toast.success("Reservation made successfully!")
			const payload: GenerateLinkDto = {
				amount: price_details.final_price,
				narration: "RESERVATION",
				narration_id: id,
			}
			generatePaymentLink(payload)
		},
		onError: ({ response }: HttpError) => {
			console.error(response)
			const { message } = response.data
			toast.error(message)
		},
	})

	const [{ data: apartment }, { data: pricing, refetch: refetchPricing }] = useQueries({
		queries: [
			{
				queryFn: () => GetPropertyQuery(String(id)),
				queryKey: ["get-apartment", id],
				enabled: !!id,
			},
			{
				queryFn: () =>
					GetPricingQuery({
						apartment_id: String(id),
						checkin_date: formatDate(String(check_in), "MM/dd/yyyy"),
						checkout_date: formatDate(String(check_out), "MM/dd/yyyy"),
					}),
				queryKey: ["get-pricing", id, check_in, check_out],
				enabled: !!id && !!check_in && !!check_out,
			},
		],
	})

	const handleMakeReservation = async () => {
		if (!agreed) {
			toast.error("Please agree to the terms and conditions")
			return
		}
		const payload: ReservationDto = {
			apartment_id: String(id),
			checkin_date: format(String(check_in), "MM/dd/yyyy"),
			checkout_date: format(String(check_out), "MM/dd/yyyy"),
			number_of_guests: Number(guests),
			payment_channel: "CARD",
			description: "",
			t_and_c_agreed: agreed ? "YES" : "NO",
		}
		makeReservation(payload)
	}

	const { handleChange, handleSubmit, values } = useFormik({
		initialValues: {
			check_in: String(check_in),
			check_out: String(check_out),
			guests: Number(guests),
		},
		onSubmit: (values) => {
			router.push(
				{
					pathname: router.pathname,
					query: {
						...router.query,
						check_in: values.check_in,
						check_out: values.check_out,
						guests: values.guests,
					},
				},
				undefined,
				{ shallow: true }
			)
			setOpen(false)
			refetchPricing()
		},
	})

	if (!apartment) return <NotFound />

	return (
		<>
			<Seo title="Make Reservation" />
			<Appbar />
			<main className="container mx-auto my-12 flex flex-col gap-8 px-5 lg:px-0">
				<div className="flex items-center gap-2">
					<button onClick={() => router.back()}>
						<ChevronLeftCircle className="stroke-[1px]" />
					</button>
					<h3 className="font-medium lg:text-2xl">Reserving a space</h3>
				</div>
				<div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-3">
					<div className="col-span-2 flex w-full flex-col gap-8">
						<div className="flex w-full flex-col items-center gap-4 rounded-2xl border p-6 lg:flex-row">
							<div className="relative h-[173px] w-[334px]">
								<Image
									src={apartment.data.cover_photo ?? apartment.data.images[0]}
									alt={apartment.data.name}
									fill
									sizes="(max-width: 1024px)100%"
									className="rounded-md object-cover"
								/>
							</div>
							<div className="flex w-full flex-1 flex-col gap-3">
								<div className="flex w-full items-center justify-between gap-4 lg:justify-start">
									<p className="font-semibold capitalize lg:text-xl">
										{apartment.data.city}, {apartment.data.state}
									</p>
									<Link href={`/`} className="text-neutral-500 underline lg:text-sm">
										10 reviews
									</Link>
								</div>
								<div className="flex items-center gap-2">
									<p className="text-neutral-500 lg:text-sm">
										Rating: <span className="text-neutral-900">{apartment.data.rating}</span>
									</p>
									<Rating rating={Number(apartment.data.rating)} />
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
										src={apartment.data.host.profile_image ?? ""}
										alt={apartment.data.host.full_name}
										className="object-cover"
									/>
								</Avatar>
								<div className="">
									<p className="font-medium capitalize">{apartment.data.host.full_name}</p>
									<p className="text-neutral-400 lg:text-sm">
										Host • Joined since {new Date(apartment.data.host.createdOn).getFullYear()}
									</p>
								</div>
							</div>
							<div className="h-[126px] w-full rounded-2xl border"></div>
						</div>
						<div className="flex w-full flex-col gap-3 rounded-2xl border p-6">
							<p className="font-semibold text-neutral-900 lg:text-xl">Cancellation policy</p>
							<p className="text-neutral-900">
								Free cancellation before {formatDate(addDays(new Date(values.check_in), -5), "MMM dd")}.
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
							<p className="font-semibold lg:text-xl">
								{formatCurrency(apartment.data.price.cost_per_night, "NGN")}/night
							</p>
							<Dialog open={open} onOpenChange={setOpen}>
								<DialogTrigger asChild>
									<button type="button" className="font-medium underline lg:text-sm">
										Edit
									</button>
								</DialogTrigger>
								<DialogContent className="w-full max-w-[400px]">
									<DialogTitle>Edit reservation</DialogTitle>
									<DialogDescription hidden></DialogDescription>
									<form onSubmit={handleSubmit} className="flex min-h-[200px] w-full flex-col gap-4">
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
												max={apartment.data.maximum_number_of_guests}
												placeholder="2"
												innerClassName="rounded-3xl"
												labelClassName="text-neutral-500 font-normal"
											/>
										</div>
										<Button type="submit" className="w-full rounded-3xl">
											Update
										</Button>
									</form>
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
									{formatCurrency(pricing?.data.price_per_night ?? 0, "NGN")} x{" "}
									{pricing?.data.number_of_nights} nights
								</p>
								<p className="font-medium text-neutral-900">
									{formatCurrency(pricing?.data.total_price_of_nights ?? 0, "NGN")}
								</p>
							</div>
							<div className="flex w-full items-center justify-between">
								<p className="font-light text-neutral-400">Cleaning Fee</p>
								<p className="font-medium text-neutral-900">
									{formatCurrency(pricing?.data.cleaning_fee ?? 0, "NGN")}
								</p>
							</div>
							<div className="flex w-full items-center justify-between">
								<p className="font-light text-neutral-400">Service Charge</p>
								<p className="font-medium text-neutral-900">
									{formatCurrency(pricing?.data.service_charge ?? 0, "NGN")}
								</p>
							</div>
							<div className="mt-2 flex w-full items-center justify-between">
								<p className="font-light text-neutral-400">Total</p>
								<p className="font-medium text-neutral-900">
									{formatCurrency(pricing?.data.final_price ?? 0, "NGN")}
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
						<Button
							type="button"
							onClick={handleMakeReservation}
							disabled={isReserving}
							className="rounded-3xl">
							{isReserving ? <Spinner /> : "Reserve"}
						</Button>
					</div>
				</div>
			</main>
			<Footer />
		</>
	)
}

export default Page
