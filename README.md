# Portfolio personnel — Abdessamad Anssem

Ce dépôt contient le code source de mon site web personnel et blog technique, construit avec [Hugo](https://gohugo.io/). Il présente mon parcours académique, mes projets en génie logiciel et mes réflexions techniques.

## 🚀 Aperçu

- **URL du site :** [https://abdoanss.github.io/](https://abdoanss.github.io/)
- **Technologie :** Hugo (Static Site Generator)
- **Thème :** Thème personnalisé `abdoanss` conçu pour la lisibilité et la performance.
- **Déploiement :** GitHub Actions & GitHub Pages.

## ✨ Fonctionnalités

- **Parcours interactif :** Une timeline de mes expériences professionnelles et de ma formation.
- **Blog technique :** Articles détaillés sur les systèmes distribués, le backend (Java, Python, Go) et l'ingénierie logicielle.
- **Diagrammes D2 :** Utilisation de [D2](https://d2lang.com/) pour des schémas d'architecture clairs et intégrés avec support Light/Dark mode.
- **Mode Sombre/Clair :** Support natif des préférences système avec bascule manuelle.
- **Performance :** Score Lighthouse optimal, minification des ressources et gestion des polices locales.
- **Offline support :** Service Worker personnalisé pour une consultation hors-ligne basique.

## 🛠️ Installation et Développement

### Prérequis

- [Hugo](https://gohugo.io/installation/) (version Extended recommandée)
- [D2](https://d2lang.com/install) (pour la génération des diagrammes)
- [Make](https://www.gnu.org/software/make/) (optionnel, pour utiliser les raccourcis du Makefile)

### Lancement local

1. **Cloner le dépôt :**
   ```bash
   git clone https://github.com/AbdoAnss/abdoanss.github.io.git
   cd abdoanss.github.io
   ```

2. **Lancer le serveur de développement :**
   ```bash
   make serve
   # Ou sans Make :
   # d2 content/blog/.../*.d2 assets/diagrams/...
   # hugo server
   ```

3. **Accéder au site :** Ouvrez `http://localhost:1313` dans votre navigateur.

## 📁 Structure du Projet

- `content/` : Articles de blog, descriptions de projets et pages statiques (Markdown).
- `themes/abdoanss/` : Source du thème personnalisé (Layouts, CSS, JS).
- `static/` : Assets statiques (images, favicon, manifest).
- `.github/workflows/` : Pipeline CI/CD pour le déploiement automatisé.

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) (si présent) pour plus de détails.
