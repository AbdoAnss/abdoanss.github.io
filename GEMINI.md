# Project: Abdessamad Anssem (Personal Website)

This is the personal website of Abdessamad Anssem, redesigned inspired by [hudovich.com](https://github.com/ahudovich/hudovich.com). It features work experiences, education (UBO Master), featured projects, technical blog posts, and dark/light mode.

## Project Overview

- **Core Technology:** [Next.js](https://nextjs.org/) (App Router, Static Export).
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) with custom OKLCH color tokens, dark/light theme support.
- **Typography:** Geist Mono.
- **Icons & Primitives:** `@hugeicons/react`, `@hugeicons/core-free-icons`, `@base-ui/react`, `@tanstack/react-hotkeys`, `next-themes`.
- **Deployment:** [GitHub Pages](https://pages.github.com/), automated via `.github/workflows/deploy.yml`.

## Key Directories & Data Files

- `src/app/`: Next.js App Router routes (`page.tsx`, `layout.tsx`, `posts/page.tsx`, `posts/[slug]/page.tsx`, `not-found.tsx`).
- `src/components/`:
  - `ui/`: Design system primitives (`Badge`, `Button`, `Card`, `Icon`, `Kbd`, `TextLink`, `Tooltip`).
  - `layout/`: `Header`, `HeaderThemeToggle`, `Footer`, `Container`, `SectionHeader`, `PageTitle`.
  - `pages/home/`: `HomeHero`, `HomeExperience`, `HomeEducation`, `HomeProjects`, `HomePosts`, `HomeSocials`, `HomeContact`.
- `src/data/`:
  - `experiences.json`: Work experiences (SAP, IUEM, CIEMS).
  - `education.json`: Education (MSc Software Engineering at UBO).
  - `projects.json`: Featured software projects (`go-fantasy-pl`, Recommendation Engine, PyCoast, etc.).
  - `links.json`: Social and contact links.
  - `metadata.json`: Site title, description, location, headline.
- `src/content/posts/`: Technical blog posts in Markdown format.
- `public/`: Static assets (`avatar.png`, `logos/`).

## Building and Running

| Command | Description |
|---------|-------------|
| `npm run dev` | Starts the local development server at `http://localhost:3000`. |
| `npm run build` | Builds the static site export into `out/` for GitHub Pages. |
| `npm start` | Starts a production server. |

## Development Conventions

### Experience & Education
- Add or update work experiences in `src/data/experiences.json`.
- Add or update academic degrees in `src/data/education.json`.

### Blog Posts
Markdown posts are placed in `src/content/posts/` with YAML frontmatter (`title`, `date`, `summary`, `tags`).
