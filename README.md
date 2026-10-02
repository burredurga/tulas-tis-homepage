# Tulas International School — Homepage Concept

A responsive, animated homepage redesign for the Frontend Developer assessment. Built with React and Vite, with the school’s core positioning and public proof points carried through the experience.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

## Build for deployment

```bash
npm run build
npm run preview
```

The production site is generated in `dist/`. The project can be imported into Vercel or Netlify; both detect Vite automatically. Build command: `npm run build`. Output directory: `dist`.

## Publish on GitHub Pages

The project is configured for the repository `burredurga/tulas-tis-homepage`. Its Vite base path and GitHub Actions workflow publish the site at:

`https://burredurga.github.io/tulas-tis-homepage/`

After pushing the project to the `main` branch, open the repository's **Settings → Pages** and set **Build and deployment → Source** to **GitHub Actions**. The workflow in `.github/workflows/deploy.yml` then builds the site and deploys it. Watch the **Actions** tab; when the deployment succeeds, the URL appears there and under **Settings → Pages**.

If you change the repository name, update `base` in `vite.config.js` to `/<new-repository-name>/` before deploying.

## Experience highlights

- Custom cursor ring on devices with a mouse, with a hover response on links and buttons.
- Scroll-triggered section and card reveals using `IntersectionObserver`.
- Theme switcher with a smooth light/dark transition.
- Scroll progress indicator at the top of the page.
- Responsive mobile navigation and reduced-motion support.
- Core UI motion is written in CSS: hero entrance, photo reveal, floating badge, marquee, hover lifts, button sweeps, and link underlines. CSS transitions animate theme, navigation, interactive cards, buttons, and links.

## Project structure

```text
src/
  main.jsx      React page sections, small components, and interaction hooks
  styles.css    Design tokens, responsive layouts, transitions, and keyframes
index.html      App entry point and page metadata
```

## Content and image notes

School facts, admission links, and public Tulas imagery reference `tis.edu.in`. The current 22-acre, 16+ sports, 24/7 medical assistance, and 6:1 ratio figures are presented as school-published information. Replace or locally host the image URLs if the production environment needs self-contained assets.

## Walkthrough guide

- `useScrollProgress()` drives the fixed reading progress bar.
- `useReveal()` observes `[data-reveal]` elements and reveals each once.
- `Cursor` tracks pointer movement only on fine-pointer devices.
- `Header` owns mobile menu and theme controls.
- `App` composes the page, sections, and external admission routes.
