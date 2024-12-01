import { useFormik } from "formik"
import Image from "next/image"
import { toast } from "sonner"
import React from "react"

import { getFileExtension, getFileSizeInMb, getImageDimensions } from "@/lib"
import { Textarea } from "@/components/ui/textarea"
import { PhoneInput } from "@/components/shared"
import { defaultAvatar } from "@/assets/images"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useUserStore } from "@/store/z-store"
import { states } from "@/config"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"

const allowedExtensions = /jpeg|jpg|png|svg|webp/i

const Profile = () => {
	const [previewUrl, setPreviewUrl] = React.useState<string | null>(null)
	const input = React.useRef<HTMLInputElement>(null)
	const { user } = useUserStore()

	const initialValues = {
		address: user?.address || "",
		bio: user?.bio || "",
		city: user?.city || "",
		first_name: user?.first_name || "",
		image: null,
		last_name: user?.last_name || "",
		phone_number: user?.phone_number || "",
		state: "",
	}

	const handleClick = () => {
		if (input.current) {
			input.current.click()
		}
	}

	const { handleChange, handleSubmit, setFieldValue, values } = useFormik({
		initialValues,
		onSubmit: (values) => {
			console.log(values)
		},
	})

	const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) return
		const file = e.target.files[0]
		const ext = getFileExtension(file)
		if (!allowedExtensions.test(ext)) {
			toast.error("Invalid file type. Please upload a JPEG, PNG, SVG or WebP image")
			return
		}
		const fileSize = getFileSizeInMb(file)
		if (fileSize > 5) {
			toast.error("File size should be less than 5MB")
			return
		}
		const { height, width } = await getImageDimensions(file)
		if (height < 400 || width < 400) {
			toast.error(
				"Image resolution is too low. Please upload an image with a resolution of at least 400px"
			)
			return
		}
		setFieldValue("image", file)
	}

	React.useEffect(() => {
		if (values.image) {
			const reader = new FileReader()
			reader.onload = () => {
				setPreviewUrl(reader.result as string)
			}
			reader.readAsDataURL(values.image)
		}
	}, [values.image])

	return (
		<form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
			<div className="flex w-full flex-col items-center justify-between gap-6 rounded-xl border p-6 lg:flex-row lg:gap-6">
				<div className="flex flex-col items-center gap-3 lg:flex-row">
					<div className="relative size-16 rounded-full border">
						<Image
							src={previewUrl ? previewUrl : defaultAvatar}
							alt="image"
							fill
							sizes="(max-width: 1024px)100%"
							className="rounded-full object-cover"
						/>
					</div>
					<div className="flex flex-col">
						<p className="font-semibold">Profile Image</p>
						<p className="text-sm text-neutral-400">Min. 400x400px, PNG or JPEG</p>
					</div>
				</div>
				<label htmlFor="image-upload" className="w-fit">
					<input
						ref={input}
						type="file"
						accept="image/*"
						multiple={false}
						id="image-upload"
						className="hidden"
						onChange={handleImage}
					/>
					<Button type="button" onClick={handleClick} className="w-full lg:w-fit" variant="outline">
						Upload Image
					</Button>
				</label>
			</div>
			<div className="flex w-full flex-col gap-4 rounded-xl border p-6">
				<div className="grid w-full grid-cols-2 gap-4">
					<Input
						name="first_name"
						onChange={handleChange}
						label="First Name"
						placeholder="First Name"
						required
					/>
					<Input
						name="last_name"
						onChange={handleChange}
						label="Last Name"
						placeholder="Last Name"
						required
					/>
				</div>
				<PhoneInput
					name="phone_number"
					label="Phone Number"
					onPhoneNumberChange={(value) => setFieldValue("phone_number", value)}
					placeholder="8080808080"
					required
				/>
				<div className="grid w-full grid-cols-2 gap-4">
					<div className="w-full">
						<Label htmlFor="state">State</Label>
						<Select value={values.state} onValueChange={(value) => setFieldValue("state", value)}>
							<SelectTrigger>
								<SelectValue placeholder="Select a state" />
							</SelectTrigger>
							<SelectContent>
								{states.map((state) => (
									<SelectItem key={state.value} value={state.value}>
										{state.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					<div className="w-full">
						<Label htmlFor="city">City</Label>
						<Select value={values.state} onValueChange={(value) => setFieldValue("state", value)}>
							<SelectTrigger>
								<SelectValue placeholder="Select a City" />
							</SelectTrigger>
							<SelectContent>
								{states.map((state) => (
									<SelectItem key={state.value} value={state.value}>
										{state.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</div>
				<Input
					name="address"
					onChange={handleChange}
					label="Home Address"
					placeholder="Enter your home address"
					required
				/>
				<Textarea
					name="bio"
					onChange={handleChange}
					label="Enter Bio"
					placeholder="Enter your description here"
					required
				/>
				<div className="mt-10 grid w-full grid-cols-2 gap-4 lg:mt-0 lg:grid-cols-3">
					<Button type="button" variant="ghost" className="col-span-2 text-red-700 lg:col-span-1">
						Delete Account
					</Button>
					<div className="col-span-2 grid grid-cols-2 gap-4 border-t py-7 lg:border-none lg:py-0">
						<Button type="reset" variant="outline">
							Reset Changes
						</Button>
						<Button type="submit">Save Changes</Button>
					</div>
				</div>
			</div>
		</form>
	)
}

export default Profile
