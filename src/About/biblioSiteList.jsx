import useQuery from "../api/useQuery";

export default function BibliographyOnSiteList() {
  const {
    data: bibliography,
    loading,
    error,
  } = useQuery("/bibliography", bibliography);

  if (loading || !bibliography) return <p>Loading...</p>;
  if (error) return <p>Sorry! {error}</p>;

  const onSite = bibliography.filter(
    (source) => source.category === "Used on site"
  );

  return (
    <ul id="bibliographyOnSite">
      {onSite.map((source) => (
        <BibliographyListItem key={source.id} source={source} />
      ))}
    </ul>
  );
}

function BibliographyListItem({ source }) {
  return (
    <li className="source">
      <h4>{source.title}</h4>
      <p>
        <a href={source.url}>Link</a>
      </p>
      <p>
        {source.author}, {source.publication_year}
      </p>
    </li>
  );
}
