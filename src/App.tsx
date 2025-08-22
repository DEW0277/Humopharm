import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/shared/Header.js';
import Hero from './components/shared/Hero.js';
import AboutSection from './components/shared/AboutSection.js';
import Certificates from './components/shared/Certificates.js';
import Products from './components/shared/Products.js';
import Contact from './components/shared/Contact.js';
import Footer from './components/shared/Footer.js';
import ProductPageDetails from './components/shared/ProductPageDetails.js';

function App() {
  return (
    <Router>
      <div className='font-montserrat'>
        <Routes>
          <Route
            path='/'
            element={
              <>
                <Header />
                <Hero />
                <AboutSection />
                <Certificates />
                <Products />
                <Contact />
                <Footer />
              </>
            }
          />
          <Route
            path='/product/:id'
            element={
              <>
                <Header />
                <ProductPageDetails />
                <Footer />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
