import { RiCloseLine } from "@remixicon/react"
import React from "react"

import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

interface Props {
	customRules: string[]
	onClose: () => void
	removeCustomRule: (value: string) => void
	setFieldValue: (field: string, value: any) => void
}

export const CustomRules = ({ customRules, onClose, removeCustomRule, setFieldValue }: Props) => {
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			e.preventDefault()
			const value = e.currentTarget.value
			if (value.trim() !== "") {
				setFieldValue("customRules", [...customRules, value])
				e.currentTarget.value = ""
			}
		}
	}

	return (
		<div className="mt-5 flex w-full flex-col gap-6">
			<div className="flex w-full flex-col gap-2">
				<Label htmlFor="custom-rules">Enter rules</Label>
				<div className="flex w-full flex-wrap items-center gap-1">
					{customRules.map((rule) => (
						<Button
							type="button"
							variant="outline"
							onClick={() => removeCustomRule(rule)}
							key={rule}
							className="flex items-center gap-2">
							{rule}
							<RiCloseLine size={14} />
						</Button>
					))}
				</div>
				<Input name="" onKeyDown={handleKeyDown} />
			</div>
			<Button type="button" onClick={onClose}>
				Save
			</Button>
		</div>
	)
}
