import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Principles from '../components/sections/Principles';
import Projects from '../components/sections/Projects';
import Development from '../components/sections/Development';
import Contact from '../components/sections/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Principles />
      <Projects />
      <Development />
      <Contact />
    </>
  );
}
