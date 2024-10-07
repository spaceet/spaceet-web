import React from "react"
import {
	RiCalendarCheckLine,
	RiHome8Line,
	RiHotelBedLine,
	RiHotelLine,
	RiMessage2Line,
	RiPsychotherapyLine,
	RiQuestionnaireLine,
	RiSettingsLine,
} from "@remixicon/react"

import { normalized } from "@/lib"

export const useAppHeader = (pathname: string) => {
	const handleHeaderChange = (pathname: string) => {
		const normalizedPathname = normalized(pathname)
		switch (normalizedPathname) {
			case "/dashboard":
				return <AppDashboardHeader />
			case "/dashboard/calendar":
				return <AppCalendarHeader />
			case "/dashboard/listings":
				return <AppListingsHeader />
			case "/dashboard/reservations":
				return <AppReservationsHeader />
			case "/dashboard/messages":
				return <AppMessagesHeader />
			case "/dashboard/help-center":
				return <AppHelpCenterHeader />
			case "/dashboard/language-and-translation":
				return <AppLanguageHeader />
			case "/dashboard/settings":
				return <AppSettingsHeader />
			default:
				return <AppDashboardHeader />
		}
	}

	const header = React.useMemo(() => {
		return handleHeaderChange(pathname)
	}, [pathname])

	return header
}

const AppDashboardHeader = () => {
	return (
		<div className="hidden items-center gap-3 lg:flex">
			<div className="grid size-12 place-items-center rounded-full bg-neutral-200">
				<RiHome8Line size={32} />
			</div>
			<h3 className="text-2xl font-medium">Dashboard</h3>
		</div>
	)
}

const AppCalendarHeader = () => {
	return (
		<div className="hidden items-center gap-3 lg:flex">
			<div className="grid size-12 place-items-center rounded-full bg-neutral-200">
				<RiCalendarCheckLine size={32} />
			</div>
			<h3 className="text-2xl font-medium">Calendar</h3>
		</div>
	)
}

const AppListingsHeader = () => {
	return (
		<div className="hidden items-center gap-3 lg:flex">
			<div className="grid size-12 place-items-center rounded-full bg-neutral-200">
				<RiHotelBedLine size={32} />
			</div>
			<h3 className="text-2xl font-medium">Listings</h3>
		</div>
	)
}

const AppReservationsHeader = () => {
	return (
		<div className="hidden items-center gap-3 lg:flex">
			<div className="grid size-12 place-items-center rounded-full bg-neutral-200">
				<RiHotelLine size={32} />
			</div>
			<h3 className="text-2xl font-medium">Reservations</h3>
		</div>
	)
}

const AppMessagesHeader = () => {
	return (
		<div className="hidden items-center gap-3 lg:flex">
			<div className="grid size-12 place-items-center rounded-full bg-neutral-200">
				<RiMessage2Line size={32} />
			</div>
			<h3 className="text-2xl font-medium">Messages</h3>
		</div>
	)
}

const AppHelpCenterHeader = () => {
	return (
		<div className="hidden items-center gap-3 lg:flex">
			<div className="grid size-12 place-items-center rounded-full bg-neutral-200">
				<RiQuestionnaireLine size={32} />
			</div>
			<h3 className="text-2xl font-medium">Help Center</h3>
		</div>
	)
}

const AppLanguageHeader = () => {
	return (
		<div className="hidden items-center gap-3 lg:flex">
			<div className="grid size-12 place-items-center rounded-full bg-neutral-200">
				<RiPsychotherapyLine size={32} />
			</div>
			<h3 className="text-2xl font-medium">Language & Translation</h3>
		</div>
	)
}

const AppSettingsHeader = () => {
	return (
		<div className="hidden items-center gap-3 lg:flex">
			<div className="grid size-12 place-items-center rounded-full bg-neutral-200">
				<RiSettingsLine size={32} />
			</div>
			<h3 className="text-2xl font-medium">Settings</h3>
		</div>
	)
}
