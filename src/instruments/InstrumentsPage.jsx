import InstrumentsList from "./InstrumentsList.jsx";
import { Link } from "react-router";
import { useAuth } from "../auth/AuthContext.jsx";

export default function InstrumentsPage() {
  const { token } = useAuth();
  return (
    <main>
      <h1>Catalog</h1>
      <InstrumentsList />
      {token ? (
        <form>
          <label>
            Username
            <input type="text" name="username" />
          </label>
          <label>
            Message
            <input type="text" name="feedback" />
          </label>
          <button>Submit</button>
          {error && <output>{error}</output>}
        </form>
      ) : (
        <Link to="/register" id="link">
          Sign up to send us a message!
        </Link>
      )}
    </main>
  );
}
