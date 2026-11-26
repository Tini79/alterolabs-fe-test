# Frontend Take-Home Assignment --- Development Tasks

## Project Overview

Build a responsive **Product Listing & Discovery Application** using
Next.js 16, TypeScript, and Tailwind CSS. The application consumes the
DummyJSON REST API and supports product listing, pagination, category
filtering, and keyword search. Product details are an additional
recommended feature.

The implementation will be developed in this order:

1.  API integration and data validation
2.  Project architecture and state-management decisions
3.  Reusable UI components
4.  Shared layout
5.  Pages and feature composition
6.  Testing, documentation, and deployment

> **Development principle:** Complete and verify the data layer before
> building the final UI. Use the supplied wireframe/design reference
> when it becomes available; it is a guide rather than a pixel-perfect
> requirement.

------------------------------------------------------------------------

## 1. Project Setup

-   [x] Create a new Next.js 16 project from scratch.
-   [x] Select the App Router.
-   [x] Use TypeScript.
-   [x] Configure Tailwind CSS.
-   [x] Use npm as the package manager.
-   [x] Configure the `@/*` import alias to point to `src/*`.
-   [x] Keep application code inside `src/`; keep configuration files
    and `public/` at the project root.
-   [ ] Confirm the project runs locally and the production build
    succeeds.
-   [x] Add and verify the required environment variable for the API
    base URL.

**Environment variable**

``` env
DUMMYJSON_BASE_URL=https://dummyjson.com
```

Do not expose this variable with the `NEXT_PUBLIC_` prefix because it is
only needed by server-side data-fetching code.

------------------------------------------------------------------------

## 2. API Integration --- Complete Before UI Development

### 2.1 Define API contracts and TypeScript types

-   [ ] Review the DummyJSON product API response structures.
-   [ ] Create TypeScript types/interfaces for:
    -   [ ] `Product`
    -   [ ] `ProductsResponse` (`products`, `total`, `skip`, `limit`)
    -   [ ] `ProductCategory` (use the actual category response shape)
    -   [ ] API error representation, if needed.
-   [ ] Include fields required by the assignment:
    -   [ ] Product ID, title, description, category, price
    -   [ ] Thumbnail and images
    -   [ ] Discount percentage and rating
    -   [ ] Brand and stock for the detail page
-   [ ] Keep optional API fields optional in the types where the API may
    omit them.

### 2.2 Create the API service layer

Create a central API module rather than calling `fetch` directly from UI
components.

-   [ ] Create a shared API base URL configuration.
-   [ ] Create a reusable request helper.
-   [ ] Handle non-successful HTTP responses.
-   [ ] Handle network errors and unexpected response data.
-   [ ] Keep API functions independent from presentation components.
-   [ ] Use native `fetch` and Next.js-supported caching/revalidation
    options deliberately; document any non-default choice.
-   [ ] Avoid adding an API route/proxy layer unless a concrete
    requirement makes it necessary.

### 2.3 Implement endpoint functions

-   [ ] `getProducts({ limit, skip })`
    -   Endpoint: `GET /products`
    -   Return products and pagination metadata.
-   [ ] `getProductCategories()`
    -   Endpoint: `GET /products/categories`
    -   Return the available categories.
-   [ ] `getProductsByCategory({ category, limit, skip })`
    -   Endpoint: `GET /products/category/{category}`
    -   Support pagination parameters.
-   [ ] `searchProducts({ query, limit, skip })`
    -   Endpoint: `GET /products/search?q={query}`
    -   Support pagination parameters.
-   [ ] `getProductById(id)`
    -   Endpoint: `GET /products/{id}`
    -   This function supports the recommended product-detail feature.

### 2.4 Verify API behavior independently

Before building the UI, test the API functions with representative
inputs.

-   [ ] Verify the default product listing.
-   [ ] Verify the category list and the category response shape.
-   [ ] Verify filtering by a valid category.
-   [ ] Verify search with a matching keyword.
-   [ ] Verify search with a keyword that returns no products.
-   [ ] Verify `limit` and `skip` produce the expected result range.
-   [ ] Verify `total`, `limit`, and `skip` are mapped correctly.
-   [ ] Verify product detail with a valid ID.
-   [ ] Verify an invalid product ID is handled without crashing.
-   [ ] Verify failed requests and network errors produce useful errors.
-   [ ] Confirm changing category/search does not accidentally reuse
    results from a previous query.

**API integration is considered complete when:** every required endpoint
has a typed service function and the functions have been verified
independently of the UI.

------------------------------------------------------------------------

## 3. Project Architecture & State Management

### 3.1 Recommended state-management approach

**Initial decision: Do not add Zustand or Redux for this assignment.**

Use the URL as the source of truth for shareable listing state:

  -----------------------------------------------------------------------
  State                   Source of truth         Reason
  ----------------------- ----------------------- -----------------------
  Search query            URL search parameter    Shareable and survives
                          (`q`)                   refresh

  Selected category       URL search parameter    Shareable and supports
                          (`category`)            browser navigation

  Current page            URL search parameter    Shareable and supports
                          (`page`)                browser navigation

  Products and categories Server-fetched API data Remote data, not
                                                  client-owned global
                                                  state

  Search input draft /    Local React state       Temporary UI
  mobile menu state                               interaction
  -----------------------------------------------------------------------

