import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { NotFound } from "../src/components/NotFound";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/vitest";
describe("NotFound component", () => {
  it("should render the not found with link to back to project", () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { name: /404/i })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /back to project/i }),
    ).toBeInTheDocument();
  });
});
