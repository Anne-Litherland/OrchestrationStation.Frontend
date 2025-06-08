import useMutation from "../api/useMutation";
import useQuery from "../api/useQuery";
import { Link } from "react-router";

export default function Account() {
  const { data: userData, error, loading } = useQuery("/users/me", "me");

  const isFavorite = userData?.favorites.length > 0;

  if (loading) return <p>Loading account details...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!userData) return <p>No user data available</p>;
  return (
    <>
      <h1>Welcome, {userData.username}!</h1>
      <p>Your email on file with us is {userData?.email}.</p>
      <h2>Your reservations</h2>
      {isFavorite ? (
        <ul>
          {userData.favorites.map((instrument) => (
            <li key={instrument.id}>
              <strong>{instrument.title}</strong>
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
    mutate: notinterestedInstrument,
    error,
    loading,
  } = useMutation("DELETE", "/favorites/" + id, ["users", "me"]);

  return (
    <button onClick={() => notinterestedInstrument()}>
      {loading ? "Deleting" : error ?? "Not Interested Instrument"}
    </button>
  );
}
