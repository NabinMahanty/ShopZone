import { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetFilters,
  selectFilters,
  setMaxPrice,
  setMinPrice,
  setSearchTerm,
  setSelectedCategory,
} from '../store/slices/filtersSlice';
import './Shop.css';

const Shop = () => {
  const dispatch = useDispatch();
  const { searchTerm, selectedCategory, minPrice, maxPrice } =
    useSelector(selectFilters);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  const maxCatalogPrice = useMemo(() => {
    if (products.length === 0) {
      return 1000;
    }
    return Math.ceil(Math.max(...products.map((product) => product.price)));
  }, [products]);

  const categoryOptions = useMemo(
    () =>
      categories.map((category) => {
        if (typeof category === 'string') {
          return {
            value: category,
            label: category,
          };
        }

        return {
          value: category.slug,
          label: category.name,
        };
      }),
    [categories],
  );

  const filteredProducts = useMemo(
    () =>
      products.filter((product) => {
        const matchesSearch = product.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesCategory =
          selectedCategory === 'all' || product.category === selectedCategory;
        const matchesPrice =
          product.price >= minPrice && product.price <= maxPrice;

        return matchesSearch && matchesCategory && matchesPrice;
      }),
    [products, searchTerm, selectedCategory, minPrice, maxPrice],
  );

  const handleSearchChange = useCallback(
    (event) => {
      dispatch(setSearchTerm(event.target.value));
    },
    [dispatch],
  );

  const handleCategoryChange = useCallback(
    (event) => {
      dispatch(setSelectedCategory(event.target.value));
    },
    [dispatch],
  );

  const handleMinPriceChange = useCallback(
    (event) => {
      const value = Number(event.target.value);
      dispatch(setMinPrice(Number.isNaN(value) ? 0 : value));
    },
    [dispatch],
  );

  const handleMaxPriceChange = useCallback(
    (event) => {
      const value = Number(event.target.value);
      dispatch(setMaxPrice(Number.isNaN(value) ? maxCatalogPrice : value));
    },
    [dispatch, maxCatalogPrice],
  );

  const handleResetFilters = useCallback(() => {
    dispatch(resetFilters());
    dispatch(setMaxPrice(maxCatalogPrice));
  }, [dispatch, maxCatalogPrice]);

  useEffect(() => {
    if (maxPrice > maxCatalogPrice) {
      dispatch(setMaxPrice(maxCatalogPrice));
    }
  }, [dispatch, maxPrice, maxCatalogPrice]);

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="shop">
      <h1>Shop Our Products</h1>

      <div className="shop-layout">
        <aside className="filters-sidebar">
          <div className="filters-heading">
            <h2>Filters</h2>
            <button
              type="button"
              className="reset-button"
              onClick={handleResetFilters}
            >
              Reset
            </button>
          </div>

          <div className="filter-group">
            <label htmlFor="search">Search</label>
            <input
              id="search"
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
          </div>

          <div className="filter-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="category-select"
            >
              <option value="all">All Categories</option>
              {categoryOptions.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Price Range</label>
            <div className="price-row">
              <input
                type="number"
                min="0"
                max={maxCatalogPrice}
                value={minPrice}
                onChange={handleMinPriceChange}
                className="price-input"
              />
              <span>to</span>
              <input
                type="number"
                min="0"
                max={maxCatalogPrice}
                value={maxPrice}
                onChange={handleMaxPriceChange}
                className="price-input"
              />
            </div>
            <input
              type="range"
              min="0"
              max={maxCatalogPrice}
              value={maxPrice}
              onChange={handleMaxPriceChange}
              className="price-slider"
            />
          </div>
        </aside>

        <section className="products-section">
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
        </section>
      </div>
    </div>
  );
};

export default Shop;
