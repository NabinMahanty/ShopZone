# ShopZone

ShopZone is a React e-commerce demo app built with Vite. It includes product browsing, filtering, product details, cart management, simulated authentication, protected checkout, and theme switching.

## Features

- Product catalog fetched from DummyJSON API
- Product search, category filtering, and price range filtering
- Product detail page with image gallery, stock display, and reviews
- Shopping cart with add, remove, quantity update, and total calculation
- Simulated authentication with protected checkout route
- Checkout form with order summary and order placement simulation
- Light and dark theme toggle
- Persistent state with localStorage for cart, auth session, and theme

## Tech Stack

- React 19
- React Router DOM 7
- Redux Toolkit + React Redux
- Vite 7
- ESLint 9

## Project Structure

```text
src/
	components/
		Navbar.jsx
		ProtectedRoute.jsx
	context/
		AuthContext.jsx
	pages/
		Home.jsx
		Shop.jsx
		Product.jsx
		Cart.jsx
		Login.jsx
		Checkout.jsx
		Contact.jsx
	store/
		store.js
		slices/
			cartSlice.js
			filtersSlice.js
			themeSlice.js
```

## Routes

- `/` Home page
- `/shop` Product listing with filters
- `/product/:id` Product details
- `/cart` Shopping cart
- `/login` Login page
- `/checkout` Protected checkout page (requires login)
- `/contact` Contact page

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Install

```bash
pnpm install
```

Or with npm:

```bash
npm install
```

### Run Development Server

```bash
pnpm dev
```

Or:

```bash
npm run dev
```

### Build for Production

```bash
pnpm build
```

Or:

```bash
npm run build
```

### Preview Production Build

```bash
pnpm preview
```

Or:

```bash
npm run preview
```

### Lint

```bash
pnpm lint
```

Or:

```bash
npm run lint
```

## State Management

Redux slices:

- `cartSlice`: cart items, quantities, totals, localStorage hydration
- `filtersSlice`: search term, category filter, min/max price
- `themeSlice`: light/dark mode and persisted preference

Authentication context:

- `AuthContext`: simulated login/logout, persisted auth user state
- `ProtectedRoute`: redirects unauthenticated users to login and preserves return path

## Data Source

The app uses the public DummyJSON API:

- `https://dummyjson.com/products?limit=100`
- `https://dummyjson.com/products/categories`
- `https://dummyjson.com/products/:id`

## Notes

- Authentication and checkout are simulated for demo purposes.
- No backend is included in this project.
