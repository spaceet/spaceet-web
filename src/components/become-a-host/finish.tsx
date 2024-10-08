import { RiArrowRightDoubleLine, RiCheckboxCircleFill } from "@remixicon/react"
import Confetti from "react-confetti"
import Image from "next/image"
import Link from "next/link"
import React from "react"

import { FadeTransition, Seo } from "../shared"
import { ComponentUpdateProps } from "@/types"
import { getting_started } from "./data"
import { useWindowSize } from "@/hooks"
import { Button } from "../ui/button"

const Page = ({ activeIndex, handleNext, totalItems, width }: ComponentUpdateProps) => {
	const windowSize = useWindowSize()

	return (
		<>
			<Seo title="Done!" />
			<div className="fixe left-0 top-0 w-screen">
				<Confetti width={windowSize[0]} height={windowSize[1]} numberOfPieces={500} />
			</div>
			<FadeTransition className="grid h-full w-full place-items-center">
				<div className="grid w-full grid-cols-2">
					<div className="w-full">
						<div className="flex w-[360px] flex-col gap-6">
							<div className="relative aspect-square w-[120px]">
								<Image
									src="/assets/images/listing-done.png"
									alt="3d house"
									fill
									sizes="(max-width: 1024px)100%"
									className="rounded-md object-cover"
								/>
							</div>
							<p className="text-4xl font-semibold">Your Apartment Listing is All Done!</p>
							<p className="text-sm text-neutral-500">
								Thank you for listing your apartment on{" "}
								<Link href="/" className="text-primary-100 underline">
									Spaceet.com
								</Link>
								, continueto your dashboard to manage your listing.
							</p>
						</div>
					</div>
					<div className="flex w-full flex-col gap-4">
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
									<RiCheckboxCircleFill size={24} className="text-primary-100" />
								</div>
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
						<Button className="w-[170px]" type="button" onClick={handleNext}>
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
