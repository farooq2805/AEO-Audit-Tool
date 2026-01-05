
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Product from './pages/Product';
import AeoChecker from './pages/AeoChecker';
import HowItWorks from './pages/HowItWorks';
import Pricing from './pages/Pricing';
import UseCases from './pages/UseCases';
import Education from './pages/Education';
import About from './pages/About';
import Contact from './pages/Contact';
import { NavigationPaths } from './types';

const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path={NavigationPaths.HOME} element={<Home />} />
        <Route path={NavigationPaths.PRODUCT} element={<Product />} />
        <Route path={NavigationPaths.AEO_CHECKER} element={<AeoChecker />} />
        <Route path={NavigationPaths.HOW_IT_WORKS} element={<HowItWorks />} />
        <Route path={NavigationPaths.PRICING} element={<Pricing />} />
        <Route path={NavigationPaths.USE_CASES} element={<UseCases />} />
        <Route path={NavigationPaths.EDUCATION} element={<Education />} />
        <Route path={NavigationPaths.ABOUT} element={<About />} />
        <Route path={NavigationPaths.CONTACT} element={<Contact />} />
      </Routes>
    </Layout>
  );
};

export default App;
