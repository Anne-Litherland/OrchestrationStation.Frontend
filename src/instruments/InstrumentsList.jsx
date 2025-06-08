import useQuery from "../api/useQuery";
import { Link } from "react-router";

export default function InstrumentsList() {
  const {
    data: instruments,
    loading,
    error,
  } = useQuery("/instruments", "instruments");

  if (loading || !instruments) return <p>Loading...</p>;
  if (error) return <p>Sorry! {error}</p>;

  return (
    <ul id="instruments">
      {instruments.map((instrument) => (
        <InstrumentListItem key={instrument.id} instrument={instrument} />
      ))}
    </ul>
  );
}

function InstrumentListItem({ instrument }) {
  return (
    <li className="instrument">
      <figure className="center-children">
        <img src={instrument.coverimage} alt={instrument.title} />
      </figure>
      <div>
        <h2>
          <Link to={`/instruments/${instrument.id}`}>{instrument.title}</Link>
        </h2>
      </div>
    </li>
  );
}
