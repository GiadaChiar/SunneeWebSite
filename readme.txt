# 🛍️ Mini E-Commerce Frontend

A frontend e-commerce project built with **TypeScript, HTML, SCSS, and vanilla DOM APIs**, without any frontend framework.

---

## 🚀 Main Features

### 👤 Authentication
- User login system
- Admin login area
- Session management using `sessionStorage`
- Form validation and access control

---

### 🛒 Shop
- Dynamic product rendering using HTML templates
- Product filtering by:
  - type
  - gender
  - color
  - size
- Product variant management (size, color, availability)

---

### 🧺 Cart System
- Add / remove products
- Quantity management with constraints:
  - maximum stock limit
  - minimum quantity of 1
- Dynamic total price calculation
- Cart persistence using `sessionStorage`

---

### 🧑‍💼 Admin Panel
- Create new products
- Manage product variants
- Product table overview
- Stock and availability control

---

### 🧩 Template System
- Dynamic HTML template loading
- UI rendering using `cloneNode`
- Component injection into different sections

---

## 🏗️ Project Architecture

The project is structured in modular TypeScript files:
src/
│
├── dom.ts # DOM manipulation & UI utilities
├── events.ts # Event listeners & interaction logic
├── templates.ts # HTML template rendering system
├── utils.ts # Generic utilities
├── intProducts.ts # Default for test 
├── productService.ts # products logic
├── userServices.ts # users logic
├── validation.ts # data validation
├── interfaces.ts # TypeScript types & data models
├── shop.ts # Shop logic and filters
├── cart.ts # Cart management
├── admin.ts # Admin panel logic
├── login.ts # Authentication system
├── form.ts # form to contact
├── menu.ts # Menu with serach filters
├── index.ts # home page with filters
├── aboutUs.ts # presentation brand




---

## 💾 Storage Usage

- `localStorage`
  - registered users
  - products database

- `sessionStorage`
  - logged-in user
  - active cart session

---

## ⚙️ Technologies Used

- TypeScript
- HTML5
- SCSS
- Vanilla DOM API
- Bootstrap (for UI components)

---

## 🔄 Application Flow

1. User or admin login
2. Shop loading with filters
3. Product selection and cart management
4. Quantity updates and variant handling
5. Checkout process and stock update

---

## 📌 Technical Notes

- No frontend framework used
- Fully modular TypeScript architecture
- Manual DOM manipulation
- HTML template-based rendering system
- Separation between UI and business logic

---

## 📁 How to use it

## command

- mkdir my-webpack-project
- cd my-webpack-project
- npm init -y

---

## 📦 Install Webpack + tools + plugin

- npm install --save-dev webpack webpack-cli webpack-dev-server
- npm install --save-dev typescript ts-loader
- npm install --save-dev html-webpack-plugin

---

## ▶️ Run project

- npm run build
- npm run start