-   [ ] Read listing filters and pagination from the page's
    `searchParams` prop.
-   [ ] Update URL parameters when a user changes search, category, or
    page.
-   [ ] Reset `page` to `1` when a new search query or category is
    applied.
-   [ ] Preserve unrelated valid query parameters when updating one
    filter.
-   [ ] Validate and normalize query parameter values (for example,
    invalid page values should fall back to page 1).
-   [ ] Use React `useState` only for temporary client-side UI state.
-   [ ] Keep product data out of a global client store unless a real
    cross-page client-state requirement appears.

**Why not Zustand or Redux?** The assignment does not currently require
complex shared client state, mutations, or deeply connected client
features. Adding a global store would duplicate state already
represented by the URL or fetched by the server. Reconsider a store only
if the scope expands and a concrete need appears.

### 3.2 Data-fetching flow

-   [ ] Keep data-fetching functions in the API/service layer.
-   [ ] Fetch listing data in the App Router page (Server Component)
    using validated search parameters.
-   [ ] Fetch categories in a server-side boundary and pass the result
    to the relevant UI component.
-   [ ] Pass fetched data into Client Components only where interaction
    requires it.
-   [ ] Keep Client Components focused on interaction; do not turn the
    entire page into a Client Component without a reason.
-   [ ] Use the `loading.tsx`, `error.tsx`, and `not-found.tsx`
    conventions where appropriate.
-   [ ] Prevent stale results from appearing when the URL filters
    change.

### 3.3 Proposed folder structure

This is a starting structure. Add folders only when they have a clear
responsibility.

``` text
project-root/
├── public/
│   └── images/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── loading.tsx
│   │   ├── error.tsx
│   │   ├── not-found.tsx
│   │   └── products/
│   │       └── [id]/
│   │           ├── page.tsx
│   │           ├── loading.tsx
│   │           └── not-found.tsx
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   └── products/
│   ├── lib/
│   │   ├── api/
│   │   │   ├── client.ts
│   │   │   ├── products.ts
│   │   │   └── categories.ts
│   │   └── utils/
│   ├── types/
│   │   └── product.ts
│   └── styles/
│       └── globals.css
├── .env.local
├── .env.example
├── package.json
├── tsconfig.json
└── README.md
```

**Structure notes**

-   `app/`: routes, route-level loading/error handling, and page
    composition.
-   `components/ui/`: small reusable UI primitives (for example, button,
    input, badge, skeleton).
-   `components/layout/`: shared application layout components.
-   `components/products/`: product-domain components.
-   `lib/api/`: API request helper and endpoint functions.
-   `lib/utils/`: small shared utilities, such as query parameter
    parsing.
-   `types/`: shared TypeScript contracts.

Keep API modules server-only if they are intended to be called only by
Server Components. Do not import server-only modules into Client
Components.

------------------------------------------------------------------------

## 4. Frontend Development

Start this phase after the API layer and project architecture have been
verified.

### 4.1 Reusable UI components

Build small components before composing the page.

-   [ ] Button
-   [ ] Search input
-   [ ] Category item / category selector
-   [ ] Product card
-   [ ] Product image
-   [ ] Price and discount display
-   [ ] Rating display
-   [ ] Pagination controls
-   [ ] Loading skeleton
-   [ ] Error message / retry action
-   [ ] Empty state
-   [ ] Optional breadcrumb for product details

### 4.2 Shared layout

-   [ ] Review the provided wireframe/design reference.
-   [ ] Define the application's spacing, typography, colors, and
    responsive breakpoints.
-   [ ] Build the root layout and global styles.
-   [ ] Build shared page container and content-width rules.
-   [ ] Build the header/navigation if required by the reference.
-   [ ] Ensure the shared layout works on mobile, tablet, and desktop.

### 4.3 Product listing page (`/`)

-   [ ] Compose the page using reusable components.
-   [ ] Display products in a responsive grid or list.
-   [ ] Display each product's image, title, category, price, discount
    percentage (when available), and rating (when available).
-   [ ] Display the total number of products/results.
-   [ ] Connect the category selector to the URL and API integration.
-   [ ] Connect pagination to the URL and API integration.
-   [ ] Provide an option to view all products.
-   [ ] Show the current search/category context where appropriate.

### 4.4 Category filtering

-   [ ] Display categories retrieved from the API.
-   [ ] Allow selecting a category.
-   [ ] Allow returning to all products.
-   [ ] Update the listing when the category changes.
-   [ ] Reset pagination to page 1 when the category changes.
-   [ ] Ensure category filtering and pagination work together.

### 4.5 Search (optional in the assignment)

-   [ ] Add a keyword search input.
-   [ ] Submit a search query and update the product listing.
-   [ ] Support pagination within search results.
-   [ ] Reset pagination to page 1 when a new query is submitted.
-   [ ] Add a debounce mechanism if using live search while typing.
-   [ ] Avoid sending duplicate requests for an unchanged query.
-   [ ] Provide a clear/reset search action.

