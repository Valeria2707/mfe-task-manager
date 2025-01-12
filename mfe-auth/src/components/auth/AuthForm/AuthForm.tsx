import React, { useState } from "react";
import "./AuthForm.css";
import { login } from "../../../services/login";
import { signUp } from "../../../services/signup";
import { router } from "../../../router";

type AuthFormProps = {
  mode: "login" | "signup";
};

export default function AuthForm({ mode }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isLoginMode = mode === "login";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);

    const action = isLoginMode ? login : signUp;

    try {
      const result = await action(email, password);
      if (result.error) {
        setErrorMessage(
          result.error || "Something went wrong. Please try again."
        );
      } else {
        router.navigate({ to: "/" });
      }
    } catch (error) {
      setErrorMessage(
        (error as string) || "An unexpected error occurred. Please try again."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2 className="auth-form__title">{isLoginMode ? "Login" : "Sign Up"}</h2>

      {errorMessage && <div className="auth-form__error">{errorMessage}</div>}

      <div className="auth-form__group">
        <label htmlFor="email" className="auth-form__label">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="auth-form__input"
        />
      </div>

      <div className="auth-form__group">
        <label htmlFor="password" className="auth-form__label">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="auth-form__input"
        />
      </div>

      <button type="submit" className="auth-form__button">
        {isLoginMode ? "Login" : "Sign Up"}
      </button>

      <p className="auth-form__footer">
        {isLoginMode ? (
          <>
            Don’t have an account?{" "}
            <a href="/signup" className="auth-form__link">
              Sign Up
            </a>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <a href="/login" className="auth-form__link">
              Login
            </a>
          </>
        )}
      </p>
    </form>
  );
}
