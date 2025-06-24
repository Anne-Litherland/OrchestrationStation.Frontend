import { useState } from "react";
import { Link, useNavigate } from "react-router";

import { useAuth } from "./AuthContext";

/** A form that allows users to register for a new account */
export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const onRegister = async (formData) => {
    const username = formData.get("username");
    const password = formData.get("password");
    const email = formData.get("email");
    try {
      await register({ username, password, email });
      navigate("/register");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      <h2>Register for an account</h2>
      <form action={onRegister}>
        <label>
          Username:
          <input type="text" name="username" />
        </label>
        <label>
          Email:
          <input type="text" name="email" />
        </label>
        <label>
          Password:
          <input type="password" name="password" required />
        </label>
        <button>Register</button>
        {error && <output>{error}</output>}
      </form>
      <Link to="/login" id="link">
        Already have an account? Log in here.
      </Link>
    </>
  );
}
