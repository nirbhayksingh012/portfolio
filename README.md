# Nirbhay Singh — Portfolio

A premium AI-themed personal portfolio built with Next.js 15, React 19, TypeScript, Tailwind CSS, and Framer Motion.

## Tech Stack

- **Next.js 15** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS v3**
- **Framer Motion**
- **Lucide Icons**
- **Zod** (form validation)
- **Sonner** (toast notifications)
- **next-themes** (dark/light mode)

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev

# 3. Open http://localhost:3000
```

## Build for Production

```bash
npm run build
npm start
```

## Static Export (optional)

To generate a fully static site (no server required), uncomment the following line in `next.config.ts`:

```ts
output: "export",
```

Then run `npm run build`. The static files will be output to the `out/` directory.

## Features

- Dark / light theme toggle with system preference
- Smooth scroll animations via Framer Motion
- Glassmorphism UI design with gradient accents
- Animated background with floating blobs
- Typewriter effect in hero section
- Scroll progress indicator
- Loading screen animation
- Contact form with Zod validation
- Fully responsive design

## Project Structure

```
src/
  app/
    layout.tsx      # Root layout with fonts, metadata, theme provider
    page.tsx        # Home page (all sections)
    globals.css     # Tailwind directives + custom CSS properties
  components/
    portfolio/      # All section components
  hooks/
  lib/
    portfolio-data.ts  # All content data
    utils.ts           # cn() helper
```

## Customization

All personal data (name, experience, projects, skills, certifications) lives in `src/lib/portfolio-data.ts`. Edit that file to update content without touching any components.
