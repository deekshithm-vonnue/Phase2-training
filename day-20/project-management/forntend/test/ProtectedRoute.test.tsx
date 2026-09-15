import { afterEach, describe, expect, it, vi } from "vitest";
import { useAuth } from "../src/context/useAuth";
import { cleanup, render, screen } from "@testing-library/react";
import ProtectedRoute from "../src/components/ProtectedRoute";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import "@testing-library/jest-dom/vitest";

vi.mock("../src/context/useAuth", () => ({
  useAuth: vi.fn(),
}));

describe("ProtectedRoute Component", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("renders the loading state using its accessible role", () => {
    vi.mocked(useAuth).mockReturnValue({
      isAuthenticated: false,
      isLoading: true,
      user: null,
      login: vi.fn(),
      logout: vi.fn(),
    });
    render(
      <MemoryRouter>
        <ProtectedRoute />
      </MemoryRouter>,
    );

    const loadingComponent = screen.getByRole("status", {
      name: /loading page content/i,
    });

    expect(loadingComponent).toBeInTheDocument();
  });

  it("redirects unauthoarized users to the login page", () => {
    vi.mocked(useAuth).mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      user: null,
      login: vi.fn(),
      logout: vi.fn(),
    });

    render(
      <MemoryRouter initialEntries={["/projects"]}>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/projects" element={<div>All projects</div>} />
          </Route>
          <Route path="/login" element={<h1>login page</h1>} />
        </Routes>
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { name: /login page/i }),
    ).toBeInTheDocument();

    expect(screen.queryByText("All projects")).not.toBeInTheDocument();
  });

  it("renders the outle conten if the user is authenticated", () => {
    vi.mocked(useAuth).mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      user: { email: "deekshith@gmail.com", id: "123", name: "Deekshith" },
      login: vi.fn(),
      logout: vi.fn(),
    });

    render(
      <MemoryRouter initialEntries={["/projects"]}>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/projects" element={<div>All projects</div>} />
          </Route>
          <Route path="/login" element={<h1>login page</h1>} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText("All projects")).toBeInTheDocument();
  });
});
