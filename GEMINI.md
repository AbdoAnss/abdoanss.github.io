# Project: Abdessamad Anssem (Personal Website)

This is the personal website of Abdessamad Anssem, built with Hugo. It features a blog, projects, and a professional timeline (Parcours).

## Project Overview

- **Core Technology:** [Hugo](https://gohugo.io/) (Static Site Generator).
- **Theme:** Custom theme `abdoanss` located in `themes/abdoanss`.
- **Diagrams:** Uses [D2](https://d2lang.com/) for declarative diagrams.
- **Deployment:** [GitHub Pages](https://pages.github.com/), configured via GitHub Actions.
- **Key Features:**
    - Homepage with professional timeline (Parcours) and profile picture.
    - Dark/Light mode support.
    - Offline support via a custom Service Worker.
    - Integrated D2 diagrams with lightbox support.
    - Custom shortcodes for callouts, definitions, and code blocks.

## Key Directories

- `content/`: Contains Markdown files for the site's pages.
    - `blog/`: Technical articles (e.g., Python, Java, Systems).
    - `projects/`: Showcasing personal and academic projects (Next.js, Microservices, Go, DevOps).
    - `tools/`: Interactive utilities.
    - `notes/`: Short-form thoughts and TILs.
- `themes/abdoanss/`: The custom theme source code.
    - `layouts/`: HTML templates.
    - `assets/css/`: Main stylesheet (includes homepage timeline and profile styles).
- `static/`: Static assets. **Place `profile.jpg` here for the homepage.**

## Building and Running

| Command | Description |
|---------|-------------|
| `make serve` | Generates diagrams and starts the Hugo development server. |
| `make build` | Generates diagrams and builds the minified site into `public/`. |

## Development Conventions

### Parcours (Professional Timeline)
The homepage timeline is data-driven from `hugo.toml`. Add new entries under `[[params.parcours]]` with `type = 'education'` or `type = 'experience'`.

### Language
The site is primarily in French (`languageCode = 'fr-fr'`), including navigation and descriptions.
