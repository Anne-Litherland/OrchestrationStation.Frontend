import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../auth/AuthContext";
import { API } from "../api/ApiContext";

export default function Feedback() {
  const [message, setMessage] = useState(null);
  const { token, userId } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const content = formData.get("content");
    try {
      await postFeedback({ user_id: userId, content: content });
    } catch (e) {
      setMessage(e.message);
    }
  };

  return (
    <>
      {token && (
        <form onSubmit={handleSubmit} id="feedback">
          <label className="message">
            Leave us a message!
            <textarea type="text" name="content" id="textbox" required />
          </label>
          <button type="submit">Submit</button>
          {message && <output>{message}</output>}
        </form>
      )}
    </>
  );

  async function postFeedback(feedbackData) {
    const res = await fetch(API + "/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(feedbackData),
    });
    const result = await res.text();

    if (!res.ok) {
      let errorMessage = "Failed to submit feedback.";
      try {
        const errorData = await res.json();
        errorMessage = errorData.message || errorMessage;
      } catch (e) {
        const errorText = await res.text();
        console.error("Server returned non-JSON:", errorText);
      }
      setMessage(errorMessage);
      throw new Error(errorMessage);
    } else {
      setMessage("We've received your feedback!");
    }
  }
}
