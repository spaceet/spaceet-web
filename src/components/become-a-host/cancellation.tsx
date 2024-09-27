import { RiArrowLeftSLine } from "@remixicon/react"
import Link from "next/link"
import React from "react"

import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { cancellation_policies } from "@/config"
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
					<div className="col-span-2 flex h-full w-full flex-1 flex-col gap-6 overflow-y-auto">
						<div className="flex w-full flex-col gap-2">
							<p className="text-xl font-medium">Cancellation</p>
							<p className="text-sm text-neutral-400">
								Read through our cancellation policies at the{" "}
								<Link href="/help-center" className="font-bold underline">
									Help Center
								</Link>
							</p>
						</div>
						<RadioGroup className="flex w-full flex-col gap-4">
							{cancellation_policies.map(({ description, label }, index) => (
								<div key={index} className="flex w-full items-center justify-between rounded-xl border p-6">
									<div className="flex max-w-[356px] flex-col gap-2">
										<p className="text-sm font-medium capitalize text-neutral-900">{label}</p>
										<p className="text-sm text-neutral-600">{description}</p>
									</div>
									<RadioGroupItem value={label} />
								</div>
							))}
						</RadioGroup>
					</div>
				</div>
			</FadeTransition>
		</>
	)
}

export default Page
