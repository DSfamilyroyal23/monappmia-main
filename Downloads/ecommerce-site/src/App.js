import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import ProductList from './components/ProductList';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="container py-4">
          <Routes>
            <Route path="/" element={<ProductList />} />
            {/* On peut ajouter d'autres routes ici, ex: /produits, /panier */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;