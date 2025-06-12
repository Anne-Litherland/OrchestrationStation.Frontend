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
        <p>----------</p>
        <h4>Fred Clark</h4>
        <p>----------</p>
        <h4>Matt Weber</h4>
        <p>----------</p>
        <h4>Ali Samadi</h4>
        <p>----------</p>
      </section>
      <img src="otamatone.webp" alt="smiley face instrument" id="img1" />
      <img src="onemanband.jpg" alt="one man band" id="img2" />
      <img
        src="funny-musical-instruments-predicaments-657180b326844__700.jpg"
        alt="skeleton cello"
        id="img3"
      />
      <img src="a98118_4972437_12neckguitar2.jpg" alt="mega-guitar" id="img4" />
      {token ? (
        <Feedback />
      ) : (
        <Link to="/register" id="link">
          Sign up to send us a message!
        </Link>
      )}
    </main>
  );
}
