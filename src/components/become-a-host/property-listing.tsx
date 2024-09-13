import { RiArrowLeftSLine } from "@remixicon/react"
import Link from "next/link"
import React from "react"

import { ComponentUpdateProps } from "@/types"
import { capitalizeWords } from "@/lib"
import { Seo } from "../shared"

const Page = ({ active, components, handlePrev, label, subtitle }: ComponentUpdateProps) => {
	return (
		<>
			<Seo title={capitalizeWords(label)} description="Become a Host" />
			<div className="grid h-full w-full place-items-center pt-[72px]">
				<div className="grid h-full w-full grid-cols-3">
					<div className="w-full">
						<div className="flex w-[329px] flex-col gap-4">
							<button onClick={handlePrev} className="flex items-center font-semibold">
								<RiArrowLeftSLine size={20} />
								Back
							</button>
							<p className="text-4xl font-semibold">{label}</p>
							<p className="text-sm text-neutral-500">
								Things to get started. Read our{" "}
								<Link href="/help-center" className="underline">
									policy
								</Link>
							</p>
							<div className="flex w-full flex-col gap-3 rounded-xl border p-6">
								<p className="text-xs text-neutral-400">{subtitle}</p>
								<div className="flex w-full flex-col gap-3">
									{components.map(({ icon: Icon, name }, index) => (
										<div
											key={index}
											className={`flex w-full items-center gap-1 rounded-md p-2 font-medium ${active === name ? "bg-neutral-200" : ""}`}>
											<Icon size={20} /> {name}
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
					<div className="col-span-2 h-full w-full"></div>
				</div>
			</div>
		</>
	)
}

export default Page
