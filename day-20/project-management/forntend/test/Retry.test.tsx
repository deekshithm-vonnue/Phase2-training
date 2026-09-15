import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { afterEach, describe, expect, it, vi } from "vitest";
import Retry from "../src/components/Retry";

describe("Retry Component", () => {
  afterEach(() => {
    cleanup();
  });
  it("renders the error message accurately", () => {
    const errorMessage = "Network connection failed";

    render(<Retry error={errorMessage} />);

    expect(
      screen.getByText(/error:\s*network connection failed/i),
    ).toBeInTheDocument();
  });

  it('renders the "Try Again" button using its accessibel role', () => {
    render(<Retry error="Test error " />);

    const button = screen.getByRole("button", { name: /try again/i });
    expect(button).toBeInTheDocument();
  });

  it("calls the refetch function when the cutton is clicked", async () => {
    const refetchMock = vi.fn();

    render(<Retry error="Test error" refetch={refetchMock} />);

    const button = screen.getByRole("button", { name: /try again/i });

    await fireEvent.click(button);

    expect(refetchMock).toHaveBeenCalledTimes(1);
  });
});
