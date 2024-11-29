// import { useQuery } from "@tanstack/react-query"
import { CheckCircle } from "lucide-react"
import { useRouter } from "next/router"
import { format } from "date-fns"
import Link from "next/link"
import React from "react"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Appbar, Seo } from "@/components/shared"
import { Button } from "@/components/ui/button"
import {} from "@/queries"

const Page = () => {
	const router = useRouter()
	const { trxref, reference } = router.query

	// const {} = useQuery({
	// 	queryFn: () => {},
	// 	queryKey: ["get-payment-confirmation", trxref, reference],
	// 	enabled: !!trxref && !!reference,
	// })

	return (
		<>
			<Seo title="Payment Confirmation" />
			<Appbar />
			<main className="container mx-auto my-12 px-4 lg:px-0">
				<Card>
					<CardHeader>
						<div className="mb-4 flex items-center justify-center">
							<CheckCircle className="h-16 w-16 text-green-500" />
						</div>
						<CardTitle className="text-center text-3xl font-bold">Payment Successful</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="mb-6 text-center">
							Thank you for your purchase. Your payment has been processed successfully.
						</p>
						<div className="rounded-lg bg-gray-100 p-4">
							<h2 className="mb-4 text-xl font-semibold">Order Details</h2>
							<dl className="grid grid-cols-1 gap-2 lg:grid-cols-2">
								<dt className="font-medium">Order ID:</dt>
								<dd>{reference}</dd>
								<dt className="font-medium">Transaction Reference:</dt>
								<dd>{trxref}</dd>
								<dt className="font-medium">Date:</dt>
								<dd>{format(new Date(), "dd/MM/yyyy")}</dd>
							</dl>
						</div>
					</CardContent>
					<CardFooter className="flex flex-col items-center space-y-4">
						<Button asChild>
							<Link href="/bookings">View Bookings</Link>
						</Button>
						<Button variant="outline" asChild>
							<Link href="/">Return to Home</Link>
						</Button>
					</CardFooter>
				</Card>
			</main>
		</>
	)
}

export default Page
