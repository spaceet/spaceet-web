import Link from "next/link"
import React from "react"

import { Separator } from "../ui/separator"
import { footer_links } from "@/config"

export const Footer = () => {
	return (
		<footer role="contentinfo" className="w-screen bg-neutral-900 px-5 py-10 lg:px-0 lg:py-[150px]">
			<div className="container mx-auto flex flex-wrap items-start gap-8 text-neutral-300">
				<div className="w-full lg:w-[350px]">
					<Link href="/" className="text-2xl text-primary-100">
						Spaceet.com
					</Link>
				</div>
				<div className="flex w-full flex-1 flex-wrap items-start justify-between gap-[42px]">
					{footer_links.map((item, index) => (
						<div key={index} className="flex w-[300px] flex-1 flex-col gap-5 lg:w-[150px]">
							<p className="font-semibold">{item.label}</p>
							<div className="flex w-full flex-col gap-5">
								{item.links.map((link, index) => (
									<Link key={index} href={link.url} className="link flex items-center gap-2">
										{link.icon ? <link.icon size={16} /> : null}
										{link.name}
									</Link>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
			<Separator className="my-10 lg:my-20" />
			<div className="container mx-auto flex flex-col items-start justify-between gap-5 text-sm text-neutral-300 lg:flex-row lg:items-center">
				<div className="flex items-center gap-2">
					<p>{new Date().getFullYear()}, Spaceet</p>
					<Separator orientation="vertical" className="h-4 bg-neutral-300" />
					<p>Nigeria</p>
				</div>
				<div className="flex flex-col items-start gap-5 lg:flex-row lg:items-center">
					<Link href="/help-center/privacy-policy" className="link">
						Privacy
					</Link>
					•
					<Link href="/help-center/terms-of-service" className="link">
						Terms and conditions
					</Link>
				</div>
			</div>
		</footer>
	)
}
