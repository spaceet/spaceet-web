import React from "react"

import { cn } from "@/lib"

interface TabPanelProps
	extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	children: React.ReactNode
	tabValue: string | number
	selectedTab: string | number
}

const TabPanel = React.forwardRef<HTMLDivElement, TabPanelProps>(
	({ children, className, tabValue, selectedTab, ...props }, ref) => {
		return (
			<div
				role="tabpanel"
				hidden={tabValue !== selectedTab}
				id={`simple-tabpanel-${tabValue}`}
				aria-labelledby={`simple-tab-${tabValue}`}
				{...props}
				ref={ref}>
				{tabValue === selectedTab && <div className={cn("h-full w-full", className)}>{children}</div>}
			</div>
		)
	}
)

TabPanel.displayName = "TabPanel"

export { TabPanel }
