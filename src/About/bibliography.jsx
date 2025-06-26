import BibliographyOnSiteList from "./biblioSiteList";
import BibliographyRecommendedList from "./biblioRecommendedList";

export default function Biblio() {
  return (
    <main>
      <h1 className="bibliography-heading">Bibliography</h1>
      <section className="bibliography-section">
        <h2 className="sources-title">Sources Used on this Site</h2>
        <BibliographyOnSiteList />
      </section>
      <section className="recommendations-section">
        <h2 className="recommendations-title">Recommendations for Further Learning</h2>
        <BibliographyRecommendedList />
      </section>
      <img
        src="https://catapultingintoclassical.wordpress.com/wp-content/uploads/2016/03/classicmusicbooks.jpg"
        alt="Books"
      />
    </main>
  );
}
