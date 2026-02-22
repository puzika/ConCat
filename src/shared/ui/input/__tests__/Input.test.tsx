/**
 * @jest-environment jsdom
 */

import "@testing-library/jest-dom/jest-globals";
import { it, describe, expect, beforeEach } from "@jest/globals";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "../Input";

describe("Input", () => {
  beforeEach(() => {
    render(
      <Input 
        name="password" 
        placeholder="password" 
        inputType="password"
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
})