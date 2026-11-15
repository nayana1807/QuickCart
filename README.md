# QuickCart — Quick-commerce frontend prototype

A responsive React + Vite prototype for a quick-commerce platform. It includes four connected demo workspaces:

- Customer shopping experience
- Store operations dashboard
- Delivery partner dashboard
- Admin platform overview

## Requirements

- Node.js 18+ (recommended)
- npm

## Run locally

1. Extract the ZIP file.
2. Open the extracted `quick-commerce-prototype` folder in VS Code.
3. Open the VS Code terminal.
4. Run:

   ```bash
   npm install
   npm run dev
   ```

5. Open the local URL shown by Vite (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview
```

## Demo interactions

- Customer: search/filter products, add items, change quantities, place a simulated order.
- Store: open/close the store, accept/reject orders, mark orders ready, adjust stock.
- Delivery: switch online/offline, confirm pickup, start delivery, confirm delivery.
- Admin: inspect order statuses, toggle demo order status, review operational metrics.
- Reset demo: use the reset option in the left sidebar.

## Important limitations

This is a frontend prototype with local in-memory sample data. It does not include a backend, database, real authentication, real payments, live GPS, notifications, or production order processing. Refreshing the page resets the demo state.

The next development phase can add an Express API, PostgreSQL database, authentication, payment gateway, and live order updates after the client approves the scope.
