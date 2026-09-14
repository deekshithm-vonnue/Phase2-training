import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { LoginPage } from "../src/pages/LoginPage";
import "@testing-library/jest-dom/vitest";
import { MemoryRouter } from "react-router-dom";
import { authApi } from "../src/apiclient/authapi";
import userEvent from "@testing-library/user-event";

const { mockLogin, mocKNavigate } = vi.hoisted(() => {
  return {
    mockLogin: vi.fn(),
    mocKNavigate: vi.fn(),
  };
});

vi.mock("../src/apiclient/authapi", () => ({
  authApi: {
    login: vi.fn(),
  },
}));

vi.mock("../src/context/useAuth", () => ({
  useAuth: () => ({
    login: mockLogin,
  }),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mocKNavigate,
  };
});

describe("Login Page", () => {
  afterEach(() => {
    cleanup();
  });

  it("should show error on submitting an empty form", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );

    const submitButtom = screen.getByRole("button", { name: /login/i });
    await user.click(submitButtom);

    expect(screen.getByText(/email is empty/i)).toBeInTheDocument();
    expect(screen.getByText(/password is empty/i)).toBeInTheDocument();
    expect(authApi.login).not.toHaveBeenCalled();
  });

  it("should show validation error for invalid email format", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );

    await user.type(screen.getByLabelText("Email"), "invalidemail");
    await user.type(screen.getByLabelText("Password"), "12345678");

    const submitButtom = screen.getByRole("button", { name: /login/i });
    await user.click(submitButtom);

    expect(screen.getByText(/Invalid email format/i)).toBeInTheDocument();
    expect(authApi.login).not.toHaveBeenCalled();
  });

  it("should log in and navigate to projects on successful form submission", async () => {
    const user = userEvent.setup();

    const mockUser = { id: "1", email: "deekshith", name: "deekshith" };
    const mockToken = "fake-jwt-token";
    vi.mocked(authApi.login).mockResolvedValue({
      user: mockUser,
      token: mockToken,
    });

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );

    await user.type(screen.getByLabelText("Email"), "deeku@gmail.com");
    await user.type(screen.getByLabelText("Password"), "12345678");
    await user.click(screen.getByLabelText("Remember Me"));

    const submitButtom = screen.getByRole("button", { name: /login/i });
    await user.click(submitButtom);

    expect(authApi.login).toHaveBeenCalledWith(undefined, {
      email: "deeku@gmail.com",
      password: "12345678",
    });

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith(mockUser, mockToken, true);
      expect(mocKNavigate).toHaveBeenCalledWith("/projects");
    });
  });
});
