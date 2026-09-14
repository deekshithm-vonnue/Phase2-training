import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Sidebar from "../src/components/Sidebar";
import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";
describe("SideBar Component", () => {
  const mockHandleClose = vi.fn();

  const renderSideBar = (isOpen = true) => {
    return render(
      <MemoryRouter initialEntries={["/"]}>
        <Sidebar isOpen={isOpen} handleClose={mockHandleClose} />
      </MemoryRouter>,
    );
  };

  beforeEach(() => {
    mockHandleClose.mockClear();
  });

  afterEach(() => {
    cleanup();
  });

  it("applies correct CSS class based on isOpen prop", () => {
    const { rerender } = renderSideBar(true);
    let sidebarContainer = screen.getByRole("navigation").parentElement;
    expect(sidebarContainer).toHaveClass("sidebar", "open");
    expect(sidebarContainer).not.toHaveClass("close");

    rerender(
      <MemoryRouter initialEntries={["/"]}>
        <Sidebar isOpen={false} handleClose={mockHandleClose} />
      </MemoryRouter>,
    );

    sidebarContainer = screen.getByRole("navigation").parentElement;
    expect(sidebarContainer).toHaveClass("close");
    expect(sidebarContainer).not.toHaveClass("open");
  });

  it("renders all navigation links", () => {
    renderSideBar(true);

    expect(screen.getByRole("link", { name: /projects/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /issues/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /profile/i })).toBeInTheDocument();
  });

  it("clicking a link chnage doucment title and triggers handleClose", async () => {
    const user = userEvent.setup();
    renderSideBar();

    const projectsLink = screen.getByRole("link", { name: /projects/i });
    await user.click(projectsLink);

    expect(mockHandleClose).toHaveBeenCalledTimes(1);

    expect(document.title).toBe("Projects");
  });
});
