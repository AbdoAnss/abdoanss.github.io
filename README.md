# Abdessamad Anssem — Personal Portfolio & Technical Blog

Modern personal portfolio and technical blog built with **Next.js 16 (App Router, Static Export)**, **Tailwind CSS v4**, **TypeScript**, and **Geist Mono**.

Live website: **[https://abdoanss.github.io/](https://abdoanss.github.io/)**

---

## ⚡ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (Turbopack, Static HTML Export)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) with OKLCH theme tokens
- **Typography:** Geist Mono
- **Syntax Highlighting:** [Shiki](https://shiki.style/) (dual-theme `github-light` & `github-dark`)
- **Math Rendering:** [KaTeX](https://katex.org/)
- **Icons:** [@hugeicons/react](https://hugeicons.com/) & [@hugeicons/core-free-icons](https://hugeicons.com/)
- **I18n:** Built-in multilingual support (`en` default, `fr`, `de`)
- **Deployment:** [GitHub Pages](https://pages.github.com/) via GitHub Actions

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- npm

### Installation & Local Development

```bash
# Clone the repository
git clone https://github.com/AbdoAnss/abdoanss.github.io.git
cd abdoanss.github.io

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
```

This compiles static HTML and assets into the `./out` directory, which is deployed to GitHub Pages automatically upon push to `main`.
