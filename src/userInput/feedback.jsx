import { useState } from "react";
import { useNavigate } from "react-router";

export default function Feedback() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
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
    <form onSubmit={handleSubmit}>
      <label>
        Username
        <input type="text" name="username" required />
      </label>
      <br></br>
      <label>
        Message
        <textarea type="text" name="message" id="textbox" required />
      </label>
      <button type="submit">Submit</button>
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
