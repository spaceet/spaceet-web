import React from "react"

import { Appbar, Footer, Seo, Reviews } from "@/components/shared"
import { Button } from "@/components/ui/button"
import { mock_reviews } from "@/mock/reviews"
import { toast } from "sonner"
import Image from "next/image"
import diningImg from "../../../public/assets/images/dining.webp"
import bedroomImg from "../../../public/assets/images/bedroom.webp"
import dining_window from "../../../public/assets/images/dinning-beside-window.webp"
import cassandra from "../../../public/assets/images/cassandra-williams.webp"
import john from "../../../public/assets/images/john-niyon.webp"
import mary from "../../../public/assets/images/mary-chinozie.webp"
import { Input } from "@/components/ui/input"
import {RiQuestionnaireFill, RiLightbulbFlashLine, RiAsterisk } from "@remixicon/react"
import { Icon } from "lucide-react"


const EMAIL_REGEX =
	/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/



const Page = () => {

	const [email, setEmail] = React.useState("")

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (!email || !EMAIL_REGEX.test(email)) {
			toast.error("Please enter a valid email address")
			return
		}
	}
	return (
		<>
			<Seo title="About us" />
			<Appbar />
			<main className="w-full">
				<div className="place-tems-center grid h-[50vh] w-full bg-black/50 bg-hero-3 bg-cover bg-center bg-no-repeat bg-blend-overlay">
					<div className="container mx-auto flex items-center justify-between">
						<div className="flex w-[511px] flex-col gap-5 text-white">
							<h1 className="text-[64px] font-bold leading-[70px]">About Us</h1>
							<p className="text-xl">
								With so many choices, you might just become a fan of any city - even your rivals.
							</p>
							<Button className="h-[52px] w-[210px]">Learn more</Button>
						</div>
						<div></div>
					</div>
				</div>
				<section className="container mx-auto flex flex-col items-center justify-between gap-6 px-5 py-10 lg:flex-row lg:py-[120px]">
					<div className="w-full lg:w-[508px]">
						<p className="inline rounded-full border border-gray-300 px-3 py-1 text-sm text-gray-600">
							History
						</p>
						<h2 className="mb-5 mt-5 text-[32px] font-bold">Our Story</h2>
						<div className="text-sub-500 flex flex-col gap-5">
							<p className="text-[15px]">
								Spaceet was born out of a desire to make property hosting more accessible and efficient. We
								understand the challenges hosts face in managing bookings, guests, and properties, and we're
								here to provide the tools and support to help you succeed.
							</p>
							<p className="text-[15px]">
								Our mission is to empower property owners to become successful hosts by providing
								user-friendly tools and unparalleled support. We envision a world where hosting is simple,
								enjoyable, and profitable for everyone
							</p>
						</div>
						<div className="mt-5 flex">
							<div className="w-4/12">
								<h2 className="text-[24px] font-bold">2300</h2>
								<p>Hosts</p>
							</div>
							<div className="w-4/12">
								<h2 className="text-[24px] font-bold">10k +</h2>
								<p>Guests</p>
							</div>
							<div className="w-4/12">
								<h2 className="text-[24px] font-bold">5 Yrs</h2>
								<p>Of Service</p>
							</div>
						</div>
					</div>
					<div className="flex w-full justify-between lg:h-[494px] lg:w-[590px]">
						<div className="flex w-[48%] flex-col justify-between lg:w-[285px]">
							<div className="item-center flex h-2/5 h-[48%] w-full justify-center overflow-hidden rounded-[9px]">
								<Image src={bedroomImg} alt="Bedroom" className="h-full w-full object-cover" />
							</div>
							<div className="item-center flex h-2/5 h-[48%] w-full justify-center overflow-hidden rounded-[9px]">
								<Image src={diningImg} alt="Dinning area" className="h-full w-full object-cover" />
							</div>
						</div>
						<div className="flex w-[48%] flex-col overflow-hidden rounded-[9px] lg:w-[285px]">
							<Image src={dining_window} alt="Dinning area" className="h-full w-full object-cover" />
						</div>
					</div>
				</section>
				<section className="justify-center bg-neutral-900 px-5 py-10 text-neutral-100 lg:py-[120px]">
					<div className="container mx-auto text-center">
						<p className="inline rounded-full border border-neutral-600 px-4 py-2 text-sm">Our Vision</p>
						<h2 className="mb-5 mt-5 w-full text-[32px] font-bold">What We Stand For</h2>
						<p className="mx-auto w-full text-[16px] lg:w-[600px]">
							At Spaceet, we are committed to creating a seamless and supportive experience for property
							hosts. Our core values drive everything we do, from empowering hosts to grow their business,
							to fostering a community built on trust, innovation, and success.
						</p>
					</div>

					<div className="container mt-6 flex w-full flex-col gap-5 lg:w-[1000px] lg:flex-row">
						<div className="w-full rounded-[5px] border border-neutral-600 px-6 py-4">
							<Image src={RiAsterisk}/>
							<h2 className="mb-2">Simplicity</h2>
							<p className="text-[13px]">We believe in making hosting as easy as possible</p>
						</div>
						<div className="w-full rounded-[5px] border border-neutral-600 px-6 py-4">
							<Image src={RiQuestionnaireFill} />
							<h2 className="mb-2">Support</h2>
							<p className="text text-[13px]">We're here for our hosts at every step of the journey</p>
						</div>
						<div className="w-full rounded-[5px] border border-neutral-600 px-6 py-4">
							<Image src={RiLightbulbFlashLine} />
							<h2 className="mb-2">Innovation</h2>
							<p className="text-[13px]">We continuously improve to stay ahead of the hosting game</p>
						</div>
					</div>
				</section>
				<section className="container mx-auto justify-center px-5 py-10 lg:py-[100px]">
					<div className="text-center">
						<p className="border-neutral-500: mx-auto inline rounded-full border px-4 py-2 text-center text-sm">
							Our Team
						</p>
						<h2 className="mb-5 mt-5 text-[32px] font-bold">Our Team</h2>
						<p className="mx-auto mt-5 w-full text-[16px] lg:w-[750px]">
							Our team is the backbone of Mofesi, combining diverse expertise to deliver exceptional
							service. Each member is committed to continuous improvement and up-to-date industry
							standards.
						</p>
					</div>
					<div className="w-full mt-8 mx-auto grid grid-cols-1 lg:grid-cols-3 gap-7 lg:justify-between">
						<div className="w-[100%] lg:w-[100%]">
							<div className="h-[450px] w-full mx-auto rounded-[9px] bg-neutral-300 overflow-hidden mb-5">
								<Image src={john} alt="john niyon" className="h-full w-full object-center object-cover"/>
							</div>
							<h3 className="text-[24px]">John Niyon</h3>
							<p className="text-[16px]">Founder</p>
						</div>
						<div className="w-[100%] lg:w-[100%]">
							<div className="h-[450px] w-full mx-auto rounded-[9px] bg-neutral-300 overflow-hidden mb-5">
								<Image src={mary} alt="john niyon" className="h-full w-full object-center object-cover"/>
							</div>
							<h3 className="text-[24px]">Mary Chinozie</h3>
							<p className="text-[16px]">Service Manager</p>
						</div>
						<div className="w-[100%] lg:w-[100%]">
							<div className="h-[450px] w-full mx-auto rounded-[9px] bg-neutral-300 overflow-hidden mb-5">
								<Image src={cassandra} alt="john niyon" className="h-full w-full object-top object-cover scale-150 mt-[-40px] ml-[20px]"/>
							</div>
							<h3 className="text-[24px]">Cassandra Williams</h3>
							<p className="text-[16px]">Customer Manager</p>
						</div>
						<div className="w-[100%] lg:w-[100%]">
							<div className="h-[450px] w-full mx-auto rounded-[9px] bg-neutral-300 overflow-hidden mb-5">
								<Image src={john} alt="john niyon" className="h-full w-full object-center object-cover"/>
							</div>
							<h3 className="text-[24px]">John Niyon</h3>
							<p className="text-[16px]">Founder</p>
						</div>
						<div className="w-[100%] lg:w-[100%]">
							<div className="h-[450px] w-full mx-auto rounded-[9px] bg-neutral-300 overflow-hidden mb-5">
								<Image src={mary} alt="john niyon" className="h-full w-full object-center object-cover"/>
							</div>
							<h3 className="text-[24px]">Mary Chinozie</h3>
							<p className="text-[16px]">Service Manager</p>
						</div>
						<div className="w-[100%] lg:w-[100%]">
							<div className="h-[450px] w-full mx-auto rounded-[9px] bg-neutral-300 overflow-hidden mb-5">
								<Image src={cassandra} alt="john niyon" className="h-full w-full object-top object-cover scale-150 mt-[-40px] ml-[20px]"/>
							</div>
							<h3 className="text-[24px]">Cassandra Williams</h3>
							<p className="text-[16px]">Customer Manager</p>
						</div>
					</div>
				</section>
				<section className="bg-[#f5f5f5] px-5 py-16 lg:px-0 lg:py-[120px]">
					<div className="flex w-full flex-col gap-16">
						<div className="container mx-auto flex flex-col gap-5">
							<div className="w-fit rounded-full bg-white px-4 py-2 text-sm text-black">Testimonials</div>
							<div className="flex w-full flex-col items-center lg:flex-row lg:justify-between">
								<h2 className="w-full text-xl font-medium leading-[46px] text-black lg:w-[433px] lg:text-[42px]">
									What people are saying about us
								</h2>
								<p className="w-full text-sm text-black lg:w-[414px] lg:text-xl">
									Whether you&apos;re a small startup or a multinational corporation, let us be your trusted
									advisor on the path to success.
								</p>
							</div>
						</div>
						<Reviews reviews={mock_reviews} />
					</div>
				</section>
				<section className="grid h-[350px] w-full place-items-center bg-black/50 bg-footer bg-cover bg-center px-4 bg-blend-overlay lg:h-[600px] lg:px-0">
					<div className="flex h-full w-full max-w-[496px] flex-col items-center justify-center gap-5 text-center">
						<div className="flex w-full flex-col items-center gap-2 lg:gap-5">
							<h2 className="text-2xl font-bold leading-7 text-white lg:text-[64px] lg:leading-[70px]">
								Get Latest Listing Updates
							</h2>
							<p className="text-sm text-white lg:text-xl">
								With so many choices, you just might become a fan of any city - even your rivals.
							</p>
						</div>
						<form onSubmit={handleSubmit} className="flex w-full flex-col items-center gap-2 lg:flex-row">
							<Input
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="Enter your email"
								innerClassName="bg-white"
							/>
							<Button type="submit" className="w-full lg:w-fit">
								Subscribe
							</Button>
						</form>
					</div>
				</section>
			</main>
			<Footer />
		</>
	)
}

export default Page


// this is for new branch