# Tripzy Frontend

## Project Description

Tripzy Frontend is a modern web application for booking travel services. This project focuses on providing a responsive user interface across various devices (mobile, tablet, desktop) and optimizing performance by implementing React Suspense for data fetching in client components. The application is built using Next.js, React, Ant Design for UI components, and Tailwind CSS for utility-first styling.

## Technologies Used

- **Next.js**: React framework for production, enabling server-side rendering (SSR), static site generation (SSG), and API routes.
- **React**: JavaScript library for building user interfaces.
- **Ant Design**: A powerful UI library for React, providing high-quality components.
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs.
- **Day.js**: A minimalist JavaScript library for parsing, validating, manipulating, and displaying dates and times.
- **React Icons**: A library for including popular icon packs in React projects.

## Architecture and Key Technical Decisions

### 1. Project Structure

The project follows a standard Next.js `app` directory structure, organizing components, data, and pages logically.

### 2. Responsive Design

All components and pages have been implemented with a mobile-first responsive design approach using Tailwind CSS. This ensures a consistent and optimal user experience across various screen sizes

### 3. Server Components & Client Components

Leveraging Next.js's App Router, the application uses a mix of Server Components and Client Components.

- **Server Components**: Pages like `app/search/page.tsx` serve as Server Components to render initial UI quickly and efficiently.
- **Client Components**: Interactive parts, like the `SearchForm`, `CustomDatePicker`, `LocationSelect`, and specifically the `SearchResults` component, are client components marked with `"use client"`.

### 4. Suspense for Client-Side Data Fetching

To resolve the `useSearchParams()` error during build/prerendering, the `SearchResults` client component (which utilizes `useSearchParams`) is wrapped in a `Suspense` boundary within `app/search/page.tsx`. This allows the server to render a fallback UI while the client-side component hydrates and fetches data, preventing build failures and improving perceived performance.

### 5. Ant Design & Tailwind CSS Integration

Ant Design components are used for a rich UI, with Tailwind CSS providing granular control over styling and responsiveness. Global CSS overrides in `globals.css` ensure consistent theming and responsive behavior for Ant Design elements.

## How to Run the Project

To run this project locally, follow these steps:

### 1. Clone the repository

```bash
git clone https://github.com/thanhvanba/tripzy-frontend-test-thanh-van.git
cd tripzy-frontend-test-thanh-van
```

### 2. Install dependencies

```bash
pnpm install
# or
npm install
# or
yarn install
```

### 3. Run the development server

```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

Open http://localhost:3000 with your browser to see the result.

### 4. Build the project for production

```bash
pnpm build
# or
npm run build
# or
yarn build
```

This will create an optimized production build in the `.next` directory.

## Vercel Demo Link

https://tripzy-frontend-test-thanh-van.vercel.app/
