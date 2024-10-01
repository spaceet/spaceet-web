import { useRouter } from "next/router"
import { useFormik } from "formik"
import { toast } from "sonner"
import React from "react"

import { apartment_types, encodeQueryParams, places } from "@/config"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SearchPropertyDto } from "@/queries"
import { ComboBox } from "./combo-box"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"

const initialValues: SearchPropertyDto = {
	bedrooms: 1,
	location: "",
	price: 0,
	propertyType: "",
}

export const SearchWidget = () => {
	const router = useRouter()

	const { handleChange, handleSubmit, setFieldValue, values } = useFormik({
		initialValues,
		onSubmit: (values) => {
			if (!values.location) {
				toast.error("Please select a location")
				return
			}
			if (!values.propertyType) {
				toast.error("Please select a property type")
				return
			}
			if (!values.bedrooms) {
				toast.error("Please enter the number of bedrooms")
				return
			}
			const payload = { ...values }
			router.push(`/search?${encodeQueryParams(payload)}`)
		},
	})

	return (
		<div className="aspect-[0.98/1] w-full rounded-lg bg-white p-6 lg:w-[350px]">
			<form onSubmit={handleSubmit} className="flex h-full w-full flex-col gap-4">
				<p className="text-sm font-medium">Select Preferences</p>
				<div className="flex w-full flex-col gap-3 text-sm">
					<ComboBox
						data={places}
						value={values.location}
						onValueChange={(location) => setFieldValue("location", location)}
						placeholder="Location"
					/>
					<Select
						value={values.propertyType}
						onValueChange={(value) => setFieldValue("propertyType", value)}>
						<SelectTrigger className="capitalize placeholder:text-neutral-300">
							<SelectValue placeholder="Apartment Type" />
						</SelectTrigger>
						<SelectContent className="bg-white capitalize">
							{apartment_types.map((type) => (
								<SelectItem key={type} value={type}>
									{type}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<Input type="number" name="bedrooms" onChange={handleChange} placeholder="Bedrooms" min={1} />
					<Input type="number" name="price" onChange={handleChange} placeholder="Price Range" />
				</div>
				<Button type="submit">Find Apartment</Button>
			</form>
		</div>
	)
}
