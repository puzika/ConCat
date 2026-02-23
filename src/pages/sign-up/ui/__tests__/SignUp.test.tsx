import "@testing-library/jest-dom/jest-globals";
import { describe, it, beforeEach, expect } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { SignUpPage } from "../SignUp";

describe("Sign-up", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <SignUpPage />
      </MemoryRouter>
    )
  })

  it("spinner should appear in sign up button upon submission", async () => {
    const user = userEvent.setup();
    const username = screen.getByTestId("username");
    const email = screen.getByTestId('email');
    const password = screen.getByTestId('password');
    const confirmPassword = screen.getByTestId('confirmPassword');
    const submitBtn = screen.getByTestId('submit-btn');

    await user.type(username, "something");
    await user.type(email, "something@gmail.com");
    await user.type(password, "somethingSomewhere123");
    await user.type(confirmPassword, "somethingSomewhere123");
    await user.click(submitBtn);

    const spinner = screen.getByTestId("spinner");

    expect(spinner).toBeInTheDocument();
  })
})