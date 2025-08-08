# Developer Portfolio

A professional single-page software developer portfolio website built with Vue 3 (Composition API) and Vite. This portfolio features a clean, responsive design using Tailwind CSS with dark mode support.

## Features

- **Modern Tech Stack**: Vue 3 with Composition API, Vite, Tailwind CSS
- **Responsive Design**: Mobile-first approach that looks great on all devices
- **Dark Mode**: Toggle between light and dark themes with user preference memory
- **Smooth Animations**: Transitions and animations using Vue's transition components and @vueuse/motion
- **Interactive Sections**:
  - Hero section with typing effect
  - About Me with personal information
  - Projects showcase with hover effects
  - Skills categorized by technology type
  - Testimonials from clients/colleagues
  - Certifications display
  - Contact form with Formspree integration
- **Smooth Scrolling**: Navigation with smooth scrolling to sections

## Prerequisites

- Node.js (v14.x or later recommended)
- npm or yarn

## Setup Instructions

1. Clone the repository

```bash
git clone https://github.com/nohan-ahmed/portfolio-site.git
cd portfolio
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Configure Formspree

Replace the placeholder Formspree endpoint in `src/components/ContactSection.vue` with your actual endpoint:

```javascript
// Replace YOUR_FORMSPREE_ENDPOINT with your actual Formspree endpoint
const response = await fetch('https://formspree.io/f/YOUR_FORMSPREE_ENDPOINT', {
```

4. Customize content

Update the following files to personalize your portfolio:

- `src/components/HeroSection.vue`: Your name and intro
- `src/components/AboutSection.vue`: Your bio and photo
- `src/components/ProjectsSection.vue`: Your projects
- `src/components/SkillsSection.vue`: Your skills
- `src/components/TestimonialsSection.vue`: Testimonials
- `src/components/CertificationsSection.vue`: Your certifications
- `src/components/ContactSection.vue`: Your contact info and social links
- `src/components/FooterSection.vue`: Copyright info and social links

## Development

Start the development server:

```bash
npm run dev
# or
yarn dev
```

This will start the development server at `http://localhost:5173`

## Building for Production

Build the project for production:

```bash
npm run build
# or
yarn build
```

This will generate a `dist` directory with the production-ready files.

## Preview Production Build

Preview the production build locally:

```bash
npm run preview
# or
yarn preview
```

## Deployment

### Deploying to Netlify

1. Push your code to a GitHub repository
2. Log in to Netlify and click "New site from Git"
3. Select your repository
4. Use the following settings:
   - Build command: `npm run build` or `yarn build`
   - Publish directory: `dist`
5. Click "Deploy site"

### Deploying to Vercel

1. Push your code to a GitHub repository
2. Log in to Vercel and click "New Project"
3. Import your repository
4. Use the following settings:
   - Framework Preset: Vue.js
   - Build Command: `npm run build` or `yarn build`
   - Output Directory: `dist`
5. Click "Deploy"

## Customization

### Changing Colors

The color scheme can be customized in the `tailwind.config.js` file. The current configuration includes primary, secondary, and dark color palettes.

### Adding New Sections

To add a new section:

1. Create a new component in the `src/components` directory
2. Import and add the component to `App.vue`
3. Add a navigation link in `Navbar.vue`

## License

MIT
