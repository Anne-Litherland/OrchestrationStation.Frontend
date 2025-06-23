import BibliographyOnSiteList from "./biblioSiteList";
import BibliographyRecommendedList from "./biblioRecommendedList";

export default function Biblio() {
  return (
    <main>
      <h1>Bibliography</h1>
      <section>
        <h2>Sources Used on this Site</h2>
        <BibliographyOnSiteList />
      </section>
      <section>
        <h2>Recommendations for Further Learning</h2>
        <BibliographyRecommendedList />
      </section>
      <img
        src="https://catapultingintoclassical.wordpress.com/wp-content/uploads/2016/03/classicmusicbooks.jpg"
        alt="Books"
      />
    </main>
  );
}
