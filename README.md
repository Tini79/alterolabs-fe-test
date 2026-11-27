# Product Listing & Discovery

A responsive product catalog built for a Frontend Engineer take-home
assignment. It uses the DummyJSON Products API and includes product
listing, category filtering, pagination, keyword search, and product
details.

The detailed assignment requirements and progress checklist are in
[`docs/tasks.md`](docs/tasks.md).

## Assignment requirements

The application is intended to:

- Fetch and display products with their image, title, category, price,
  discount, and rating.
- Let users filter products by category and move between result pages.
- Support keyword search and show matching products.
- Provide a product detail view with its images, description, price,
  rating, brand, and stock information.
- Present responsive loading and error feedback.

## Implemented features

- Responsive product grid, category filter, and pagination.
- Product cards with image, category, rating, and discounted/original
  prices.
- Search modal that opens from the header search control. Pressing Enter
  navigates to `/products?search=...`.
- Search results page with a result count and an empty-results message.
- Product detail route at `/products/[id]`, with an image gallery,
  pricing, rating, stock information, and product description.
- Loading skeletons for the catalog and product detail pages.
- Mobile navigation and accessible controls for the main interactions.

## Tech stack

- Next.js 16 App Router
- React 19 and TypeScript
- Tailwind CSS 4
- DummyJSON Products API
- Font Awesome icons

## Getting started

Requirements: Node.js and npm.

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create `.env.local` from `.env.example`, then adjust the API URL if
   needed:

   ```powershell
   Copy-Item .env.example .env.local
   ```

   On macOS/Linux, use `cp .env.example .env.local`.

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable | Required | Description |
| --- | --- | --- |
| `DUMMYJSON_BASE_URL` | Yes | Server-side base URL for the DummyJSON API. Set to `https://dummyjson.com` in `.env.example`. |

Keep this variable server-side; do not rename it with the `NEXT_PUBLIC_`
prefix or commit `.env.local`.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server. |
| `npm run lint` | Run ESLint. |
| `npm run build` | Create a production build. |
| `npm run start` | Serve the production build. |

There is no dedicated automated test script configured yet. See
[`docs/tasks.md`](docs/tasks.md) for the manual verification checklist.

## Project structure

```text
src/
├── app/
│   ├── api/products/        # Same-origin API route for interactive filters
│   ├── products/
│   │   ├── [id]/            # Product detail route and loading UI
│   │   └── page.tsx         # Search results route
│   ├── page.tsx             # Initial product listing
│   └── layout.tsx           # Root layout and shared header
├── components/
│   ├── layout/site-header/  # Header, navigation, search, mobile menu
│   ├── products/            # Product cards, filters, gallery, detail UI
│   └── ui/                  # Shared UI primitives
├── lib/
│   ├── api/                 # API client and endpoint functions
│   └── utils/               # Pricing and query utilities
├── styles/globals.css       # Global styles and theme tokens
└── types/product.ts         # Product API types
```

## Data flow and technical decisions

- API calls are centralized in `src/lib/api/`. The API helper reads
  `DUMMYJSON_BASE_URL`, handles HTTP/network/JSON errors, and uses
  `cache: "no-store"` so product data is requested fresh.
- The `/api/products` route provides a same-origin endpoint for
  client-driven category filtering and pagination.
- Product listing and detail data are fetched in Server Components.
  Category filtering and pagination use local client state; no global
  state library is used.
- Search is submitted from the modal and represented in the URL as the
  `search` query parameter.
- DummyJSON's `price` is treated as the original price. The displayed
  sale price is calculated from `discountPercentage`.

## Known limitations

- Category and page selections are not synchronized to URL parameters;
  refreshing or using browser back/forward does not restore those
  selections.
- Search results request up to 100 products and do not yet have their
  own pagination or an explicit clear-search action.
- The Add to Cart control is presentational; cart behavior is not
  implemented.
- API response fields are typed at compile time but are not validated
  against a runtime schema.
- Manual API/UI verification and deployment remain tracked in
  [`docs/tasks.md`](docs/tasks.md).
