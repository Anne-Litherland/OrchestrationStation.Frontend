import useQuery from "../api/useQuery";

export function BibliographyRecommendedList() {
  const {
    data: bibliography,
    loading,
    error,
  } = useQuery("/bibliography", bibliography);

  if (loading || !bibliography) return <p>Loading...</p>;
  if (error) return <p>Sorry! {error}</p>;

  const recommended = bibliography.filter(
    (source) => source.category == "Recommended"
  );

  return (
    <ul id="bibliographyOnSite">
      {recommended.map((source) => (
        <BibliographyListItem key={source.id} source={source} />
      ))}
    </ul>
  );
}

function BibliographyListItem({ source }) {
  <li className="source">
    <h4>{source.title}</h4>
    <p>
      <a href={source.url}>Link</a>
    </p>
    <p>
      {source.author}, {source.publication_year}
    </p>
  </li>;
}
