import { useFormik } from "formik"
import { toast } from "sonner"
import React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const initialValues = {
	oldPassword: "",
	newPassword: "",
	confirmPassword: "",
}

export const Security = () => {
	const { handleChange, handleSubmit } = useFormik({
		initialValues,
		onSubmit: (values) => {
			if (values.newPassword !== values.confirmPassword) {
				toast.error("Passwords do not match")
				return
			}
			console.log(values)
		},
	})

	return (
		<form onSubmit={handleSubmit} className="flex w-full max-w-[600px] flex-col gap-4">
			<div className="flex w-full flex-col gap-4 rounded-xl border p-6">
				<Input
					type="password"
					name="oldPassword"
					onChange={handleChange}
					label="Old Password"
					placeholder="Old Password"
					required
				/>
				<Input
					type="password"
					name="newPassword"
					onChange={handleChange}
					label="New Password"
					placeholder="New Password"
					required
				/>
				<Input
					type="password"
					name="confirmPassword"
					onChange={handleChange}
					label="Confirm Password"
					placeholder="Confirm Password"
					required
				/>

				<div className="flex w-full items-center justify-end gap-4">
					<Button type="reset" variant="outline">
						Reset Changes
					</Button>
					<Button type="submit">Save Changes</Button>
				</div>
			</div>
		</form>
	)
}
