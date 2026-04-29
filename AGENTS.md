# Repository Guidelines

## Project Structure & Module Organization
The project is a single-page React application built with Vite and TypeScript.
- **src/**: Contains core application logic.
    - `App.tsx`: Main application component housing the UI sections.
    - `i18n.ts`: Internationalization configuration using `i18next`.
    - `main.tsx`: Application entry point.
- **public/**: Static assets including product images and logos.
- **index.html**: Root HTML template.

## Build, Test, and Development Commands
The project uses `npm` for dependency management and scripts:
- `npm run dev`: Starts the development server on `http://localhost:3000`.
- `npm run build`: Generates the production build in the `dist/` directory.
- `npm run preview`: Locally previews the production build.
- `npm run clean`: Removes the `dist/` build directory.
- `npm run lint`: Performs static type checking using `tsc`.

## Coding Style & Naming Conventions
- **Framework**: React 19 with functional components and hooks.
- **Styling**: Tailwind CSS 4 using utility classes directly in JSX.
- **Icons**: Uses `@iconify/react` and `lucide-react`.
- **Animations**: Powered by `motion/react` (Framer Motion).
- **Internationalization**: Managed via `react-i18next`. Translation keys are defined in `i18n.ts` and consumed via the `t` function.
- **Configuration**: Environment variables (e.g., `GEMINI_API_KEY`) should be placed in `.env.local`.

## Testing Guidelines
No automated testing framework is currently configured. Use `npm run lint` for type-level verification.
