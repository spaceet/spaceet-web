import Link from "next/link"
import React from "react"

import DashboardLayout from "@/components/layouts/dashboard-layout"
import { faqs, quick_actions } from "@/config"
import { Seo } from "@/components/shared"

const Page = () => {
	return (
		<>
			<Seo title="Help Center" />
			<DashboardLayout>
				<div className="flex h-full w-full flex-col gap-12 overflow-y-scroll px-8 py-12">
					<div className="flex w-full flex-col gap-6">
						<div className="flex w-full flex-col gap-3 lg:w-[330px]">
							<p className="font-medium lg:text-xl">Welcome, how can we help you?</p>
							<p className="text-neutral-500 lg:text-sm">
								With so many choices, you might just become a fan of any city - even your rivals.
							</p>
						</div>
						<div className="grid w-full grid-cols-1 gap-5 lg:grid-cols-3">
							{quick_actions.map(({ content, icon: Icon, label, text, url }, index) => (
								<div key={index} className="flex h-[209px] w-full flex-col gap-5 rounded-md border p-5">
									<div className="grid size-[45px] place-items-center rounded-md bg-primary-100/25 text-primary-100">
										<Icon size={34} />
									</div>
									<div className="flex min-h-20 w-full flex-col gap-3">
										<p className="text-lg">{label}</p>
										<p className="text-sm text-neutral-400">{content}</p>
									</div>
									<Link href={url} className="text-sm text-primary-100">
										{text}
									</Link>
								</div>
							))}
						</div>
					</div>
					<div className="flex w-full flex-col gap-6">
						<div className="flex w-full flex-col gap-3 lg:w-[330px]">
							<p className="font-medium lg:text-xl">Frequently Asked Questions</p>
						</div>
						<div className="grid w-full grid-cols-1 gap-5 lg:grid-cols-3">
							{faqs.map((faq, index) => (
								<div key={index} className="flex w-full flex-col gap-5 rounded-md border p-5 lg:h-[151px]">
									<div className="flex w-full flex-col gap-3">
										<p className="lg:text-lg">{faq.label}</p>
										<p
											className="text-neutral-400 lg:text-sm"
											dangerouslySetInnerHTML={{ __html: faq.content }}></p>
									</div>
									<Link href="" className="text-primary-100 lg:text-sm">
										View more
									</Link>
								</div>
							))}
						</div>
					</div>
				</div>
			</DashboardLayout>
		</>
	)
}

export default Page
