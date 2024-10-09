import React from "react"

import { Appbar, Footer, Seo } from "@/components/shared"
import { Button } from "@/components/ui/button"
import { faqData } from "../../config/faq"

const Page = () => {
	return (
		<>
			<Seo title="Help Center" />
			<Appbar />
			<main className="container mx-auto my-12 w-full">
				<section className="container mx-auto items-center justify-center gap-6 px-5 py-10 lg:flex-row lg:py-[120px]">
					<div className="text-center">
						<h1 className="text-[25px] font-bold leading-[70px] lg:mb-5 lg:text-[48px] lg:font-medium">
							Hi Temi, how can we help you ?
						</h1>
						<p className="mx-auto w-full text-[20px]">
							With so many choices, you might just become a fan of any city - even your rivals.
						</p>
					</div>
					<div className="mx-auto mt-5 flex flex-col items-center justify-between gap-6 lg:flex-row">
						<div className="w-[350px] rounded-[5px] border border-neutral-400 px-8 py-4">
							<h3 className="mb-5 text-[18px] font-semibold">Spaceet support</h3>
							<p className="color-neutral-500 mb-5 text-[12px]">
								Send a message to us in case of an issue or to make inquiries
							</p>
							<p className="text-[12px] text-warning-300">Send Message</p>
						</div>
						<div className="w-[350px] rounded-[5px] border border-neutral-400 px-6 py-4">
							<h3 className="mb-5 text-[18px] font-semibold">Become a host</h3>
							<p className="color-neutral-500 mb-5 text-[12px]">
								As a new Host, you get access to a well trained support team.
							</p>
							<p className="text-[12px] text-warning-300">Get Started</p>
						</div>
						<div className="w-[350px] rounded-[5px] border border-neutral-400 px-6 py-4">
							<h3 className="mb-5 text-[18px] font-semibold">Find a Space</h3>
							<p className="color-neutral-500 mb-5 text-[12px]">
								As a new Host, you get access to a well trained support team.
							</p>
							<p className="text-[12px] text-warning-300">View Listings</p>
						</div>
					</div>
				</section>
				<section className="container mx-auto items-center justify-center px-5 py-10 lg:flex-row lg:py-[120px]">
					<div className="mb-10 text-center">
						<h2 className="text-[24px] font-semibold lg:text-[32px]">Frequently Asked Questions</h2>
						<p>See the most popular questions asked</p>
						<div className="my-8 flex text-center">
							<Button className="mx-auto h-[34px] w-[100px]">Guests</Button>
							<Button className="mx-auto h-[34px] w-[100px]" variant="outline">
								Hosts
							</Button>
						</div>
					</div>

					<div className="grid items-center gap-x-8 gap-y-8 lg:grid-cols-3">
						{faqData.map((faq, index) => (
							<div
								key={index}
								className="mx-auto w-[350px] rounded-[5px] border border-neutral-400 px-6 py-4 lg:w-full">
								<h3 className="mb-5 text-[18px] font-semibold">{faq.title}</h3>
								<p className="color-neutral-300 mb-5 text-[14px]">{faq.details}</p>
								<a href={faq.url} className="text-[12px] text-warning-300">
									View More
								</a>
							</div>
						))}
					</div>

					<div className="mx-auto mt-10 text-center">
						<h2 className="mb-5 text-[25px] font-semibold">Didn&#39;t answer to your questions ? </h2>
						<Button className="mx-auto h-[44px] w-[150px]">Send a message</Button>
					</div>
				</section>
				<div></div>
			</main>
			<Footer />
		</>
	)
}

export default Page
