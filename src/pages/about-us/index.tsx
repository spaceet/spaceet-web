import React from "react"

import { Appbar, Footer, Seo } from "@/components/shared"
import { Button } from "@/components/ui/button"

const Page = () => {
	return (
		<>
			<Seo title="About us" />
			<Appbar />
			<main className="w-full">
				<div className="place-tems-center grid h-[50vh] w-full bg-black/50 bg-hero-3 bg-cover bg-center bg-no-repeat bg-blend-overlay">
					<div className="container mx-auto flex items-center justify-between">
						<div className="flex w-[511px] flex-col gap-5 text-white">
							<h1 className="text-[64px] font-bold leading-[70px]">About Us</h1>
							<p className="text-xl">
								With so many choices, you might just become a fan of any city - even your rivals.
							</p>
							<Button className="h-[52px] w-[210px]">Learn more</Button>
						</div>
						<div></div>
					</div>
				</div>
				<section className="container mx-auto lg:py-[120px]"></section>
				<section className="w-full bg-neutral-900 lg:py-[120px]">
					<div className="container mx-auto"></div>
				</section>
				<section className="container mx-auto lg:py-[100px]"></section>
			</main>
			<Footer />
		</>
	)
}

export default Page
