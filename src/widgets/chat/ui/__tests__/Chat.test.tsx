import "@testing-library/jest-dom/jest-globals";
import { it, describe, expect, beforeEach } from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react";
import { Chat } from "../Chat";
import { TestWrapper } from "../../../../shared/lib/utils/queryTestWrapper";
import userReducer from "../../../../entities/user";

describe("Chat", () => {
  let chatMessages: HTMLElement;
  let chatScrollBtn: HTMLElement;

  beforeEach(() => {
    render(<TestWrapper reducers={{userReducer}}><Chat /></TestWrapper>);

    chatMessages = screen.getByTestId("chat-messages");
    chatScrollBtn = screen.getByTestId("scroll-btn");
    Object.defineProperty(chatMessages, 'offsetHeight', { configurable: true, value: 1000 });
  })

  it("scroll-to-bottom button should be invisible", () => {
    expect(chatScrollBtn).not.toBeVisible();

    Object.defineProperty(chatMessages, 'scrollTop', { configurable: true, value: -500 });
    fireEvent.scroll(chatMessages);

    expect(chatScrollBtn).not.toBeVisible();
  })

  it("scroll-to-bottom button should be visible", () => {
    Object.defineProperty(chatMessages, 'scrollTop', { configurable: true, value: -501 });
    fireEvent.scroll(chatMessages);

    expect(chatScrollBtn).toBeVisible();
  })
})