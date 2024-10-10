import * as Yup from "yup"

import { apartment_types } from "@/config"
import {
	DocumentFormProps,
	IdentityFormProps,
	ProfileFormProps,
	PropertyFormProps,
	RulesFormProps,
	UploadFormProps,
} from "./form-components"

export const DocumentValidationSchema: Yup.ObjectSchema<DocumentFormProps> = Yup.object({
	documentImages: Yup.array()
		.of(Yup.mixed<File>().defined())
		.required("Please upload at least 1 image!")
		.min(1, "Please upload at least 1 image!")
		.max(5, "You can only upload 5 images!"),
	documentType: Yup.string().required("Please select a document type!"),
})

export const IdentityValidationSchema: Yup.ObjectSchema<IdentityFormProps> = Yup.object({
	idExpiry: Yup.string().required("Please enter your ID expiry date!"),
	idImages: Yup.array()
		.of(Yup.mixed<File>().defined())
		.required("Please upload at least 2 images!")
		.min(2, "Please upload at least 2 images!"),
	idNumber: Yup.string().required("Please enter your ID number!"),
	idType: Yup.string().required("Please select your ID type!"),
})

export const ProfileValidationSchema: Yup.ObjectSchema<ProfileFormProps> = Yup.object({
	address: Yup.string().required("Please enter your address!"),
	bio: Yup.string().required("Please enter your bio!"),
	city: Yup.string().required("Please select your city of residency!"),
	first_name: Yup.string().required("Please enter your first name!"),
	image: Yup.mixed<File>().defined("Please select a profile photo!"),
	last_name: Yup.string().required("Please enter your last name!"),
	phoneNumber: Yup.string()
		.required("Please enter your phone number!")
		.matches(
			/^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/,
			"Please enter a valid phone number!"
		),
	state: Yup.string().required("Please select your state of residency!"),
})

export const PropertyValidationSchema: Yup.ObjectSchema<PropertyFormProps> = Yup.object({
	address: Yup.string().required("Please enter the property address!"),
	bathrooms: Yup.number()
		.required("Please enter the number of bathrooms!")
		.min(1, "Please enter a valid number!"),
	bedrooms: Yup.number()
		.required("Please enter the number of bedrooms!")
		.min(1, "Please enter a valid number!"),
	city: Yup.string().required("Please select the city of the property!"),
	description: Yup.string().required("Please enter the property description!"),
	name: Yup.string().required("Please enter the property title!"),
	price: Yup.number().required("Please enter the price per night!"),
	propertyType: Yup.string()
		.oneOf(apartment_types, undefined)
		.required("Please select the property type!"),
	serviceCharge: Yup.number().required("Please enter the service charge!"),
	state: Yup.string().required("Please select the state of the property!"),
	postalCode: Yup.string(),
})

export const RulesValidationSchema: Yup.ObjectSchema<RulesFormProps> = Yup.object({
	checkIn: Yup.array().of(Yup.string().defined()).required("Please enter at least 1 rule!"),
	checkOut: Yup.string().required("Please enter the check-out time!"),
	customRules: Yup.array().of(Yup.string().defined()).required("Please enter at least 1 rule!"),
	events: Yup.boolean().required("Please select if events are allowed!"),
	filming: Yup.boolean().required("Please select if filming/photography is allowed!"),
	maxGuests: Yup.number()
		.required("Please enter the maximum number of guests!")
		.min(2, "Please enter a valid number!"),
	pets: Yup.boolean().required("Please select if pets are allowed!"),
	quietHours: Yup.boolean().required("Please select if quiet hours are allowed!"),
	smoking: Yup.boolean().required("Please select if smoking is allowed!"),
})

export const UploadValidationSchema: Yup.ObjectSchema<UploadFormProps> = Yup.object({
	images: Yup.array()
		.of(Yup.mixed<File>().defined())
		.required("Please upload at least 5 images!")
		.min(5, "Please upload at least 5 images!")
		.max(30, "You can only upload 30 images!"),
})

export const UtilitiesValidationSchema = Yup.object({
	utilities: Yup.array()
		.of(Yup.string())
		.min(1, "Please select at least 1 utility!")
		.defined()
		.required("Utilities field is required"),
})
