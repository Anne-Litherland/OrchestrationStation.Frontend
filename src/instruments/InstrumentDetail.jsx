import { useNavigate, useParams } from "react-router";
import useQuery from "../api/useQuery";
import useMutation from "../api/useMutation";
import { useAuth } from "../auth/AuthContext";
import CommentsList from "../userInput/CommentsList";

export default function InstrumentDetail() {
  const { id } = useParams();
  const { token } = useAuth();

  const {
    data: instrumentData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(`/instruments/${id}`, ["instrument"]);

  if (queryLoading) return <p>Loading instrument data...</p>;
  if (queryError) return <p>Error: {queryError}</p>;
  return (
    <>
      <section className="info">
        <h1>{instrumentData?.instrument_name || "Unnamed Instrument"}</h1>
        <p>Range: {instrumentData?.range || "Unknown"}</p>
        <p>{instrumentData?.description || "No description available."}</p>
        <figure>
          <img
            src={instrumentData?.image_url}
            alt={instrumentData?.instrument_name}
          />
        </figure>
      </section>
      <section className="info">
        <h1>{instrumentData?.excerpts || "No excerpts available."}</h1>
        <p>Famous Musicians: {instrumentData?.musicians || "Unknown"}</p>
        {instrumentData?.history && (
          <a href={instrumentData.history}>History</a>
        )}
        {!instrumentData?.history && "No history available."}
      </section>
      {token && (
        <section className="button">
          <AddToFavorite instrumentId={instrumentData?.id} />
        </section>
      )}
      <section>
        <CommentsList id={id}></CommentsList>
      </section>
    </>
  );
}

function AddToFavorite({ instrumentId }) {
  const navigate = useNavigate();
  const {
    mutate: likeInstrument,
    loading: adding,
    error: addError,
  } = useMutation("post", `/instruments/${instrumentId}/favorite`, ["me"]);

  const onLikeInstrument = async () => {
    try {
      await likeInstrument({ instrumentId });
      navigate("/account");
    } catch (err) {
      console.error("failed:", err);
    }
  };

  return (
    <>
      <button onClick={onLikeInstrument} disabled={adding}>
        {adding ? "..." : "Add To Favorite"}
      </button>
      {addError && <p>{addError}</p>}
    </>
  );
}
