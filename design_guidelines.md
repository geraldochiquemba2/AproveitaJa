# Modern Minimalist Architecture Portfolio - Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from premium architecture portfolios (Leibal, Studio Nido, Archdaily) combined with minimalist design principles. The design emphasizes visual storytelling through large-format photography with restrained, elegant UI elements.

## Typography System

### Font Families
- **Primary (Headings)**: Montserrat (Light 300, Regular 400)
- **Secondary (Body)**: Inter (Regular 400, Medium 500)
- **Accent**: Use sparingly for special emphasis

### Hierarchy
- **Hero Headline**: 4xl-6xl (mobile to desktop), font-weight 300, tracking-tight
- **Section Titles**: 2xl-3xl, font-weight 300, uppercase with letter-spacing
- **Project Titles**: xl-2xl, font-weight 400
- **Body Text**: base-lg (16-18px), line-height relaxed (1.7)
- **Metadata/Captions**: sm-base, font-weight 400, uppercase tracking-wide

## Layout System

### Spacing Units
Primary spacing scale: **4, 8, 12, 16, 20, 24, 32** (Tailwind units)
- Micro spacing: 2, 4
- Component spacing: 8, 12, 16
- Section spacing: 20, 24, 32
- Generous vertical rhythm: py-20 (mobile), py-32 (desktop)

### Grid System
- **Container**: max-w-7xl with px-4 md:px-8
- **Project Grid**: grid-cols-1 md:grid-cols-2 lg:grid-cols-3, gap-8 md:gap-12
- **Content Width**: max-w-4xl for text-heavy sections, max-w-prose for reading content

## Component Library

### Navigation
- **Fixed header**: Minimal, transparent on hero, solid background on scroll
- **Logo**: Left-aligned, simple wordmark or icon
- **Menu**: Right-aligned horizontal list with generous spacing (gap-8 md:gap-12)
- **Links**: Uppercase, tracking-wide, sm-base size, underline on hover (subtle 1px)
- **Mobile**: Hamburger menu, full-screen overlay with large centered links

### Hero Section
- **Height**: 90vh minimum (not forced 100vh)
- **Layout**: Full-width background image with centered overlay content
- **Content**: Large headline + subtitle + single CTA button
- **Image**: High-quality architectural photography, slightly darkened overlay for text legibility
- **Button**: Backdrop blur effect (backdrop-blur-sm), semi-transparent background, px-8 py-4

### Project Grid/Gallery
- **Card Structure**: Image-first with hover overlay revealing title + year + location
- **Image Aspect**: 3:4 portrait or 16:9 landscape (consistent throughout)
- **Hover Effect**: Subtle scale (scale-105) + opacity overlay
- **Spacing**: Generous gap-8 to gap-16 between cards
- **Grid Behavior**: Single column mobile, 2-col tablet, 3-col desktop

### Project Detail Pages
- **Hero**: Full-width featured image, 60-70vh height
- **Info Bar**: Sticky or fixed bar with: Project Title, Year, Location, Type, Size
- **Gallery**: Full-width images stacked vertically with gap-12 to gap-16
- **Text Content**: max-w-3xl centered, generous line-height (1.7-1.8)
- **Alternating Layouts**: Mix full-width images with two-column image pairs

### About Section
- **Layout**: Two-column on desktop (image left, text right or vice versa)
- **Image**: Large portrait or workspace photo, 50% width on desktop
- **Bio**: max-w-prose, comfortable reading width
- **Services List**: Simple vertical list or grid with minimal styling

### Contact Section
- **Form Layout**: Single column, max-w-2xl centered
- **Input Fields**: Clean borders, generous padding (py-4 px-6), focus states with border emphasis
- **Labels**: Uppercase, tracking-wide, sm size, mb-2
- **Submit Button**: Full-width or auto-width centered, py-4 px-12
- **Side Content**: Include contact info (email, phone, address) alongside or above form

### Footer
- **Layout**: Minimal, single row with copyright + social links
- **Content**: Left-aligned copyright, right-aligned social icons
- **Spacing**: py-12 md:py-16

## Images

### Hero Image
Large, high-impact architectural photograph featuring completed project. Should establish brand aesthetic immediately. Horizontal orientation, minimum 1920x1080px.

### Project Gallery Images
8-12 high-resolution photographs per project:
- Exterior shots (daytime, dusk)
- Interior spaces emphasizing natural light
- Detail shots (materials, textures)
- Contextual/landscape integration
Consistent editing style: warm tones, high clarity, natural light emphasis.

### About Section Image
Professional workspace photo or architect portrait. Authentic, well-lit, shows personality while maintaining professionalism.

### Image Treatment
- All images: Lazy loading, WebP format
- Aspect ratios: Maintain consistency within sections
- Hover overlays: Semi-transparent with subtle gradients

## Interactions (Minimal)

- **Smooth scroll**: Between sections, subtle easing
- **Parallax**: Very subtle on hero (if at all, 0.5 speed)
- **Image hover**: Scale 1.05, transition 300-400ms
- **Navigation**: Fade in/out on scroll, smooth transition
- **No carousels**: Stack images vertically instead

## Page Structure

**Homepage**: Hero → Featured Projects (3-6) → Brief Philosophy Statement → CTA
**Portfolio**: Filter/Category Nav → Project Grid → Load More (if needed)
**Project Detail**: Hero Image → Info → Gallery (vertical stack) → Next Project
**About**: Hero/Image → Bio → Services → Team (if applicable)
**Contact**: Simple form → Info → Map (optional)

## Accessibility
- High contrast text on images (use overlays)
- Focus states: 2px outline, visible on all interactive elements
- Alt text for all architectural images with project names
- Keyboard navigation through all menus and galleries