import { RiArrowRightDoubleLine, RiCheckboxCircleFill } from "@remixicon/react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import React from "react"

import { FadeTransition, Seo } from "../shared"
import { ComponentUpdateProps } from "@/types"
import { header, stagger } from "@/config"
import { getting_started } from "./data"
import { Button } from "../ui/button"

const Page = ({
	activeIndex,
	handleNext,
	isNotFirstOrLast,
	totalItems,
	width,
}: ComponentUpdateProps) => {
	return (
		<>
			<Seo title="Become a Host" />
			<FadeTransition className="mb-28 mt-[72px] grid w-full place-items-center">
				<div className="grid w-full grid-cols-1 px-4 lg:grid-cols-2 lg:px-0">
					<div className="w-full">
						<div className="flex w-[329px] flex-col gap-6">
							<motion.div className="relative aspect-square w-[120px]">
								<Image
									src="/assets/images/house-3d.png"
									alt="3d house"
									fill
									sizes="(max-width: 1024px)100%"
									className="rounded-md object-cover"
								/>
							</motion.div>
							<motion.p {...header} className="text-4xl font-semibold">
								Welcome to Spaceet for Host
							</motion.p>
							<motion.p key="paragraph" className="text-sm text-neutral-500">
								Things to get started. Read our{" "}
								<Link href="/help-center" className="underline">
									policy
								</Link>
							</motion.p>
						</div>
					</div>
					<div className="flex w-full flex-col gap-4">
						<div className="flex flex-col gap-2">
							<h3 className="text-xl font-medium">Apartment Set-up Procedure</h3>
							<p className="text-sm text-neutral-400">
								To set up an account on Spaceet, you will need to provide the following information to
								enable us seamlessly onboard your apartment.
							</p>
						</div>
						<div className="flex w-full flex-col rounded-xl border p-5">
							{getting_started.map(({ content, icon: Icon, label }, index) => (
								<motion.div
									key={index}
									{...stagger("up", (index + 1) * 0.5)}
									className="flex w-full items-center gap-4 border-b px-5 py-4 last:border-b-0">
									<div className="size-12">
										<Icon />
									</div>
									<div className="flex flex-1 flex-col gap-2">
										<h4 className="font-medium">{label}</h4>
										<p className="text-sm text-neutral-400">{content}</p>
									</div>
									<RiCheckboxCircleFill size={24} className="text-neutral-300" />
								</motion.div>
							))}
						</div>
					</div>
				</div>
			</FadeTransition>
			<div className="fixed bottom-0 left-0 right-0 z-10 h-[100px] w-full bg-white">
				<div className="flex h-[10px] w-full bg-neutral-300">
					<div style={{ width: `${width}%` }} className="h-full bg-primary-100"></div>
				</div>
				<div className="container mx-auto flex h-[99px] items-center justify-end">
					<div className="flex items-center gap-4">
						{activeIndex > 0 && activeIndex < totalItems - 1 && (
							<Button className="w-[170px]" variant="outline">
								Save and Exit
							</Button>
						)}
						<Button className="w-[170px]" onClick={handleNext} disabled={!isNotFirstOrLast}>
							{activeIndex === 0 ? (
								"Let's go!"
							) : activeIndex === totalItems - 1 ? (
								<span className="flex w-full items-center gap-2">
									Go to Dashboard <RiArrowRightDoubleLine size={20} />
								</span>
							) : (
								"Next"
							)}
						</Button>
					</div>
				</div>
			</div>
		</>
	)
}

export default Page
