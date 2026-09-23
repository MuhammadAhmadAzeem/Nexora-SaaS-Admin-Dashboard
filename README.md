# Nexora — SaaS Admin Dashboard

Nexora is a modern and responsive SaaS admin dashboard built with **React.js, Vite, and Tailwind CSS**.

The project provides a clean workspace for managing projects, users, tasks, orders, and business activity through a modern dashboard interface.

---

## 🚀 Features

* Modern SaaS landing page
* Responsive design
* React-based component architecture
* Dashboard interface
* Project management UI
* User management UI
* Task management UI
* Order management UI
* Business analytics UI
* Login and signup pages
* Form validation
* Password visibility toggle
* Password strength indicator
* Dark and light mode
* Persistent theme using Local Storage
* Responsive mobile navigation
* SEO metadata
* Custom 404 page
* Reusable UI components
* Lucide icons

---

## 🛠️ Tech Stack

### Frontend

* React.js
* JavaScript
* JSX
* React Router DOM
* Tailwind CSS
* Lucide React

### Tools

* Vite
* Git
* GitHub
* VS Code

---

## 📂 Project Structure

```text
Nexora-SaaS-Admin-Dashboard/
│
├── public/
│   ├── favicon.svg
│   └── og-image.svg
│
├── src/
│   ├── components/
│   │   ├── common/
│   │   └── ...
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── Dashboard.jsx
│   │   ├── NotFound.jsx
│   │   └── ...
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

---

## 📄 Main Pages

| Page      | Description                |
| --------- | -------------------------- |
| Home      | Nexora landing page        |
| Login     | User login interface       |
| Signup    | Account creation interface |
| Dashboard | Main workspace dashboard   |
| Projects  | Project management         |
| Users     | User management            |
| Tasks     | Task management            |
| Orders    | Order management           |
| Analytics | Business analytics         |
| Settings  | Application settings       |
| Privacy   | Privacy policy             |
| Terms     | Terms and conditions       |
| Not Found | Custom 404 page            |

---

## 🌙 Dark Mode

Nexora includes a Light/Dark theme system.

The selected theme is stored in the browser's Local Storage so the user's preference remains after refreshing the page.

```text
Storage Key:
nexora-theme
```

Available themes:

```text
light
dark
```

---

## 🔐 Authentication

The current authentication flow is implemented on the frontend for development and demonstration purposes.

User information is stored in Local Storage:

```text
nexoraUsers
```

Authentication state is stored using:

```text
nexoraAuth
```

> This frontend authentication approach is intended for development/demo purposes and should be replaced with secure backend authentication for production.

---

## 🔎 SEO

Nexora includes a reusable SEO component for managing page metadata.

The project includes:

* Page titles
* Meta descriptions
* Keywords
* Author metadata
* Theme color
* Open Graph metadata
* Social sharing metadata
* Favicon

---

## 📱 Responsive Design

The interface is designed to work across different screen sizes:

* Desktop
* Laptop
* Tablet
* Mobile

Tailwind CSS responsive utilities are used throughout the application to create adaptable layouts.

---

## 🎨 UI Design

Nexora follows a clean SaaS design system using:

* Blue and cyan primary colors
* Rounded UI elements
* Subtle borders
* Soft shadows
* Responsive layouts
* Dark mode support
* Lucide icons
* Minimal and professional interface

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/MuhammadAhmadAzeem/Nexora-SaaS-Admin-Dashboard.git
```

### 2. Open the project

```bash
cd Nexora-SaaS-Admin-Dashboard
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

The application will run on the local development URL provided by Vite.

---

## 🏗️ Production Build

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

## 📸 Screenshots

### Landing Page

Add your project screenshot here.

### Dashboard

Add your dashboard screenshot here.

### Login

Add your login screenshot here.

### Signup

Add your signup screenshot here.

### Dark Mode

Add your dark mode screenshot here.

---

## 🔮 Future Improvements

Some planned improvements include:

* Backend API integration
* Database integration
* Secure authentication
* Role-based access control
* Real-time data
* Advanced dashboard analytics
* User profile management
* Production deployment

---

## 📚 What I Practiced

Through this project, I practiced:

* React components
* React Hooks
* `useState`
* `useEffect`
* React Router
* Props
* Conditional rendering
* Array rendering
* Form handling
* Form validation
* Local Storage
* Responsive design
* Tailwind CSS
* Dark mode
* SEO implementation
* Reusable components
* Git and GitHub

---

## 👨‍💻 Author

**Muhammad Ahmad Azeem**

Software Engineer | Full-Stack Web Developer

GitHub:

https://github.com/MuhammadAhmadAzeem

---

## 📄 License

This project is created for learning, development, and portfolio purposes.
