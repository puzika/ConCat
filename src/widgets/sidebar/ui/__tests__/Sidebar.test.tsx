import "@testing-library/jest-dom/jest-globals";
import { it, describe, expect, beforeAll, beforeEach, afterAll, afterEach } from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react";
import { Sidebar } from "../Sidebar";
import { QueryWrapper } from "../../../../shared/lib/utils/queryTestWrapper";
import { server } from "../../../../shared/api/mocks/server";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Sidebar", () => {
  let sidebarChats: HTMLElement;
  let sidebarScrollBtn: HTMLElement;

  beforeEach(async () => {
    render(
      <QueryWrapper>
        <Sidebar />
      </QueryWrapper>
    );
    
    sidebarChats = await screen.findByTestId("sidebar-chats");
    sidebarScrollBtn = await screen.findByTestId("scroll-btn");
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