import Feedback from "../userInput/feedback";
import { useAuth } from "../auth/AuthContext";
import { Link } from "react-router";


export default function About() {
  const { token } = useAuth();
  return (
    <main id="about">
      <section className="about-section">
        <h2 className="about-heading">About Orchestration Station</h2>
        <p className="about-description">
          Orchestration Station is an interactive web app that allows users to
          make profiles, save their favorite instruments and interact with other
          musicians. Any scores that can be found here are freely available.
        </p>
        <h3 className="about-title">About the Developers</h3>
        <h4 className="about-developer">Anne Litherland</h4>
        <p>
          Annie is a certified nursing assistant with an interest in music,
          movies, and web development. Her favorite instrument is the violin and
          she has played violin since 2011. She attended Cleveland State
          University with a focus on biology and health sciences.
        </p>
        <h4 className="about-developer">Fred Clark</h4>
        <p>Fred possesses a passion for music, education, and technology. 
          Primarily performing on trombone and guitar, he also plays various other instruments 
          and enjoys incorporating diverse musical interests into his performances. 
          Additionally, he is a budding programmer, solving problems with code and creating 
          innovative solutions. Driven by curiosity and a desire to learn, he constantly 
          explores new hobbies and expands his skills and perspectives. 
          Current obsessions: game design and knitting.
</p>
        <h4 className="about-developer">Matt Weber</h4>
        <p>
          Matt Weber is a math and language arts educator, musician (piano /
          voice / composition / songwriting), and, as of the end of 2024, a
          coder and web developer. His favorite instruments are the piano, alto
          saxophone, and cello. He enjoys reading, gaming, going to concerts,
          and sailing. Matt currently lives in Cleveland, Ohio, but has
          previously resided in Boston, Princeton, New York City, and
          Providence.
        </p>
        <h4 className="about-developer">Ali Samadi</h4>
        <p>
          Ali Samadi is a materials science engineer and, by the end of June
          2025, a full-stack web developer with a strong background in
          commercial and industrial products and international trade. Born and
          raised in Iran, he developed a passion for technology and
          problem-solving early on. After completing Fullstack Academy's web
          development program, he expanded his skillset to build modern web
          applications, including Orchestration Station. His favorite instrument
          is the violin. Ali now lives in Oklahoma City and enjoys hiking,
          playing, soccer with friends, and exploring nature in his free time.
        </p>
      </section>
      <img src="/images/neckGuitar.jpg" alt="Multi-guitar" id="img1" />
      <img src="/images/onemanband.jpg" alt="One Man Band" id="img2" />
      <img src="/images/skeletonCello.jpg" alt="Skeleton Cello" id="img3" />
      <img src="/images/otamatone.webp" alt="Otamatone" id="img4" />
      <Feedback />
    </main>
  );
}
