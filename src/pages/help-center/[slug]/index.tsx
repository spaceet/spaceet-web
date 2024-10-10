import { RiArrowLeftSLine, RiQuestionnaireFill } from "@remixicon/react"
import { useQuery } from "@tanstack/react-query"
import ReactMarkdown from "react-markdown"
import { useRouter } from "next/router"
import React from "react"
import axios from "axios"

import { Appbar, Footer, Loading, Seo } from "@/components/shared"
import { capitalizeWords, fromKebabCase } from "@/lib"
import { Button } from "@/components/ui/button"
import { NotFound } from "@/components/layouts"
import { HttpResponse } from "@/types"
import { faqs } from "@/config"

type Data = {
	slug: string
	markdownWithMeta: string
}

const Page = () => {
	const router = useRouter()
	const { slug } = router.query

	const notCurrentFaqs = faqs.filter((faq) => faq.slug !== String(slug))

	const { data, isLoading } = useQuery({
		queryFn: () =>
			axios.get<HttpResponse<Data>>(`/api/help-center?slug=${slug}`).then((res) => res.data),
		queryKey: ["help-center", slug],
		refetchOnWindowFocus: false,
		enabled: !!slug,
	})

	if (isLoading) return <Loading />

	if (!isLoading && !data) return <NotFound />

	return (
		<>
			<Seo title={capitalizeWords(fromKebabCase(String(slug)))} />
			<Appbar />
			<main className="container mx-auto w-full px-5 lg:px-0">
				<section className="flex w-full flex-col items-center py-8 lg:flex-row lg:items-start lg:py-12">
					<div className="flex flex-1 flex-col items-start gap-5">
						<Button className="font-bold" onClick={() => router.back()} variant="ghost">
							<RiArrowLeftSLine />
							Back
						</Button>
						<div className="markdown flex w-full flex-col">
							<ReactMarkdown>{data?.data.markdownWithMeta}</ReactMarkdown>
						</div>
					</div>
					<div className="w-[387px]">
						<div className="flex w-full flex-col gap-5 rounded-[5px] border p-5">
							<div className="grid size-[45px] place-items-center rounded-md bg-primary-50 text-primary-100">
								<RiQuestionnaireFill className="size-6 lg:size-9" />
							</div>
							<div className="flex w-full flex-col gap-3">
								<h3 className="text-lg">Spaceet customer support</h3>
								<p className="text-sm text-neutral-500">
									Send a message to us in case of an issue or to make enquiries.
								</p>
							</div>
							<button className="text-sm text-primary-100">Send a message</button>
						</div>
					</div>
				</section>
				<hr />
				<section className="flex w-full flex-col py-8 lg:py-12">
					<div className="flex flex-col gap-5">
						<h3 className="lg:text-2xl">Related Questions</h3>
						<p className="text-neutral-500 lg:text-sm">See the most popular questions asked</p>
					</div>
					<div className="grid w-full grid-cols-1 gap-5 lg:grid-cols-3">
						{notCurrentFaqs.map((faq, index) => (
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
				</section>
			</main>
			<Footer />
		</>
	)
}

export default Page
