import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Shop.css';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://dummyjson.com/products?limit=100');
      const data = await response.json();
      setProducts(data.products);
      setError(null);
    } catch (err) {
      setError('Failed to fetch products. Please try again later.');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://dummyjson.com/products/categories');
      const data = await response.json();
      setCategories(data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="shop">
      <h1>Shop Our Products</h1>
      
      <div className="filters">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="category-select"
        >
          <option value="all">All Categories</option>
          {categories.map((category) => (
            <option key={category.slug} value={category.slug}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="products-count">
        Showing {filteredProducts.length} products
      </div>

      <div className="products-grid">
        {filteredProducts.map((product) => (
          <Link
            to={`/product/${product.id}`}
            key={product.id}
            className="product-card"
          >
            <div className="product-image">
              <img src={product.thumbnail} alt={product.title} />
              {product.discountPercentage > 0 && (
                <span className="discount-badge">
                  -{product.discountPercentage.toFixed(0)}%
                </span>
              )}
            </div>
            <div className="product-info">
              <h3>{product.title}</h3>
              <p className="product-category">{product.category}</p>
              <div className="product-rating">
                ⭐ {product.rating.toFixed(1)}
              </div>
              <div className="product-price">
                <span className="price">${product.price}</span>
                {product.discountPercentage > 0 && (
                  <span className="original-price">
                    ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="no-products">
          No products found matching your criteria.
        </div>
      )}
    </div>
  );
};

export default Shop;
