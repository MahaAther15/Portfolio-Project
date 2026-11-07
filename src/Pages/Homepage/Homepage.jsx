import Navbar from '../../components/navbar/Navbar';
import Hero from '../../components/Hero/Hero';
import PortfolioShowcase from '../../components/portfolioShowcase/PortfolioShowcase';
import Role from '../../components/Role/Role';
import AboutMe from '../../components/AboutMe/AboutMe';
import Contact from '../../components/Contact/Contact';
import { useLenisScroll } from '../../hooks/useLenisScroll';

function Homepage() {
  useLenisScroll();

  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <PortfolioShowcase />
        <Role />
        <AboutMe />
        <Contact />
      </main>
    </>
  );
}

export default Homepage;
