# Abdessamad Anssem — Personal Website & Technical Portfolio

The source code for my personal developer portfolio and engineering blog, hosted at [abdoanss.github.io](https://abdoanss.github.io/).

---

## Overview

This repository houses the personal website and technical writing of Abdessamad Anssem, a backend-focused software engineer based in Paris, France. The site highlights professional engineering experiences, academic background, open-source projects, and in-depth technical articles on distributed systems and backend architecture.

- **Live URL:** [https://abdoanss.github.io/](https://abdoanss.github.io/)
- **License:** MIT

---

## Architecture & Technology Stack

The site is built as a fully static, high-performance web application optimized for reliability, typography, and developer experience.

- **Framework:** Next.js 16 (App Router, Static HTML Export)
- **Styling:** Tailwind CSS v4 with custom OKLCH design tokens
- **Typography:** Geist Mono
- **Syntax Highlighting:** Shiki (dual-theme light/dark code rendering)
- **Mathematical Typesetting:** KaTeX
- **Icons:** HugeIcons
- **Localization:** Multilingual support (English, French, German)
- **Hosting & CI/CD:** GitHub Pages via GitHub Actions

---

## Key Features

- **Performance & Static Delivery:** Pre-rendered at build time with zero server dependencies.
- **Dark & Light Modes:** System-aware theme toggle with synchronized syntax highlighting.
- **Technical Articles:** Long-form engineering blog posts covering concurrency, memory models, and system performance.
- **Interactive Project Pages:** Dedicated showcase pages (such as the `go-fantasy-pl` SDK) with interactive documentation and API reference tables.

---

## Local Development

### Prerequisites

- Node.js 20 or higher
- npm

### Setup

```bash
# Clone the repository
git clone https://github.com/AbdoAnss/abdoanss.github.io.git
cd abdoanss.github.io

# Install dependencies
npm install

# Run development server
npm run dev
```

The application will be available at `http://localhost:3000`.

### Production Build

```bash
npm run build
```

Compiles the static export into the `./out` directory.

---

## Contact & Links

- **Website:** [https://abdoanss.github.io/](https://abdoanss.github.io/)
- **GitHub:** [https://github.com/AbdoAnss](https://github.com/AbdoAnss)
- **LinkedIn:** [https://www.linkedin.com/in/abdoanss/](https://www.linkedin.com/in/abdoanss/)
- **Email:** [abdessamad.anssem@gmail.com](mailto:abdessamad.anssem@gmail.com)
