import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/router"
import Cookies from "js-cookie"
import { toast } from "sonner"
import React from "react"

import { AddPropertyDto, AddPropertyMutation, BecomeAHostDto, BecomeAHostMutation } from "@/queries"
import { useCreateHostStore } from "@/components/become-a-host/store"
import { Appbar, Seo } from "@/components/shared"
import { convertTime12to24 } from "@/lib"
import { become_a_host } from "@/config"

const Page = () => {
	const [hasCreatedApartment, setHasCreatedApartment] = React.useState(false)
	const [hasCreatedHost, setHasCreatedHost] = React.useState(false)
	const [activeIndex, setActiveIndex] = React.useState(0)
	const [current, setCurrent] = React.useState(0)
	const [width, setWidth] = React.useState(0)
	const router = useRouter()

	const { isPending: isCreatingHost, mutateAsync: createHost } = useMutation({
		mutationFn: (payload: BecomeAHostDto) => BecomeAHostMutation(payload),
		mutationKey: ["create-host"],
		onSuccess: (data) => {
			toast.success(data.message)
			Cookies.set("IS_SPACEET_HOST", "true", {
				sameSite: "None",
				secure: true,
				expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days,
			})
			setHasCreatedHost(true)
		},
		onError: (error) => {
			console.error(error)
		},
	})

	const { isPending: isCreatingApartment, mutateAsync: createApartment } = useMutation({
		mutationFn: (payload: AddPropertyDto) => AddPropertyMutation(payload),
		mutationKey: ["create-apartment"],
		onSuccess: (data) => {
			toast.success(data.message)
			setHasCreatedApartment(true)
		},
		onError: (error) => {
			console.error(error)
		},
	})

	const {
		identityVerification,
		personalInformation,
		propertyDetails,
		rules,
		uploadPhotos,
		utilities,
		verifyProperty,
		resetStore,
	} = useCreateHostStore()

	const isFirstStep = activeIndex === 0 && current === 0
	const isLastStep =
		activeIndex === become_a_host.length - 1 &&
		current === become_a_host[activeIndex].components.length - 1

	const handleNext = async () => {
		if (activeIndex === 1 && current === 1 && !hasCreatedHost) {
			try {
				const payload: BecomeAHostDto = {
					...personalInformation,
					...identityVerification,
				}
				await createHost(payload)
			} catch (error) {
				console.error(error)
				return
			}
		}

		if (activeIndex === 3 && current === 1 && !hasCreatedApartment) {
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
				await createApartment(payload)
			} catch (error) {
				console.error(error)
				return
			}
		}
		if (current < become_a_host[activeIndex].components.length - 1) {
			setCurrent(current + 1)
		} else if (activeIndex < become_a_host.length - 1) {
			setActiveIndex(activeIndex + 1)
			setCurrent(0)
		} else {
			router.push("/dashboard").then(() => {
				resetStore()
			})
		}
	}

	const handlePrev = () => {
		if (hasCreatedHost && activeIndex <= 2) {
			return
		}
		if (hasCreatedApartment && activeIndex <= become_a_host.length - 2) {
			return
		}
		if (current > 0) {
			setCurrent(current - 1)
		} else {
			setActiveIndex(activeIndex - 1)
			setCurrent(become_a_host[activeIndex - 1].components.length - 1)
		}
	}

	const handleGoTo = (activeIndex: number, targetIndex: number) => {
		setActiveIndex(activeIndex)
		setCurrent(targetIndex)
	}

	const currentIteration = become_a_host[activeIndex]
	const { component: ActiveComponent } = currentIteration.components[current]

	React.useEffect(() => {
		setWidth(Math.ceil(((activeIndex + 1) / become_a_host.length) * 100))
	}, [activeIndex])

	React.useEffect(() => {
		router.events.on("routeChangeStart", () => {
			resetStore()
		})
	}, [resetStore, router])

	return (
		<>
			<Seo title="Become a Host" />
			<Appbar />
			<main className="h-[calc(100vh-100px)] w-full overflow-hidden">
				<div className="container mx-auto h-full overflow-y-scroll">
					<ActiveComponent
						active={currentIteration.components[current].name}
						activeIndex={activeIndex}
						components={currentIteration.components}
						handleGoTo={(index) => handleGoTo(activeIndex, index)}
						handleNext={handleNext}
						handlePrev={handlePrev}
						isLoading={isCreatingHost || isCreatingApartment}
						isNotFirstOrLast={isFirstStep || isLastStep}
						label={currentIteration.label}
						subtitle={currentIteration.subtitle}
						totalItems={become_a_host.length}
						width={width}
					/>
				</div>
			</main>
		</>
	)
}

export default Page
