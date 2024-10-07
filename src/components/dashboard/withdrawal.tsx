import { useFormik } from "formik"
import React from "react"

import { Select, SelectContent, SelectTrigger, SelectValue } from "../ui/select"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

const initialValues = {
	amount: "",
	accountNumber: "",
	accountName: "",
	bankName: "",
}

export const Withdrawal = () => {
	const { handleChange, handleSubmit, values } = useFormik({
		initialValues,
		onSubmit: (values) => {
			const payload = {
				...values,
				amount: values.amount.replace(/\D/g, ""),
			}
			console.log(payload)
		},
	})

	return (
		<div className="flex w-full flex-col">
			<form onSubmit={handleSubmit} className="flex w-full flex-col gap-2">
				<div className="flex w-full flex-col gap-1">
					<Label htmlFor="bankName">Bank Name</Label>
					<Select>
						<SelectTrigger>
							<SelectValue placeholder="Select Bank" />
						</SelectTrigger>
						<SelectContent></SelectContent>
					</Select>
				</div>
				<Input
					type="number"
					label="Account Number"
					name="accountNumber"
					onChange={handleChange}
					required
				/>
				<Input label="Account Name" name="accountName" onChange={handleChange} required />
				<Input
					type="text"
					label="Amount to Withdraw"
					value={values.amount.replace(/\D/g, "").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
					name="amount"
					onChange={handleChange}
					inputMode="numeric"
					required
				/>
				<Button type="submit" className="mt-3">
					Withdraw
				</Button>
			</form>
		</div>
	)
}