### 4.6 Product detail page (recommended)

-   [ ] Create the dynamic route `/products/[id]`.
-   [ ] Fetch the product using its ID.
-   [ ] Display product images, title, description, price, rating, brand
    (when available), and stock information.
-   [ ] Add navigation from a product card to its detail page.
-   [ ] Handle invalid IDs and unavailable products gracefully.
-   [ ] Add a loading state for the detail route.

------------------------------------------------------------------------

## 5. UI States & Error Handling

-   [ ] **Initial state:** show the default product listing on first
    visit.
-   [ ] **Loading state:** show a suitable skeleton or loading indicator
    while data is being fetched.
-   [ ] **Error state:** show a useful message when an API request
    fails.
-   [ ] **Retry behavior:** allow retrying a failed request where
    appropriate.
-   [ ] **Empty state:** explain when no products match a category or
    search query.
-   [ ] **Invalid query state:** normalize invalid page values and
    unsupported filter values safely.
-   [ ] Ensure old results are not presented as if they belong to a
    newly selected filter.
-   [ ] Avoid unnecessary duplicate API requests where reasonably
    possible.
-   [ ] Keep the interface usable when a request fails.

------------------------------------------------------------------------

## 6. Responsive Design & Accessibility

-   [ ] Implement mobile, tablet, and desktop layouts.
-   [ ] Check product grid column changes at responsive breakpoints.
-   [ ] Ensure search, category controls, and pagination remain usable
    on small screens.
-   [ ] Use semantic HTML elements.
-   [ ] Provide meaningful image alt text.
-   [ ] Ensure interactive elements are keyboard accessible.
-   [ ] Provide visible focus states.
-   [ ] Check text contrast and readable content sizes.
-   [ ] Avoid layout shifts when product images load.

------------------------------------------------------------------------

## 7. Testing & Quality Checks

-   [ ] Run TypeScript checks.
-   [ ] Run ESLint.
-   [ ] Run the production build.
-   [ ] Test the default listing.
-   [ ] Test category filtering and switching back to all products.
-   [ ] Test search, empty search results, and clearing search.
-   [ ] Test pagination with the default listing, a category, and search
    results.
-   [ ] Confirm changing category/search resets pagination.
-   [ ] Test direct visits to a product detail URL.
-   [ ] Test invalid product IDs.
-   [ ] Test loading, error, and empty states.
-   [ ] Test browser refresh, back, and forward navigation with URL
    filters.
-   [ ] Check responsive behavior on mobile, tablet, and desktop.
-   [ ] Check the browser console for runtime errors and avoidable
    warnings.

------------------------------------------------------------------------

## 8. README & Submission

### README

-   [ ] Add a project overview and description.
-   [ ] List technologies and dependencies.
-   [ ] Include installation instructions.
-   [ ] Explain how to run the application locally.
-   [ ] Document available scripts and commands.
-   [ ] List implemented features.
-   [ ] Explain the project structure.
-   [ ] Explain important technical decisions, especially state
    management and data fetching.
-   [ ] Document required environment variables using `.env.example`
    (without real secrets).
-   [ ] List known limitations or unfinished features.

### Submission

-   [ ] Push the source code to a GitHub repository.
-   [ ] Ensure the repository is accessible to the evaluation team.
-   [ ] Deploy the application to Vercel or a similar platform.
-   [ ] Verify the deployed application is publicly accessible.
-   [ ] Add the live deployment URL to the README.
-   [ ] Perform a final smoke test on the deployed application.

------------------------------------------------------------------------

## 9. Definition of Done

The assignment is ready for submission when:

-   [ ] The application uses Next.js 16 App Router and TypeScript.
-   [ ] Product listing, categories, category filtering, and pagination
    work.
-   [ ] Search works if included.
-   [ ] Product details work if included.
-   [ ] Loading, error, and empty states are handled.
-   [ ] The UI is responsive and follows the supplied design reference.
-   [ ] API logic is separated from UI components.
-   [ ] URL state stays in sync with filters and pagination.
-   [ ] TypeScript, lint, and production build checks pass.
-   [ ] README, GitHub repository, and live deployment are ready.

------------------------------------------------------------------------

## References

### Assignment requirements

-   Frontend Engineer -- Take-Home Assignment (provided PDF).

### Official documentation

-   [Next.js Documentation](https://nextjs.org/docs)
-   [Next.js App Router](https://nextjs.org/docs/app)
-   [Next.js Project
    Structure](https://nextjs.org/docs/app/getting-started/project-structure)
-   [Next.js `src`
    Folder](https://nextjs.org/docs/app/api-reference/file-conventions/src-folder)
-   [Next.js Page and
    `searchParams`](https://nextjs.org/docs/app/api-reference/file-conventions/page)
-   [Next.js
    `useSearchParams`](https://nextjs.org/docs/app/api-reference/functions/use-search-params)
-   [DummyJSON Product API
    Documentation](https://dummyjson.com/docs/products)
