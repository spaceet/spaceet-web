import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { format } from "date-fns"
// import Link from "next/link"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { BookingActions } from "@/components/dashboard/user"
import { formatCurrency, getInitials } from "@/lib"
import { Checkbox } from "@/components/ui/checkbox"
import { ReservationsProps } from "@/types"

export const reservationColumns: ColumnDef<ReservationsProps>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "apartment_name",
		header: "Apartment",
		cell: ({ row }) => {
			return (
				<div className="flex items-center gap-2">
					<Avatar className="size-10 bg-black">
						<AvatarFallback className="font-bold text-white">
							{getInitials(row.original.apartment_name)}
						</AvatarFallback>
					</Avatar>
					<div className="flex flex-col">
						<p className="font-medium capitalize">{row.original.apartment_name}</p>
						<p className="text-sm capitalize text-neutral-400">
							{row.original.apartment_city}, {row.original.apartment_state}
						</p>
					</div>
				</div>
			)
		},
	},
	{
		accessorKey: "reservation_checkin_date",
		header: "Check In",
		cell: ({ row }) => {
			return (
				<p className="font-medium">
					{format(new Date(row.original.reservation_checkin_date), "dd MMM, yyyy")}
				</p>
			)
		},
	},
	{
		accessorKey: "reservation_checkout_date",
		header: "Check Out",
		cell: ({ row }) => {
			return (
				<p className="font-medium">
					{format(new Date(row.original.reservation_checkout_date), "dd MMM, yyyy")}
				</p>
			)
		},
	},
	{
		accessorKey: "reservation_price_details.final_price",
		header: "Price",
		cell: ({ row }) => {
			return (
				<p className="font-medium">
					{formatCurrency(row.original.reservation_price_details.final_price, "NGN")}
				</p>
			)
		},
	},
	{
		accessorKey: "reservation_is_paid",
		header: "Payment",
		cell: ({ row }) => {
			return (
				<p
					className={`font-medium ${row.original.reservation_is_paid ? "text-green-500" : "text-red-500"}`}>
					{row.original.reservation_is_paid ? "Paid" : "Not Paid"}
				</p>
			)
		},
	},
	{
		accessorKey: "reservation_status",
		header: "Status",
		cell: ({ row }) => {
			const colors: Record<typeof row.original.reservation_status, string> = {
				CANCELLED: "bg-red-200 text-red-700",
				COMPLETED: "bg-green-200 text-green-700",
				CONFIRMED: "bg-blue-200 text-blue-700",
				PENDING: "bg-yellow-200 text-yellow-700",
			}

			return (
				<div
					className={`flex w-fit items-center justify-center rounded px-2 py-1 text-[10px] font-medium ${colors[row.original.reservation_status]}`}>
					{row.original.reservation_status}
				</div>
			)
		},
	},
	{
		id: "actions",
		cell: ({ row }) => {
			return (
				<Popover>
					<PopoverTrigger>
						<MoreHorizontal className="size-5" />
					</PopoverTrigger>
					{!row.original.reservation_is_paid ||
						(row.original.reservation_status === "PENDING" && (
							<PopoverContent className="w-[200px]">
								<BookingActions reservation={row.original} />
							</PopoverContent>
						))}
				</Popover>
			)
		},
	},
]
