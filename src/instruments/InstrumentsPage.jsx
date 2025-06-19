import InstrumentsList from "./InstrumentsList.jsx";
import CommentsList from "../userInput/CommentsList.jsx";

export default function InstrumentsPage() {
  return (
    <main>
      <h1>Catalog</h1>
      <InstrumentsList />
      <section>
        <CommentsList></CommentsList>
      </section>
    </main>
  );
}
