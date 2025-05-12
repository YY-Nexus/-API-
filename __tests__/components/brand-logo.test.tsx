import { render, screen, fireEvent } from "@testing-library/react"
import { BrandLogo } from "@/components/brand-logo"

describe("BrandLogo Component", () => {
  it("renders full logo by default", () => {
    render(<BrandLogo />)
    expect(screen.getByText("言语云³")).toBeInTheDocument()
    expect(screen.getByText("YanYu Cloud³")).toBeInTheDocument()
  })

  it("renders only icon when variant is icon", () => {
    render(<BrandLogo variant="icon" />)
    expect(screen.queryByText("言语云³")).not.toBeInTheDocument()
    expect(screen.queryByText("YanYu Cloud³")).not.toBeInTheDocument()
  })

  it("renders only text when variant is text", () => {
    render(<BrandLogo variant="text" />)
    expect(screen.getByText("言语云³")).toBeInTheDocument()
    expect(screen.queryByText("YanYu Cloud³")).not.toBeInTheDocument()
  })

  it("applies custom className", () => {
    const { container } = render(<BrandLogo className="test-class" />)
    expect(container.firstChild).toHaveClass("test-class")
  })

  it("applies animation class when animation prop is provided", () => {
    const { container } = render(<BrandLogo animation="pulse" />)
    const logoElement = container.querySelector(".logo-pulse")
    expect(logoElement).toBeInTheDocument()
  })

  it("applies hover effect on mouse enter and leave", () => {
    const { container } = render(<BrandLogo />)
    const logoContainer = container.querySelector(".logo-container")

    fireEvent.mouseEnter(logoContainer!)
    let logoElement = container.querySelector(".logo-pulse")
    expect(logoElement).toBeInTheDocument()

    fireEvent.mouseLeave(logoContainer!)
    logoElement = container.querySelector(".logo-pulse")
    expect(logoElement).not.toBeInTheDocument()
  })
})
