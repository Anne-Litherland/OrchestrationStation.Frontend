import useMutation from "../api/useMutation";
import useQuery from "../api/useQuery";
import { Link } from "react-router";

export default function Account() {
  const { data: userData, error, loading } = useQuery("/account", "me");

  const isFavorite = userData?.favorites.length > 0;

  if (loading) return <p>Loading account details...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!userData) return <p>No user data available</p>;
  return (
    <>
      <h1>Welcome, {userData.username}!</h1>
      <p>Your email on file with us is {userData.username}.</p>
      <h2>Your favorites</h2>
      {isFavorite ? (
        <ul>
          {userData.favorites.map((instrument) => (
            <li key={instrument.id}>
              <strong>{instrument.instrument_name}</strong>
                <img
                  src={instrument.image_url}
                  alt={instrument.instrument_name}
                ></img>
              <Return id={instrument.id} />
            </li>
          ))}
        </ul>
      ) : (
        <p>
          You have not become interested in any musical instrument yet. Browse
          our <Link to="/instruments">catalog!</Link>
        </p>
      )}
    </>
  );
}
function Return({ id }) {
  const {
    mutate: removeFvorite,
    error,
    loading,
  } = useMutation("DELETE", `/favorites/${id}`, ["me"]);

  return (
    <button onClick={() => removeFvorite()}>
      {loading ? "Deleting" : error ?? "Not Interested Instrument"}
    </button>
  );
}
