import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { useFormik } from "formik"
import React from "react"

import { GetPropertyTypesQuery, SearchPropertyDto } from "@/queries"
import { encodeQueryParams, places } from "@/config"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ComboBox } from "./combo-box"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"

const initialValues: SearchPropertyDto = {
	bedrooms: "",
	location: "",
	price: "",
	type: "",
}

export const SearchWidget = () => {
	const router = useRouter()

	const { data } = useQuery({
		queryFn: () => GetPropertyTypesQuery(),
		queryKey: ["get-apartment-types"],
	})

	const apartmentTypes = React.useMemo(() => {
		if (!data) return []
		return data.data
	}, [data])

	const { handleChange, handleSubmit, setFieldValue, values } = useFormik({
		initialValues,
		onSubmit: (values) => {
			Object.keys(values).forEach((key) => {
				if (!values[key as keyof SearchPropertyDto]) {
					delete values[key as keyof SearchPropertyDto]
				}
			})
			const payload = { ...values, limit: 20, page: 1 }
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
						value={String(values.location)}
						onValueChange={(location) => setFieldValue("location", location)}
						placeholder="Location"
					/>
					<Select value={values.type} onValueChange={(value) => setFieldValue("propertyType", value)}>
						<SelectTrigger className="capitalize placeholder:text-neutral-300">
							<SelectValue placeholder="Apartment Type" />
						</SelectTrigger>
						<SelectContent className="bg-white capitalize">
							{apartmentTypes.map((type, index) => (
								<SelectItem key={index} value={type.name}>
									{type.name}
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
