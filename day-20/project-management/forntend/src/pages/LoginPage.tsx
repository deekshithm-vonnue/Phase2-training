import { useState } from "react";
import Button from "../components/Button";
import "../styles/login.css";
import { authApi } from "../apiclient/authapi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
// import { authApi } from "../apiclient/authapi";

export function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [error, setError] = useState<Record<string, string>>({});

  const navigate = useNavigate();

  const { login } = useAuth();
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!email.trim()) {
      errors.email = "Email is empty";
    } else if (!email.trim().includes("@")) {
      errors.email = "Invalid email format";
    }

    if (!password.trim()) {
      errors.password = "Password is empty";
    }
    setError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = validateForm();
    if (!isValid) {
      return;
    }
    const loginData = { email: email, password: password };

    authApi.login(undefined, loginData).then((response) => {
      login(response.user, response.token, rememberMe);
      navigate("/projects");
    });
  };
  return (
    <div className="login-layout">
      <div className="form-container">
        Login
        <hr />
        <form className="form-layout" onSubmit={handleSubmit}>
          <div className="form-group-field">
            <label htmlFor="email">Email</label>
            <input
              placeholder="Email"
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="error-layout">{error.email}</div>

          <div className="form-group-field">
            <label htmlFor="password">Password</label>
            <input
              placeholder="Password"
              id="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <div className="error-layout">{error.password}</div>
          </div>

          <div className="remember-field">
            <input
              id="remember"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => {
                setRememberMe(e.target.checked);
              }}
            />
            <label htmlFor="remember">Remember Me</label>
          </div>
          <Button type="submit">Login</Button>
        </form>
      </div>
    </div>
  );
}
