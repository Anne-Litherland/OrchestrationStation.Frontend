import { useNavigate, useParams } from "react-router";
import useQuery from "../api/useQuery";
import useMutation from "../api/useMutation";
import { useAuth } from "../auth/AuthContext";
import Comments from "../userInput/Comments";

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
      <section className="info">
        <h1>{instrumentData?.instrument_name || "Unnamed Instrumanet"}</h1>
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
        <h1>{instrumentData?.famous_excerpts || "Unnamed Instrumanet"}</h1>
        <p>Famous Musician: {instrumentData?.famous_musicians || "Unknown"}</p>
        <p>{instrumentData?.history || "No history available."}</p>
      </section>
      {token && (
        <section className="button">
          <AddToFavorite instrumentId={instrumentData?.id} />
        </section>
      )}
      <section>
        <Comments></Comments>
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
