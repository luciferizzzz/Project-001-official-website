import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import { useReveal } from './hooks/useReveal';

export default function App() {
  useReveal();

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <Navbar />
      <main id="main" tabIndex={-1}>
        <Home />
      </main>
      <Footer />
    </>
  );
}
