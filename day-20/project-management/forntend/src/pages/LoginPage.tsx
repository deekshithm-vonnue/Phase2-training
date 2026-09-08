import { useState } from "react";
import Button from "../components/Button";
import "../styles/login.css";

export function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<Record<string, string>>({});
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
          <Button type="submit">Login</Button>
        </form>
      </div>
    </div>
  );
}
