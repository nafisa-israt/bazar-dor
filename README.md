

# 🛒 Bazar Dor

**Bazar Dor** is a responsive product price tracking web application built with Next.js. It helps users explore daily market prices of essential products in Bangladesh, compare price changes, and view market-wise price information.

## 🌐 Live Demo

[Visit Bazar Dor](https://bazar-dor-ten-brown.vercel.app)

## ✨ Features

- **Product Listings:** Browse available products with their current prices.
- **Category Filtering:** Explore products by categories such as rice and other essentials.
- **Price Trends:** View products with the highest price increases and decreases.
- **Product Details:** See price history, market information, and price summaries.
- **Sorting:** Sort products by default order, lowest price, or highest price.
- **Authentication:** Sign up and sign in using email/password, Google, or GitHub.
- **Protected Routes:** Product details are accessible only to authenticated users.
- **Profile Management:** Update your account name.
- **Responsive Design:** Optimized for mobile, tablet, and desktop screens.
- **Notifications:** Get feedback through toast notifications.

## 🛠️ Technologies Used

- Next.js
- React
- JavaScript
- Tailwind CSS
- Better Auth
- MongoDB Atlas
- Lucide React
- React Hot Toast

## 🚀 Getting Started

Follow these steps to run the project locally.

### 1. Clone the repository

```bash
git clone https://github.com/nafisa-israt/bazar-dor.git
```

### 2. Navigate to the project folder

```bash
cd bazar-dor
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env.local` file in the root directory and add the following variables:

```env
BETTER_AUTH_SECRET=your_secret_key
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_DB_URL=your_mongodb_connection_string

NEXT_PUBLIC_APP_URL=http://localhost:3000

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

Replace the placeholder values with your own credentials.

**Important:** Never upload your actual secret keys or `.env.local` file to GitHub.

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📡 API

This project uses the Bazar Dor API to retrieve product and category information.

**Primary API:**

```text
https://openapi.programming-hero.com/api/bazardor
```

**Alternative APIs:**

```text
https://api.api-store.workers.dev/api/bazardor
https://api.abcz.workers.dev/api/bazardor
```

## 📁 Main Routes

| Route | Description |
|---|---|
| `/` | Homepage with product listings and price trends |
| `/category/[slug]` | Products filtered by category |
| `/product/[slug]` | Protected product details |
| `/signin` | User sign-in |
| `/signup` | User registration |
| `/profile` | User profile management |

## 👩‍💻 Developer

**Nafisa Israt**

- GitHub: [nafisa-israt](https://github.com/nafisa-israt)
- Repository: [bazar-dor](https://github.com/nafisa-israt/bazar-dor)

## 📄 License

This project was developed as part of a Programming Hero assignment.



