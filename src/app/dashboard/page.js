'use client';
import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', quantidade: '', preco: '', descricao: '' });
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products');
      if (!response.ok) {
        throw new Error('Erro ao carregar produtos');
      }
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError('Erro ao carregar produtos');
      console.error(err);
    }
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        ...newProduct,
        quantidade: parseInt(newProduct.quantidade, 10),
        preco: parseFloat(newProduct.preco),
      };

      const method = editMode ? 'PUT' : 'POST';
      const endpoint = editMode ? `http://localhost:5000/api/products/${currentProduct.id}` : 'http://localhost:5000/api/products';
      
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error('Erro ao adicionar/atualizar produto');
      }

      const addedProduct = await response.json();
      if (editMode) {
        setProducts(products.map((product) => (product.id === addedProduct.id ? addedProduct : product)));
      } else {
        setProducts((prevProducts) => [...prevProducts, addedProduct]);
      }

      resetForm();
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  const handleEditProduct = (product) => {
    setEditMode(true);
    setCurrentProduct(product);
    setNewProduct({ name: product.name, quantidade: product.quantidade.toString(), preco: product.preco.toString(), descricao: product.descricao });
    setShowForm(true);
  };

  const handleDeleteProduct = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'DELETE',
      });
      setProducts(products.filter((product) => product.id !== id));
    } catch (err) {
      setError('Erro ao deletar produto');
      console.error(err);
    }
  };

  const resetForm = () => {
    setNewProduct({ name: '', quantidade: '', preco: '', descricao: '' });
    setShowForm(false);
    setEditMode(false);
    setCurrentProduct(null);
  };

  const totalProducts = products.length;
  const totalquantidade = products.reduce((total, product) => total + product.quantidade, 0);

  return (
    <div className="container mx-auto mt-4">
      <h1 className="text-center text-3xl font-bold mb-4">Dashboard de Estoque</h1>
      {error && <p className="alert alert-danger">{error}</p>}

      <div className="mb-4">
        <h2 className="text-lg">Total de Produtos: {totalProducts}</h2>
        <h2 className="text-lg">Quantidade Total em Estoque: {totalquantidade}</h2>
      </div>

      <button className="btn btn-primary mb-3" onClick={() => setShowForm((prev) => !prev)}>
        {showForm ? 'Cancelar' : 'Adicionar Produto'}
      </button>

      {showForm && (
        <form className="mb-4" onSubmit={handleSaveProduct}>
          <div className="form-group mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Nome do Produto"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              required
            />
          </div>
          <div className="form-group mb-2">
            <input
              type="number"
              className="form-control"
              placeholder="Quantidade"
              value={newProduct.quantidade}
              onChange={(e) => setNewProduct({ ...newProduct, quantidade: e.target.value })}
              required
            />
          </div>
          <div className="form-group mb-2">
            <input
              type="number"
              className="form-control"
              placeholder="Preço"
              value={newProduct.preco}
              onChange={(e) => setNewProduct({ ...newProduct, preco: e.target.value })}
              required
            />
          </div>
          <div className="form-group mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Descrição (opcional)"
              value={newProduct.descricao}
              onChange={(e) => setNewProduct({ ...newProduct, descricao: e.target.value })}
            />
          </div>
          <button type="submit" className="btn btn-success">{editMode ? 'Atualizar' : 'Adicionar'}</button>
        </form>
      )}

      <h2 className="mb-3">Lista de Produtos</h2>
      <ul className="list-group">
        {products.map((product) => (
          <li key={product.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{product.name}</strong> - Quantidade: {product.quantidade} - Preço: {product.preco} 
              {product.descricao && (
                <p className="mb-0">Descrição: {product.descricao}</p>
              )}
            </div>
            <div>
              <button className="btn btn-sm btn-warning mx-2" onClick={() => handleEditProduct(product)}>Editar</button>
              <button className="btn btn-sm btn-danger" onClick={() => handleDeleteProduct(product.id)}>Excluir</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
