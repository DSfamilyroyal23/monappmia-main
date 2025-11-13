import React from 'react';

const products = [
  { id: 1, name: 'Article élégant', price: '49.99€', image: 'https://via.placeholder.com/300x200.png?text=Produit+1' },
  { id: 2, name: 'Produit moderne', price: '79.99€', image: 'https://via.placeholder.com/300x200.png?text=Produit+2' },
  { id: 3, name: 'Accessoire chic', price: '29.99€', image: 'https://via.placeholder.com/300x200.png?text=Produit+3' },
  { id: 4, name: 'Gadget innovant', price: '129.99€', image: 'https://via.placeholder.com/300x200.png?text=Produit+4' },
  { id: 5, name: 'Vêtement tendance', price: '89.99€', image: 'https://via.placeholder.com/300x200.png?text=Produit+5' },
  { id: 6, name: 'Objet design', price: '149.99€', image: 'https://via.placeholder.com/300x200.png?text=Produit+6' },
];

function ProductList() {
  return (
    <div>
      <div className="p-5 mb-4 bg-light rounded-3">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold">Bienvenue dans notre boutique</h1>
          <p className="col-md-8 fs-4">Découvrez notre collection exclusive d'articles sélectionnés pour vous.</p>
        </div>
      </div>
      <div className="row">
        {products.map(product => (
          <div key={product.id} className="col-lg-4 col-md-6 mb-4">
            <div className="card h-100">
              <img src={product.image} className="card-img-top" alt={product.name} />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.price}</p>
              </div>
              <div className="card-footer">
                <button className="btn btn-primary w-100">Ajouter au panier</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;