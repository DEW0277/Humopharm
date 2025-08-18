import Header from './components/shared/Header.js';
import Hero from './components/shared/Hero.js';
import AboutSection from './components/shared/AboutSection.js';
import Certificates from './components/shared/Certificates.js';
import Products from './components/shared/Products.js';
import Contact from './components/shared/Contact.js';
import Footer from './components/shared/Footer.js';

function App() {
  return (
    <div className='font-montserrat'>
      <Header />
      <Hero />
      <AboutSection />
      <Certificates />
      <Products />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
