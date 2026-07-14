import Navbar from '../../components/navbar/Navbar';
import Hero from '../../components/Hero/Hero';
import Role from '../../components/Role/Role';
import AboutMe from '../../components/AboutMe/AboutMe';
import PortfolioShowcase from '../../components/portfolioShowcase/PortfolioShowcase';
import Contact from '../../components/Contact/Contact';

function Homepage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Role />
      <AboutMe />
      <PortfolioShowcase />
      <Contact />
    </>
  );
}

export default Homepage;
