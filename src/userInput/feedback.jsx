import { useState } from "react";
import { useNavigate } from "react-router";

export default function Feedback() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const onSubmit = async (formData) => {
    const username = formData.get("username");
    const message = formData.get("message");
    try {
      await submit({ username, message });
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
        <input type="text" name="message" required />
      </label>
      <button>Submit</button>
      {error && <output>{error}</output>}
    </form>
  );
}
async function submit({ username, message }) {
  const res = await fetch("/api/feedback", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, message }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to submit feedback.");
  }
}
