# 📚 System Design Docs

A modern, interactive, and high-performance documentation platform for mastering System Design and Architecture. Built with React, TypeScript, and Vite.

**🚀 Live Demo:** [https://kamalrana123.github.io/System-design/](https://kamalrana123.github.io/System-design/)

---

## 👤 Owner
**Kamaljeet** ([@kamalrana123](https://github.com/kamalrana123))

---

## ✨ Features

- **Hierarchical Navigation:** Support for deeply nested categories and topics.
- **Floating Notes:** A persistent, auto-saving notepad (using `localStorage`) for personal study notes.
- **Smart Search:** Keyboard-driven search (`Ctrl/Cmd + K`) with instant results.
- **Interactive Markdown:** High-quality rendering with GFM support and custom code blocks.
- **Reading Tools:** Table of Contents (TOC), Reading Progress Bar, and contextual Breadcrumbs.
- **Code Utilities:** One-click copy for all code snippets with language labels.
- **Mobile First:** Fully responsive design with a collapsible sidebar and optimized touch targets.

---

## 🏗️ Architecture Design

The project follows a **Static Site Generation (SSG) style** but functions as a dynamic Single Page Application (SPA).

### 1. Data Layer (`public/content/`)
- All documentation is stored as standard `.md` files.
- Content is decoupled from the UI, making it easy to contribute new topics.
- Organized in a hierarchical folder structure.

### 2. Routing Logic (`src/routes.json` & `routeHelpers.ts`)
- A centralized JSON configuration defines the documentation tree.
- `routeHelpers.ts` recursively flattens and processes this tree for navigation and search.

### 3. UI Components (`src/components/`)
- **Atomic Architecture:** Highly reusable components like `CodeBlock`, `Breadcrumbs`, and `TableOfContents`.
- **Markdown Pipeline:** Uses `react-markdown` with custom renderers to inject interactive logic (like header IDs for TOC) into static content.

### 4. Persistence Layer
- **Client-Side Storage:** Uses browser `localStorage` to store personal notes per page ID, ensuring data persists across sessions without a backend.

---

## 🛠️ Technology Stack

- **Framework:** React 19
- **Build Tool:** Vite 7 (High-performance HMR)
- **Language:** TypeScript (Strict Type Safety)
- **Styling:** Custom CSS with CSS Variables for theme management.
- **Markdown:** `react-markdown` + `remark-gfm`.

---

## 🤝 Contributing

Contributions are welcome! Whether it's adding new content or improving the UI, follow these steps:

### 1. Setup Environment
```bash
# Clone the repo
git clone https://github.com/kamalrana123/System-design.git

# Install dependencies
npm install

# Start development server
npm run dev
```

### 2. Adding New Content
1. Place your `.md` file in `public/content/your-category/`.
2. Update `src/routes.json` to include your new file in the desired hierarchy.
3. The site will automatically generate the sidebar links, breadcrumbs, and TOC.

### 3. Submission
1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📜 License
Distributed under the MIT License.

---

## 📞 Contact
Project Link: [https://github.com/kamalrana123/System-design](https://github.com/kamalrana123/System-design)