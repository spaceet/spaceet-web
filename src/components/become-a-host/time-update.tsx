import { RiArrowRightLine } from "@remixicon/react"
import React from "react"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { checkInTimes, checkOutTimes } from "@/config"
import { Button } from "../ui/button"
import { Label } from "../ui/label"

interface Props {
	onClose: () => void
	checkIn: string[]
	checkOut: string
	setFieldValue: (field: string, value: any) => void
}

export const TimeUpdate = ({ checkIn, checkOut, onClose, setFieldValue }: Props) => {
	return (
		<div className="mt-5 flex w-full flex-col gap-6">
			<div className="flex w-full flex-col gap-2">
				<Label htmlFor="check-in">Check-in time</Label>
				<div className="flex w-full items-center gap-4">
					<Select
						value={checkIn[0]}
						onValueChange={(value) => setFieldValue("checkIn", [value, checkIn[1]])}>
						<SelectTrigger className="w-[150px] capitalize">
							<SelectValue />
						</SelectTrigger>
						<SelectContent className="capitalize">
							{checkInTimes.map((time) => (
								<SelectItem key={time} value={time}>
									{time}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<RiArrowRightLine className="text-2xl" />
					<Select
						value={checkIn[1]}
						onValueChange={(value) => setFieldValue("checkIn", [checkIn[0], value])}
						disabled={checkIn[0] === "flexible"}>
						<SelectTrigger className="w-[150px]">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							{checkOutTimes.map((time) => (
								<SelectItem key={time} value={time}>
									{time}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</div>
			<div className="flex w-full flex-col gap-2">
				<Label htmlFor="check-out">Check-out time</Label>
				<Select value={checkOut} onValueChange={(value) => setFieldValue("checkOut", value)}>
					<SelectTrigger>
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						{checkOutTimes.map((time) => (
							<SelectItem key={time} value={time}>
								{time}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
			<Button type="button" onClick={onClose}>
				Save
			</Button>
		</div>
	)
}
