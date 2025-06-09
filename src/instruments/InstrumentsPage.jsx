import InstrumentsList from "./InstrumentsList.jsx";
import { useAuth } from "../auth/AuthContext.jsx";
import Feedback from "../userInput/feedback.jsx";

export default function InstrumentsPage() {
  const { token } = useAuth();
  return (
    <main>
      <h1>Catalog</h1>
      <InstrumentsList />
      <Feedback />
    </main>
  );
}
