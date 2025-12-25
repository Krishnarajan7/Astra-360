# Astra 360 - Digital Agency Portfolio 🚀

A modern, responsive digital agency portfolio website built with React, TypeScript, and Tailwind CSS. Features stunning animations, interactive 3D folder navigation, and a polished Apple-inspired design aesthetic.



## ✨ Features

### 🎨 Design & UI
- **Modern Apple-inspired aesthetic** with clean typography and generous whitespace
- **Custom design system** with semantic color tokens and HSL-based theming
- **Dark/Light mode support** with smooth transitions
- **Responsive design** optimized for all devices (mobile, tablet, desktop)
- **Custom scrollbar styling** for a polished look

### 🎭 Animations & Interactions
- **Framer Motion animations** throughout the site
- **Interactive 3D folder navigation** - hover to preview projects, click to navigate
- **Glowing card effects** on service cards with mouse-following glow
- **Floating elements** and gradient animations in the hero section
- **Smooth scroll-to-top** on page navigation
- **Staggered fade-up animations** for content reveals

### 📁 Portfolio System
- **Category-based organization** (Web Development, Digital Marketing, Video Production, Branding)
- **Interactive folder previews** - hover over folders to see project thumbnails
- **Two-level navigation**:
  - Click folder → View all projects in category
  - Click project preview → Go directly to project details
- **Dedicated project pages** with full project information

### 🛠️ Services Showcase
- Web Development
- Digital Marketing
- Performance Ads
- Video Production
- Branding
- Content Creation

## 🚀 Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | UI framework |
| **TypeScript** | Type safety |
| **Vite** | Build tool & dev server |
| **Tailwind CSS** | Utility-first styling |
| **Framer Motion** | Animations |
| **React Router DOM** | Client-side routing |
| **shadcn/ui** | UI component library |
| **Lucide React** | Icon library |

## 📦 Project Structure

```
src/
├── components/
│   ├── ui/                    # shadcn/ui & custom components
│   │   ├── button.tsx
│   │   ├── clickable-folder.tsx
│   │   ├── glowing-effect.tsx
│   │   ├── expandable-chat.tsx
│   │   └── ...
│   ├── Navigation.tsx         # Main navigation bar
│   ├── HeroSection.tsx        # Landing hero with animations
│   ├── GlowingServicesGrid.tsx # Services with glow effects
│   ├── PortfolioFolders.tsx   # Interactive folder grid
│   ├── AboutSection.tsx       # About company section
│   ├── WorkSection.tsx        # Featured work
│   ├── CTASection.tsx         # Call-to-action
│   ├── Footer.tsx             # Site footer
│   └── ScrollToTop.tsx        # Scroll restoration
├── pages/
│   ├── Index.tsx              # Home page
│   ├── About.tsx              # About page
│   ├── Services.tsx           # Services page
│   ├── Work.tsx               # Portfolio overview
│   ├── WorkCategory.tsx       # Category project listing
│   ├── Project.tsx            # Individual project page
│   ├── Contact.tsx            # Contact page
│   └── NotFound.tsx           # 404 page
├── hooks/                     # Custom React hooks
├── lib/                       # Utilities
├── index.css                  # Global styles & design tokens
└── App.tsx                    # Router configuration
```

## 🎨 Design System

### Color Tokens
The project uses a comprehensive HSL-based color system defined in `index.css`:

```css
/* Core tokens */
--background, --foreground
--card, --card-foreground
--primary, --primary-foreground
--secondary, --secondary-foreground
--muted, --muted-foreground
--accent, --accent-foreground

/* Brand colors */
--astra-navy, --astra-charcoal
--astra-teal, --astra-purple, --astra-orange

/* Folder colors */
--folder-back, --folder-front, --folder-tab
```

### Typography
- **Font Family**: Inter (Google Fonts)
- **Heading weight**: 600 (semibold)
- **Letter spacing**: Tight (-0.03em for headings)

### Custom Utilities
```css
.text-gradient      /* Colorful gradient text */
.bg-gradient-ring   /* Conic gradient background */
.bg-gradient-subtle /* Subtle vertical gradient */
.animate-fade-up    /* Fade up animation */
.animate-float      /* Floating animation */
.hover-lift         /* Lift on hover effect */
```

## 🏃‍♂️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm or bun

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd <project-name>

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 📱 Pages & Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Landing page with all sections |
| `/about` | About | Company information |
| `/services` | Services | Detailed service offerings |
| `/work` | Work | Portfolio overview |
| `/work/:category` | Category | Projects by category |
| `/project/:slug` | Project | Individual project details |
| `/contact` | Contact | Contact form |

## 🔧 Customization

### Adding New Projects

1. Update `portfolioData` in `src/components/PortfolioFolders.tsx`:
```typescript
{
  title: "Category Name",
  projectCount: 3,
  route: "/work/category-slug",
  previews: [
    { 
      image: "image-url", 
      title: "Project Name", 
      route: "/project/project-slug" 
    },
  ],
}
```

2. Add corresponding data in `src/pages/WorkCategory.tsx`

### Adding New Services

Update the `services` array in `src/components/GlowingServicesGrid.tsx`:
```typescript
{
  icon: IconComponent,
  title: "Service Name",
  description: "Service description.",
  area: "grid-area-classes",
}
```

### Modifying Colors

Edit CSS variables in `src/index.css` under `:root` (light) or `.dark` (dark mode).

## 🌐 Deployment

Build the project and deploy the `dist` folder:
```bash
npm run build
# Deploy dist/ to Vercel, Netlify, etc.
```

## 📄 License

This project is private and proprietary.

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

---
