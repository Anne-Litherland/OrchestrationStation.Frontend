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

  if (queryLoading) return <p>Loading instrumentdata...</p>;
  if (queryError) return <p>Error: {queryError}</p>;
  return (
    <>
      <main id="details">
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
          <h2>Famous Excerpts</h2>
          {instrumentData?.excerpts.length > 0 ? (
            <ul>
              {instrumentData.excerpts.map((ex, idx) => (
                <li key={idx}>
                  <a href={ex.famous_excerpts} id="link">
                    {ex.famous_excerpts}
                  </a>{" "}
                  <a href={ex.score_url} id="link">
                    (Score)
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p>No excerpts available.</p>
          )}
        </section>
        <section className="info">
          <h2>Famous Musicians</h2>
          {instrumentData?.musicians.length > 0 ? (
            <ul>
              {instrumentData.musicians.map((m, idx) => (
                <li key={idx}>
                  <a href={m.famous_musicians_url} id="link">
                    {m.famous_musicians}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p>No famous musicians available.</p>
          )}
        </section>
        <section className="info">
          <h2>History</h2>
          {instrumentData?.history && (
            <a href={instrumentData.history} id="link">
              History
            </a>
          )}
          {!instrumentData?.history && "No history available."}
        </section>
        {token && (
          <section className="button">
            <AddToFavorite instrumentId={instrumentData?.id} />
          </section>
        )}
      </main>
      <section className="comments">
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
