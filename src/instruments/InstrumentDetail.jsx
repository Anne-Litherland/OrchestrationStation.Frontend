import { useNavigate, useParams } from "react-router";
import useQuery from "../api/useQuery";
import useMutation from "../api/useMutation";
import { useAuth } from "../auth/AuthContext";

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
        <h1>{instrumentData?.title || "Unnamed Instrumanet"}</h1>
        <p>Range: {instrumentData?.range || "Unknown"}</p>
        <p>{instrumentData?.description || "No description available."}</p>
        <figure>
          <img src={instrumentData?.coverimage} alt={instrumentData?.title} />
        </figure>
      </section>
      <section className="info">
        <h1>{instrumentData?.excerpts_solo || "Unnamed Instrumanet"}</h1>
        <p>Famous Musician: {instrumentData?.famous_musicians || "Unknown"}</p>
        <p>{instrumentData?.history || "No history available."}</p>
      </section>
      {token && (
        <section className="button">
          <AddToFavorite id={instrumentData.id} />
        </section>
      )}
    </>
  );
}

function AddToFavorite({ id }) {
  const navigate = useNavigate();
  const {
    mutate: likeInstrument,
    loading: adding,
    error: addError,
  } = useMutation("post", "/favorite_instrument", ["instrument", id]);

  const onLikeInstrument = async () => {
    try {
      await likeInstrument({ Id: id });
      navigate("/account");
    } catch (err) {
      console.error("failed:", err);
    }
  };

  return (
    <button onClick={onLikeInstrument} disabled={adding}>
      {adding ? "..." : "Add To Favorite"}
      {addError && <p>{addError}</p>}
    </button>
  );
}
