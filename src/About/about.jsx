import Feedback from "../userInput/feedback";
import { useAuth } from "../auth/AuthContext";
import { Link } from "react-router";

export default function About() {
  const { token } = useAuth();
  return (
    <main>
      <h2>About Orchestration Station</h2>
      {token ? (
        <Feedback />
      ) : (
        <Link to="/register" id="link">
          Sign up to send us a message!
        </Link>
      )}
    </main>
  );
}
