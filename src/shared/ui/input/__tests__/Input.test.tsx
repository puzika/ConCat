import "@testing-library/jest-dom/jest-globals";
import { it, describe, expect, beforeEach } from "@jest/globals";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "../Input";

describe("Input", () => {
  beforeEach(() => {
    render(
      <Input 
        type="password"
        placeholder="password"
      />
    );
  })

  it("password should be hidden", () => {
    const inputField = screen.getByTestId("input-field");
    
    expect(inputField).toHaveAttribute("type", "password");
  })

  it("hide button should toggle password visibility", async () => {
    const user = userEvent.setup();
    const inputField = screen.getByTestId("input-field");
    const hideBtn = screen.getByTestId("hide-btn");

    await user.click(hideBtn);

    expect(inputField).toHaveAttribute("type", "text");

    await user.click(hideBtn);

    expect(inputField).toHaveAttribute("type", "password");
  })

  it("placeholder should move up on input", async () => {
    const user = userEvent.setup();
    const input = screen.getByTestId("input-field");
    const placeholder = screen.getByText(/password/i);

    expect(placeholder.classList.contains('filled')).toBe(false);

    await user.type(input, "something");

    expect(placeholder.classList.contains('filled')).toBe(true);
  })

  it("placeholder should move back down on clearing input", async () => {
    const user = userEvent.setup();
    const input = screen.getByTestId("input-field");
    const placeholder = screen.getByText(/password/i);

    await user.type(input, "something");

    expect(placeholder.classList.contains('filled')).toBe(true);

    await user.clear(input);

    expect(placeholder.classList.contains('filled')).toBe(false);
  })
})