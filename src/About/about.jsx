import Feedback from "../userInput/feedback";
import { useAuth } from "../auth/AuthContext";
import { Link } from "react-router";

export default function About() {
  const { token } = useAuth();
  return (
    <main id="about">
      <section>
        <h2>About Orchestration Station</h2>
        <p>
          Orchestration Station is an interactive web app that allows users to
          make profiles, save their favorite instruments and interact with other
          musicians. Any scores that can be found here are freely available.
        </p>
        <h3>About the Developers</h3>
        <h4>Anne Litherland</h4>
        <p>
          Annie is a certified nursing assistant with an interest in music,
          movies, and web development. Her favorite instrument is the violin and
          she has played violin since 2011. She attended Cleveland State
          University with a focus on biology and health sciences.
        </p>
        <h4>Fred Clark</h4>
        <p>----------</p>
        <h4>Matt Weber</h4>
        <p>
          Matt Weber is a math and language arts educator, musician (piano /
          voice / composition / songwriting), and, as of the end of 2024, a
          coder and web developer. His favorite instruments are the piano, alto
          saxophone, and cello. He enjoys reading, gaming, going to concerts,
          and sailing. Matt currently lives in Cleveland, Ohio, but has
          previously resided in Boston, Princeton, New York City, and
          Providence.
        </p>
        <h4>Ali Samadi</h4>
        <p>----------</p>
      </section>
      <img
        src="/photos/onemanband.jpg"
        alt="smiley face instrument"
        id="img1"
      />
      <img src="/photos/otamatone.webp" alt="one man band" id="img2" />
      <img
        src="/photos/funny-musical-instruments-predicaments-657180b326844__700.jpg"
        alt="skeleton cello"
        id="img3"
      />
      <img
        src="/photos/a98118_4972437_12neckguitar2.jpg"
        alt="mega-guitar"
        id="img4"
      />
      {token ? (
        <Feedback />
      ) : (
        <footer>
          <Link to="/register" id="link">
            Sign up to send us a message!
          </Link>
        </footer>
      )}
    </main>
  );
}
