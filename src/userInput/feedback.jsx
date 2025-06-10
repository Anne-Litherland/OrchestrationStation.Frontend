import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../auth/AuthContext";

export default function Feedback() {
  const navigate = useNavigate();
  const { token } = useAuth();

  const [error, setError] = useState(null);
  const onSubmit = async (formData) => {
    const username = formData.get("username");
    const message = formData.get("message");
    try {
      await onSubmit({ username, message });
      navigate("/");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <form action={onSubmit}>
      <label>
        Username
        <input type="text" name="username" />
      </label>
      <label>
        Message
        <input type="text" name="message" id="textbox" required />
      </label>
      <button>Submit</button>
      {error && <output>{error}</output>}
    </form>
  );
}
