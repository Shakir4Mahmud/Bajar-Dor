<div align="center">

# 🛒 বাজার দর | BazarDor

</div>

---

## 📖 About the Project

**বাজার দর (BazarDor)** is a fully Bengali-language web app that helps people track the daily prices of essential items such as rice, lentils, oil, vegetables, fish, meat, dairy and spices.

For every product it shows today's price, the change from yesterday (▲ / ▼ / —), and a **market-wise price breakdown** (minimum, maximum and average) across major bazaars in different divisions of Bangladesh. The app is fully responsive and works smoothly on mobile, tablet and desktop.

🔗 **Live site:** [https://bajar-dor-mauve.vercel.app](https://bajar-dor-mauve.vercel.app)

---

## ✨ Key Features

|     | Feature                                  | Description                                                                                                                                                                                                |
| :-: | ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 📈  | **Live Price Ticker & Daily Highlights** | An infinite scrolling price strip below the navbar, plus sections for the **top 6 price risers** (আজ দাম বেড়েছে ▲) and **top 6 fallers** (আজ দাম কমেছে ▼) of the day.                                     |
| 🗂️  | **Category Browsing with Smart Sorting** | Browse by category (চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম-দুধ, মসলা) and sort by default, price low to high, or price high to low. Sorting uses numeric values, so it works correctly with Bengali numerals. |
| 🏪  | **Market-wise Price Details**            | Each product page shows minimum, maximum and average prices, plus a table of prices from bazaars across Dhaka, Chattogram, Rajshahi, Mymensingh, Khulna and Sylhet.                                        |
| 🔐  | **Secure Authentication**                | Sign up and sign in with **email & password**, **Google** or **GitHub**, powered by BetterAuth. Product details are available to signed-in users only, with toast feedback for every auth action.          |
| 👤  | **Profile Management**                   | A personal profile page where users can view their account information and update their name.                                                                                                              |
| 📱  | **Responsive & Polished UX**             | Works on every screen size, with skeleton loaders while data loads, toast notifications for success and error states, and a friendly 404 page for unknown routes.                                          |

---

## 🛠️ Technologies Used

| Category           | Technology                                                                 |
| ------------------ | -------------------------------------------------------------------------- |
| **Framework**      | [Next.js](https://nextjs.org/) (App Router)                                |
| **UI Library**     | [React](https://react.dev/)                                                |
| **Styling**        | [Tailwind CSS](https://tailwindcss.com/) + [DaisyUI](https://daisyui.com/) |
| **Authentication** | [BetterAuth](https://better-auth.com/) (Email/Password, Google, GitHub)    |
| **Database**       | [MongoDB Atlas](https://www.mongodb.com/atlas)                             |
| **Notifications**  | [react-hot-toast](https://react-hot-toast.com/)                            |
| **Font**           | Hind Siliguri (Google Fonts)                                               |
| **Language**       | JavaScript                                                                 |
| **Deployment**     | [Vercel](https://vercel.com/)                                              |

---

## 🌐 Data Source

Product and category data come from a public REST API.

**Base URL:** `https://api.api-store.workers.dev/api/bazardor`

| Method | Endpoint                          | Description                   |
| ------ | --------------------------------- | ----------------------------- |
| GET    | `/categories`                     | All categories                |
| GET    | `/categories/:id`                 | Single category               |
| GET    | `/products`                       | All products                  |
| GET    | `/products?category=chal`         | Products filtered by category |
| GET    | `/products?slug=sorno-machi-chal` | Single product by slug        |
| GET    | `/products/:id`                   | Single product by id          |

---

## ☁️ Deployment

The app is deployed on **Vercel**. It needs these environment variables:

| Variable                                    | Purpose                   |
| ------------------------------------------- | ------------------------- |
| `BETTER_AUTH_DB_URL`                        | MongoDB connection string |
| `BETTER_AUTH_SECRET`                        | Secret used by BetterAuth |
| `BETTER_AUTH_URL`                           | Public URL of the site    |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | GitHub OAuth credentials  |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Google OAuth credentials  |

---

## 👨‍💻 Author

**Shakir** — [@Shakir4Mahmud](https://github.com/Shakir4Mahmud)

---

<div align="center">

_সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।_

</div>
