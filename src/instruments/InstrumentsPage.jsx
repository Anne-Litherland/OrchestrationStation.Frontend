import InstrumentsList from "./InstrumentsList.jsx";
import Feedback from "../userInput/feedback.jsx";

export default function InstrumentsPage() {
  return (
    <main>
      <h1>Catalog</h1>
      <InstrumentsList />
      <Feedback />
    </main>
  );
}
