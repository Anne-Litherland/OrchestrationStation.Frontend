import { useParams } from "react-router";
import useQuery from "../api/useQuery";
import { Link } from "react-router";

export default function InstrumentsList() {
  const {
    data: instruments,
    loading,
    error,
  } = useQuery(`/instruments`, "instruments");

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
        <img src={instrument.image_url} alt={instrument.instrument_name} />
      </figure>
      <div>
        <h2>
          <Link to={`/instruments/${instrument.id}`}>
            {instrument.instrument_name}
          </Link>
        </h2>
      </div>
    </li>
  );
}
