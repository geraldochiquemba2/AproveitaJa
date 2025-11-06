# Aproveita Já - Marketplace Design Guidelines

## Design Approach
**Reference-Based**: Drawing from discount marketplaces (Too Good To Go, Flashfood, Mercado Livre) combined with urgency-driven e-commerce patterns. Mobile-first design emphasizing speed, trust, and time-sensitive deals.

## Typography System

### Font Families
- **Primary**: Inter (Medium 500, SemiBold 600, Bold 700)
- **Secondary**: System fonts for speed (-apple-system, BlinkMacSystemFont)

### Hierarchy
- **Hero Headline**: 3xl-5xl, font-weight 700
- **Product Titles**: lg-xl, font-weight 600
- **Prices/Discounts**: 2xl-3xl, font-weight 700 (discounts), line-through for original
- **Body Text**: sm-base, font-weight 400-500
- **Countdown Timers**: lg-xl, font-weight 600, tabular-nums
- **Labels/Categories**: xs-sm, font-weight 500, uppercase tracking-wide

## Layout System

### Spacing Units
Core spacing: **2, 4, 6, 8, 12, 16** (Tailwind units)
- Tight spacing: 2, 4 (product cards, compact mobile)
- Standard: 6, 8 (most components)
- Generous: 12, 16 (section separation)

### Grid System
- **Container**: max-w-7xl, px-4 md:px-6
- **Product Grid**: grid-cols-2 md:grid-cols-3 lg:grid-cols-4, gap-4 md:gap-6
- **Mobile Priority**: Single-column forms, two-column product grids

## Component Library

### Navigation
- **Sticky Header**: Solid background (no transparency), shadow on scroll
- **Logo**: Left-aligned with tagline "Economize Antes que Expire"
- **Icons**: Cart counter badge, user profile, search icon
- **Bottom Nav (Mobile)**: Fixed 4-icon navigation (Home, Categories, Favorites, Profile)
- **Desktop**: Horizontal menu with search bar integrated

### Hero Section (Homepage)
- **Height**: 60vh mobile, 70vh desktop
- **Image**: High-quality photo of fresh products/happy shoppers
- **Overlay**: Dark gradient (top to bottom, opacity 40-60%)
- **Content**: Bold headline + value proposition + search bar or CTA
- **CTA Button**: Backdrop-blur, semi-transparent background (bg-white/20), px-8 py-4, bold text

### Product Cards
- **Structure**: Image (square 1:1), Badge (discount %), Title, Original Price (strikethrough), New Price, Countdown Timer, Store Name
- **Image**: Lazy-loaded, object-cover, rounded corners (rounded-lg)
- **Discount Badge**: Absolute top-right, rounded-full, px-3 py-1, bold text
- **Countdown**: Icon + time remaining (e.g., "Expira em 2 dias"), urgent styling for <24h
- **Hover**: Subtle shadow increase (no scale to avoid layout shift on mobile)

### Search & Filters
- **Search Bar**: Full-width on mobile, rounded-full, px-6 py-3, icon left
- **Filter Pills**: Horizontal scroll on mobile, categories as rounded-full chips
- **Sort Dropdown**: Right-aligned, options for Price, Discount %, Expiration Date

### Product Detail Page
- **Image Gallery**: Swipeable carousel (mobile), grid (desktop), 4:3 aspect ratio
- **Info Block**: Product name, store name with verification badge, countdown timer prominent
- **Pricing**: Large discount price, smaller strikethrough original, percentage savings badge
- **Action Buttons**: "Comprar Agora" (primary, full-width mobile) + "Adicionar ao Carrinho" (secondary)
- **Details Accordion**: Ingredients/Description, Nutritional Info, Store Location/Hours

### Store/Seller Dashboard
- **Overview Cards**: Active Listings, Total Sales, Expiring Soon (grid-cols-1 md:grid-cols-3)
- **Product Management Table**: Sortable columns (Name, Original Price, Discount, Expiration, Status)
- **Add Product Form**: Two-column on desktop, image upload prominent, expiration date picker with warning
- **Quick Actions**: Bulk edit discounts, mark as sold, extend listing

### Buyer Account
- **Order History**: Cards with product image, purchase date, pickup/delivery status
- **Favorites Grid**: Same as product grid, heart icon to remove
- **Saved Searches**: Chips with notification toggle for new matches

### Admin Panel
- **Order Coordination**: Kanban board (Pending → Confirmed → Ready → Completed)
- **Logistics View**: Map integration showing delivery routes, filter by area
- **Vendor Management**: Approval queue, verification status, performance metrics
- **Analytics Dashboard**: Charts for sales, popular categories, waste reduction stats

### Authentication
- **Phone Login**: Large input field for phone number, country code dropdown (+244 Angola)
- **OTP Entry**: 4-6 digit code boxes, auto-focus progression
- **Profile Setup**: Avatar upload, name, delivery address with map picker

### Checkout Flow
- **Cart Summary**: Sticky on desktop, product list with quantities, running total
- **Pickup/Delivery Toggle**: Large radio buttons with icons, delivery fee indication
- **Address Input**: Autocomplete for known areas in Angola, map confirmation
- **Payment Methods**: Mobile money (prominent), card (if available), cash on pickup
- **Confirmation**: Order number large, pickup/delivery details, countdown for pickup window

### Footer
- **Links**: Categories, About, Sellers, Contact, Terms
- **Social Proof**: Trust badges, download stats, waste reduction counter
- **Newsletter**: Single-line email input with submit

## Images

### Hero Image
High-energy photo of diverse fresh products (fruits, bread, dairy) or happy Angolan shoppers with shopping bags. Warm, inviting, natural lighting. Horizontal 16:9, minimum 1600x900px.

### Product Images
Clear, well-lit photos on white/neutral background. Multiple angles for detail page. Consistent square 1:1 aspect ratio for grid uniformity.

### Category Headers
Representative product collages for each category (Bakery, Dairy, Produce, etc.). 3:1 wide banner format.

### Trust Indicators
Store verification badges, delivery partner logos, payment method icons.

## Interactions

- **Pull to Refresh**: Product listings on mobile
- **Countdown Updates**: Live timers tick down, color change at <6 hours
- **Add to Cart**: Brief success animation, cart badge bounce
- **Image Zoom**: Pinch on mobile, click on desktop
- **No Carousels**: Stack images or use horizontal scroll containers instead

## Page Structure

**Homepage**: Hero → Urgent Deals (expiring <24h) → Categories → Featured Stores → How It Works → Download App CTA
**Product Listings**: Filter Bar → Product Grid → Load More
**Product Detail**: Gallery → Info → Seller Details → Similar Products
**Seller Dashboard**: Stats Overview → Active Listings Table → Add Product
**Admin**: Orders Kanban → Vendor List → Analytics
**Checkout**: Cart Review → Delivery/Pickup → Payment → Confirmation

## Accessibility
- High contrast for countdown timers and pricing
- Focus states: 2px ring on all inputs and buttons
- Screen reader labels for icons and discount badges
- Touch targets minimum 44x44px on mobile