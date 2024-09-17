import { RiArrowLeftSLine } from "@remixicon/react"
import Link from "next/link"
import React from "react"

import { FadeTransition, Seo } from "../shared"
import { ComponentUpdateProps } from "@/types"
import { capitalizeWords } from "@/lib"

const Page = ({
	active,
	components,
	handleGoTo,
	handlePrev,
	label,
	subtitle,
	updateCanProceed,
}: ComponentUpdateProps) => {
	React.useEffect(() => {
		updateCanProceed(true)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<>
			<Seo title={capitalizeWords(label)} description="Become a Host" />
			<FadeTransition className="my-[72px] grid w-full place-items-center">
				<div className="grid h-[calc(100vh-209px)] w-full grid-cols-3">
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
										<button
											onClick={() => handleGoTo(index)}
											key={index}
											className={`flex w-full items-center gap-1 rounded-md p-2 font-medium ${active === name ? "bg-neutral-200" : ""}`}>
											<Icon size={20} /> {name}
										</button>
									))}
								</div>
							</div>
						</div>
					</div>
					<div className="col-span-2 h-full w-full"></div>
				</div>
			</FadeTransition>
		</>
	)
}

export default Page
