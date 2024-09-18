import { RiCheckboxCircleFill } from "@remixicon/react"
import Image from "next/image"
import Link from "next/link"
import React from "react"

import { FadeTransition, Seo } from "../shared"
import { getting_started } from "./data"

const Page = () => {
	return (
		<>
			<Seo title="Become a Host" />
			<FadeTransition className="grid h-full w-full place-items-center">
				<div className="grid w-full grid-cols-2">
					<div className="w-full">
						<div className="flex w-[329px] flex-col gap-6">
							<div className="relative aspect-square w-[120px]">
								<Image
									src="/assets/images/house-3d.png"
									alt="3d house"
									fill
									sizes="(max-width: 1024px)100%"
									className="rounded-md object-cover"
								/>
							</div>
							<p className="text-4xl font-semibold">Welcome to Spaceet for Host</p>
							<p className="text-sm text-neutral-500">
								Things to get started. Read our{" "}
								<Link href="/help-center" className="underline">
									policy
								</Link>
							</p>
						</div>
					</div>
					<div className="flex w-full flex-col gap-4">
						<div className="flex flex-col gap-2">
							<h3 className="text-xl font-medium">Apartment Set-up Procedure</h3>
							<p className="text-sm text-neutral-400">
								To set up an account on Spaceet, you will need to provide the following information to
								enable use seamlessly onboard your apartment.
							</p>
						</div>
						<div className="flex w-full flex-col rounded-xl border p-5">
							{getting_started.map(({ content, icon: Icon, label }, index) => (
								<div
									key={index}
									className="flex w-full items-center gap-4 border-b px-5 py-4 last:border-b-0">
									<div className="size-12">
										<Icon />
									</div>
									<div className="flex flex-1 flex-col gap-2">
										<h4 className="font-medium">{label}</h4>
										<p className="text-sm text-neutral-400">{content}</p>
									</div>
									<RiCheckboxCircleFill size={24} className="text-neutral-300" />
								</div>
							))}
						</div>
					</div>
				</div>
			</FadeTransition>
		</>
	)
}

export default Page
