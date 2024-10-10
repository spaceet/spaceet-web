import Link from "next/link"
import React from "react"

import { Appbar, Footer, Seo, TabPanel } from "@/components/shared"
import { Button } from "@/components/ui/button"
import { useUserStore } from "@/store/z-store"
import { faqs, help_center } from "@/config"
import { capitalize } from "@/lib"

const filters = ["guest", "hosts"] as const
type Filter = (typeof filters)[number]

const Page = () => {
	const [current, setCurrent] = React.useState<Filter>("guest")
	const { user } = useUserStore()

	return (
		<>
			<Seo title="Help Center" />
			<Appbar />
			<main className="container mx-auto my-12 w-full">
				<section className="container mx-auto flex flex-col items-center gap-5 px-5 py-10 lg:gap-16 lg:px-0 lg:py-[120px]">
					<div className="flex w-full flex-col items-center gap-5 text-center">
						<h1 className="text-2xl font-medium leading-6 lg:text-5xl lg:leading-[70px]">
							{user ? `Hi ${capitalize(user.first_name)}` : "Welcome"}, how can we help you ?
						</h1>
						<p className="w-full max-w-[550px] text-neutral-500 lg:text-xl">
							With so many choices, you might just become a fan of any city - even your rivals.
						</p>
					</div>
					<div className="grid w-full grid-cols-1 gap-5 lg:grid-cols-3">
						{help_center.map(({ content, icon: Icon, label, text, url }, index) => (
							<div key={index} className="flex w-full flex-col gap-5 rounded-[5px] border p-5">
								<div className="grid size-[45px] place-items-center rounded-md bg-primary-50 text-primary-100">
									<Icon className="size-6 lg:size-9" />
								</div>
								<div className="flex w-full flex-col gap-3">
									<h3 className="text-lg">{label}</h3>
									<p className="text-sm text-neutral-500">{content}</p>
								</div>
								<Link href={url} className="text-sm text-primary-100">
									{text}
								</Link>
							</div>
						))}
					</div>
				</section>
				<section className="container mx-auto flex flex-col items-center gap-5 px-5 py-10 lg:px-0 lg:py-[120px]">
					<div className="flex flex-col items-center text-center">
						<h2 className="text-xl font-semibold lg:text-[32px]">Frequently Asked Questions</h2>
						<p className="text-sm text-neutral-500 lg:text-base">See the most popular questions asked</p>
					</div>
					<div className="flex w-fit items-center justify-center rounded-md border p-1">
						{filters.map((filter) => (
							<button
								key={filter}
								className={`flex h-[36px] w-[102px] items-center justify-center rounded-md text-sm font-medium capitalize transition-all duration-300 ${
									current === filter ? "bg-primary-100 text-white" : "bg-neutral-100 text-neutral-500"
								}`}
								onClick={() => setCurrent(filter)}>
								{filter}
							</button>
						))}
					</div>
					<TabPanel selectedTab={current} tabValue="guest">
						<div className="grid items-center gap-8 lg:mt-[18px] lg:grid-cols-3">
							{faqs.map((faq, index) => (
								<div
									key={index}
									className="flex w-full flex-col gap-5 rounded-md border border-neutral-400 px-6 py-4 lg:w-full">
									<div className="flex flex-col gap-3">
										<h3 className="text-lg font-semibold">{faq.label}</h3>
										<p className="neutral-300 text-sm" dangerouslySetInnerHTML={{ __html: faq.content }}></p>
									</div>
									<a href={`/help-center/${faq.slug}`} className="text-xs text-primary-100">
										View More
									</a>
								</div>
							))}
						</div>
					</TabPanel>
					<TabPanel selectedTab={current} tabValue="hosts">
						<div className="grid items-center gap-8 lg:mt-[18px] lg:grid-cols-3">
							{faqs.map((faq, index) => (
								<div
									key={index}
									className="flex w-full flex-col gap-5 rounded-md border border-neutral-400 px-6 py-4 lg:w-full">
									<div className="flex flex-col gap-3">
										<h3 className="text-lg font-semibold">{faq.label}</h3>
										<p className="neutral-300 text-sm" dangerouslySetInnerHTML={{ __html: faq.content }}></p>
									</div>
									<a href={faq.url} className="text-xs text-primary-100">
										View More
									</a>
								</div>
							))}
						</div>
					</TabPanel>
					<div className="mt-10 text-center">
						<h2 className="mb-5 text-[25px] font-semibold">Didn&#39;t answer to your questions ? </h2>
						<Button className="h-11 w-[150px]">Send a message</Button>
					</div>
				</section>
				<div></div>
			</main>
			<Footer />
		</>
	)
}

export default Page
