import { render, screen } from "@testing-library/react"
import Page from "@/pages/index"
import React from "react"

describe("Page", () => {
	render(<Page />)
	const heading = screen.getAllByRole("heading")
	expect(heading).toBeInTheDocument()
	expect(heading).toHaveTextContent("Spaceet")
})

it("renders the Appbar and Footer components", () => {
	render(<Page />)
	const appbar = screen.getByRole("menubar")
	const footer = screen.getByRole("contentinfo")
	expect(appbar).toBeInTheDocument()
	expect(footer).toBeInTheDocument()
})
