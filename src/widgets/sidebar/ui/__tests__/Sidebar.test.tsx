import "@testing-library/jest-dom/jest-globals";
import { it, describe, expect, beforeEach } from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react";
import { Sidebar } from "../Sidebar";

describe("Sidebar", () => {
  let sidebarChats: HTMLElement;
  let sidebarScrollBtn: HTMLElement;

  beforeEach(() => {
    render(<Sidebar />);

    sidebarChats = screen.getByTestId("sidebar-chats");
    sidebarScrollBtn = screen.getByTestId("scroll-btn");
    Object.defineProperty(sidebarChats, 'offsetHeight', { configurable: true, value: 1000 });
  })

  it("scroll-to-top button should be invisible", () => {
    expect(sidebarScrollBtn).not.toBeVisible();

    Object.defineProperty(sidebarChats, 'scrollTop', { configurable: true, value: 500 });
    fireEvent.scroll(sidebarChats);

    expect(sidebarScrollBtn).not.toBeVisible();
  })

  it("scroll-to-top button should be visible", () => {
    Object.defineProperty(sidebarChats, 'scrollTop', { configurable: true, value: 501 });
    fireEvent.scroll(sidebarChats);

    expect(sidebarScrollBtn).toBeVisible();
  })
})