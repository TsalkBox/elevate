import { render, screen } from "@testing-library/react"
import { Button } from "../components/button"

describe("Button", () => {
  it("renders with default variant", () => {
    render(<Button>Click me</Button>)
    const button = screen.getByRole("button", { name: /click me/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute("data-slot", "button")
  })

  it("renders with custom className", () => {
    render(<Button className="custom-class">Styled</Button>)
    const button = screen.getByRole("button", { name: /styled/i })
    expect(button.className).toContain("custom-class")
  })

  it("forwards additional props", () => {
    render(<Button disabled>Disabled</Button>)
    const button = screen.getByRole("button", { name: /disabled/i })
    expect(button).toBeDisabled()
  })
})
