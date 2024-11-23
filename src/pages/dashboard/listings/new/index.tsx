import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { toast } from "sonner"
import React from "react"
import {
	RiCloseCircleLine,
	RiHome8Line,
	RiUploadCloud2Line,
	RiVerifiedBadgeLine,
	RiWaterFlashLine,
} from "@remixicon/react"

import { useCreateHostStore } from "@/components/become-a-host/store"
import { AddPropertyDto, AddPropertyMutation } from "@/queries"
import { Appbar, Seo } from "@/components/shared"
import { convertTime12to24 } from "@/lib"
import { HttpError } from "@/types"
import {
	Cancellation,
	Policies,
	PropertyListing,
	UploadPhotos,
	Utilities,
	VerifyProperty,
} from "@/components/become-a-host"

const components = [
	{
		label: "Property Information",
		subtitle: "Property Lisitng Process",
		components: [
			{ name: "Property Details", component: PropertyListing, icon: RiHome8Line },
			{ name: "Upload Photos", component: UploadPhotos, icon: RiUploadCloud2Line },
			{ name: "Verify Property", component: VerifyProperty, icon: RiVerifiedBadgeLine },
			{ name: "Utilities", component: Utilities, icon: RiWaterFlashLine },
		],
	},
	{
		label: "Apartment Rules and Regulations",
		subtitle: "Policy Information Process",
		components: [
			{ name: "House Rules", component: Policies, icon: RiHome8Line },
			{ name: "Cancellation", component: Cancellation, icon: RiCloseCircleLine },
		],
	},
]

const Page = () => {
	const [activeIndex, setActiveIndex] = React.useState(0)
	const [current, setCurrent] = React.useState(0)
	const [width, setWidth] = React.useState(0)
	const router = useRouter()

	const { propertyDetails, rules, uploadPhotos, utilities, verifyProperty, resetStore } =
		useCreateHostStore()

	const { isPending, mutateAsync } = useMutation({
		mutationFn: (payload: AddPropertyDto) => AddPropertyMutation(payload),
		mutationKey: ["create-apartment"],
		onSuccess: (data) => {
			toast.success(data.message)
			router.push("/dashboard/listings").then(() => {
				resetStore()
			})
		},
		onError: ({ response }: HttpError) => {
			console.error(response)
			const { message } = response.data
			toast.error(message)
		},
	})

	const handleNext = () => {
		if (current < components[activeIndex].components.length - 1) {
			setCurrent(current + 1)
		} else if (activeIndex < components.length - 1) {
			setActiveIndex(activeIndex + 1)
			setCurrent(0)
		} else {
			try {
				const payload: AddPropertyDto = {
					amenities: utilities.utilities,
					name: propertyDetails.name,
					description: propertyDetails.description,
					type: propertyDetails.propertyType,
					address: propertyDetails.address,
					city: propertyDetails.city,
					state: propertyDetails.state,
					country: "Nigeria",
					images: uploadPhotos.images,
					video: null,
					number_of_bedrooms: propertyDetails.bedrooms,
					number_of_bathrooms: propertyDetails.bathrooms,
					maximum_number_of_guests: rules.maxGuests,
					logitude: propertyDetails.longitude,
					latitude: propertyDetails.latitude,
					checkout_time: convertTime12to24(rules.checkOut),
					checkin_times: rules.checkIn,
					is_pet_allowed: rules.pets ? "YES" : "NO",
					number_of_pets_allowed: 0,
					is_age_limit: "YES",
					age_limit: 0,
					cancellation_and_repayment_conditions: "",
					cost_per_night: propertyDetails.price,
					cleaning_fee: propertyDetails.cleaningFee,
					service_charge: propertyDetails.serviceCharge,
					discount_percentage: 0,
					cover_photo: null,
					postal_code: Number(propertyDetails.postalCode),
					is_event_allowed: rules.events ? "YES" : "NO",
					smoking_allowed: rules.smoking ? "YES" : "NO",
					phography_allowed: rules.filming ? "YES" : "NO",
					custom_rules: rules.customRules,
					property_verification_type: verifyProperty.documentType,
					property_verification_file: verifyProperty.documentImages[0],
				}
				mutateAsync(payload)
			} catch (error) {
				console.error(error)
				return
			}
		}
	}

	const handlePrev = () => {
		if (current > 0) {
			setCurrent(current - 1)
		} else {
			setActiveIndex(activeIndex - 1)
			setCurrent(components[activeIndex - 1].components.length - 1)
		}
	}

	const handleGoTo = (activeIndex: number, targetIndex: number) => {
		setActiveIndex(activeIndex)
		setCurrent(targetIndex)
	}

	React.useEffect(() => {
		setWidth(Math.ceil(((activeIndex + 1) / components.length) * 100))
	}, [activeIndex])

	React.useEffect(() => {
		router.events.on("routeChangeStart", () => {
			resetStore()
		})
	}, [resetStore, router])

	const currentIteration = components[activeIndex]
	const { component: ActiveComponent } = currentIteration.components[current]

	return (
		<>
			<Seo title="Add Listing" />
			<Appbar />
			<main className="h-[calc(100vh-100px)] w-full overflow-hidden">
				<div className="flex h-full w-full flex-col gap-4 overflow-y-scroll px-8 py-5">
					<ActiveComponent
						active={currentIteration.components[current].name}
						activeIndex={activeIndex}
						components={currentIteration.components}
						handleGoTo={(index) => handleGoTo(activeIndex, index)}
						handleNext={handleNext}
						handlePrev={handlePrev}
						isLoading={isPending}
						isNotFirstOrLast={false}
						label={currentIteration.label}
						subtitle={currentIteration.subtitle}
						totalItems={components.length}
						width={width}
					/>
				</div>
			</main>
		</>
	)
}

export default Page
