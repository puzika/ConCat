import "@testing-library/jest-dom/jest-globals";
import { describe, it, beforeEach, expect } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { SignInPage } from "../SignIn";

describe("Sign-in", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <SignInPage />
      </MemoryRouter>
    )
  })

  it("spinner should appear in sign in button upon submission", async () => {
    const user = userEvent.setup();
    const email = screen.getByTestId('email');
    const password = screen.getByTestId('password');
    const submitBtn = screen.getByTestId('submit-btn');

    await user.type(email, "something@gmail.com");
    await user.type(password, "somethingSomewhere123");
    await user.click(submitBtn);

    const spinner = screen.getByTestId("spinner");

    expect(spinner).toBeInTheDocument();
  })
})