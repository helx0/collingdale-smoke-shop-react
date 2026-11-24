# Collingdale Smoke Shop — React + TypeScript + Tailwind

Luxury, responsive commercial-site starter prepared for owner approval and real publication.

## What is implemented
- Responsive premium dark/gold visual system
- Home, Products, About, Gallery, Contact and Admin preview routes
- Mobile navigation
- 21+ entry gate
- Data-driven product/category structure
- Google Maps embed + directions + click-to-call
- Owner-first content workflow: no invented product names, prices, brands or inventory
- Supabase-ready client

## Important content policy for launch
The current product cards are placeholders. Replace them only with information supplied/approved by the store owner. Do not publish sample prices or sample product photos as if they are real inventory.

## Commerce status
Online checkout is intentionally NOT implemented in this starter. Before adding e-commerce, confirm the retailer's legal, age/identity verification, payment, shipping, tax and tobacco-product compliance requirements for the relevant jurisdictions. Federal U.S. tobacco sales are 21+ and online tobacco sales have additional compliance considerations.

## Run locally
1. Install Node.js 20+.
2. `npm install`
3. `npm run dev`
4. Open the local Vite URL.

## Build
`npm run build`

## Supabase next step
Create a Supabase project and add:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Recommended tables:
- `products`
- `categories`
- `store_settings`
- `gallery_items`
- `inquiries`
- `profiles`

Use Row Level Security so only authenticated staff can mutate inventory/content.
