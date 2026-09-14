import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Form from "../src/components/Form";
import "@testing-library/jest-dom/vitest";

describe("Issue form compoenet", () => {
  const mockOnClose = vi.fn();
  const mockOnAddIssue = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    vi.setSystemTime(new Date("2026-09-14"));
  });

  afterEach(() => {
    cleanup();
  });
  it("should show validation error on submitting a empty form", async () => {
    const user = userEvent.setup();

    render(<Form onClose={mockOnClose} onAddIssue={mockOnAddIssue} />);
    const button = screen.getByRole("button", { name: /add issue/i });
    await user.click(button);

    expect(screen.getByText(/title is required/i)).toBeInTheDocument();
    expect(screen.getByText(/description is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Please assign this issue/i)).toBeInTheDocument();
    expect(screen.getByText(/due date is missing/i)).toBeInTheDocument();
    expect(screen.getByText(/select a valid label/i)).toBeInTheDocument();
  });

  it("should show error on submittijng a form with past date", async () => {
    const user = userEvent.setup();

    render(<Form onClose={mockOnClose} onAddIssue={mockOnAddIssue} />);

    const dateInput = screen.getByLabelText(/due date/i);
    await user.type(dateInput, "2026-09-10");

    const submitBtn = screen.getByRole("button", { name: /add issue/i });
    await user.click(submitBtn);

    expect(screen.getByText(/past/i)).toBeInTheDocument();
  });

  it("should trigger onClose when clicking the 'X' button", async () => {
    const user = userEvent.setup();

    render(<Form onClose={mockOnClose} onAddIssue={mockOnAddIssue} />);

    const closeBtn = screen.getByRole("button", { name: /X/i });
    await user.click(closeBtn);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("should submit the form successfully with vaild input", async () => {
    const user = userEvent.setup();
    render(<Form onClose={mockOnClose} onAddIssue={mockOnAddIssue} />);

    await user.type(screen.getByLabelText(/title/i), "Fix sidebar bug");
    await user.type(
      screen.getByLabelText(/description/i),
      "sidebar overlay is not going",
    );
    await user.type(screen.getByLabelText(/assignee/i), "deekshith");

    await user.type(screen.getByLabelText(/due date/i), "2026-09-19");

    await user.selectOptions(screen.getByLabelText(/priority/i), "Urgent");
    await user.selectOptions(screen.getByLabelText(/status/i), "Pending");
    await user.selectOptions(screen.getByLabelText(/label/i), "Bug");

    const submitBtn = screen.getByRole("button", { name: /add issue/i });
    await user.click(submitBtn);

    expect(mockOnAddIssue).toHaveBeenCalledTimes(1);
    expect(mockOnAddIssue).toHaveBeenCalledWith({
      title: "Fix sidebar bug",
      description: "sidebar overlay is not going",
      assignedTo: "deekshith",
      priority: "Urgent",
      status: "Pending",
      dueDate: new Date("2026-09-19"),
      label: "Bug",
    });
  });
});
