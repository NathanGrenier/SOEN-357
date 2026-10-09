# Sneaker Hub 👟

[![Github Pages Deployment](https://github.com/NathanGrenier/SOEN-357/actions/workflows/gh-pages.yaml/badge.svg?branch=main)](https://github.com/NathanGrenier/SOEN-357/actions/workflows/gh-pages.yaml)

## 📖 Executive Summary

**Sneaker Hub** is a high-fidelity, interactive e-commerce frontend application built as a research project for SOEN-357. 

The primary objective of this application was to simulate a complete online shopping experience to conduct a UX research study on **cart abandonment behavior**. By implementing a realistic shopping flow—complete with complex product filtering, dynamic price history charts, persistent cart states, and a multi-step checkout process—our team analyzed how UI/UX decisions, trust signals, and user friction impact purchasing decisions. 

The project operates entirely on the client side using a simulated backend (LocalStorage and JSON datasets), demonstrating advanced frontend state management, type-safe routing, and responsive component design.

## 🚀 How to Access

🌐 **Live Demo:** [https://soen357.ngrenier.com/](https://soen357.ngrenier.com/)

*(Note: Data is mocked and checkout does not process real transactions).*

## 💻 Tech Stack Used

* **Core Framework:** React 19, TypeScript, Vite
* **Routing:** [@tanstack/react-router](https://tanstack.com/router/latest) (Type-safe, file-based routing)
* **Styling & UI Components:** [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/), Radix UI Primitives, `next-themes` (Dark/Light mode)
* **Data Visualization:** [Recharts](https://recharts.org/) (Used for dynamic price history area charts)
* **State Management & Forms:** React Hooks, `react-hook-form`, LocalStorage API (Auth & Cart persistence)
* **CI/CD & Deployment:** GitHub Actions, GitHub Pages

## ✨ Key Features

* **Advanced Product Discovery:** Users can browse products using Grid or List views, with complex filtering algorithms based on brand, category, sustainability rating, fit, stock status, and price ranges.
* **Interactive Data Visualization:** Individual product pages feature dynamic Recharts area charts displaying 7-day, 30-day, and 90-day price fluctuation trends across different simulated retailers.
* **Persistent Shopping Cart & Checkout:** Cart items and mock user sessions are securely managed via LocalStorage. The checkout flow includes real-time subtotal, tax, and shipping calculations.
* **Accessible & Responsive UX:** Fully responsive design supporting mobile and desktop, utilizing accessible Radix UI primitives for dialogs, drawers, popovers, and accordions.

---

## 🛠️ Running Locally

To run this project locally, clone the repository and install the dependencies. 

> **Important:** Please use `--legacy-peer-deps` to [use recharts with React 19](https://ui.shadcn.com/docs/react-19#recharts).

```bash
npm install --legacy-peer-deps
npm run dev