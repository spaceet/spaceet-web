import { useMutation } from "@tanstack/react-query"
import { useFormik } from "formik"
import React from "react"

import { AddPropertyDto, AddPropertyMutation } from "@/queries"
import { Appbar, Footer, Seo } from "@/components/shared"

const initialValues: AddPropertyDto = {}

const Page = () => {
	const {} = useMutation({
		mutationFn: (payload: AddPropertyDto) => AddPropertyMutation(payload),
		mutationKey: ["add-property"],
		onSuccess: () => {},
		onError: () => {},
	})

	const {} = useFormik({
		initialValues,
		onSubmit: () => {},
	})

	return (
		<>
			<Seo title="Add Apartment" />
			<Appbar />
			<main className="container mx-auto"></main>
			<Footer />
		</>
	)
}

export default Page
