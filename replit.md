# Aproveita Já - Marketplace Platform

## Overview

Aproveita Já is a marketplace platform connecting stores and supermarkets with buyers in Angola, focusing on products near expiration dates or surplus inventory. The platform enables vendors to list products at minimum 50% discounts, with automatic expiration 10 days after listing. Buyers can browse, purchase, and arrange pickup or delivery, while administrators coordinate logistics through a centralized panel. The platform adds a 15% marketplace fee to all transactions.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- React with TypeScript for type safety
- Vite as build tool and development server
- Wouter for lightweight client-side routing
- TanStack Query (React Query) for server state management
- Tailwind CSS with shadcn/ui component library for styling

**Design System:**
- Mobile-first responsive design optimized for Angola market
- Custom theme following design_guidelines.md (Inter font family, urgency-driven UI patterns)
- Component library based on Radix UI primitives with custom styling
- Three distinct user interfaces: Buyer marketplace, Seller dashboard, Admin panel

**State Management:**
- Authentication context (AuthProvider) managing user sessions and login state
- React Query for API data fetching, caching, and mutations
- Session-based authentication with HTTP-only cookies

**Key UI Patterns:**
- Hero sections with search functionality for product discovery
- Product cards displaying discount percentages, countdown timers, and urgency indicators
- Role-based navigation showing different options for buyers, sellers, and administrators
- Form validation using React Hook Form with Zod schemas

### Backend Architecture

**Technology Stack:**
- Express.js server with TypeScript
- Session-based authentication using express-session with PostgreSQL storage (connect-pg-simple)
- Bcrypt for password hashing
- Zod for runtime validation matching database schemas

**API Structure:**
- RESTful endpoints under `/api` prefix
- Role-based middleware (`requireAuth`, `requireRole`) protecting routes
- Distinct endpoints for buyers, sellers, and administrators
- JSON request/response format with structured error handling

**Key Endpoints:**
- `/api/register` and `/api/login` for authentication
- `/api/products` for product listing and management
- `/api/stores` for store registration and details
- `/api/orders` for order placement and tracking
- `/api/orders/:id/status` for admin order status updates

**Business Logic:**
- Minimum 50% discount validation on product creation
- Automatic product expiration after 10 days
- 15% marketplace fee calculation
- Location data handling (GPS coordinates for admin only)

### Data Storage

**Database:**
- PostgreSQL via Neon serverless (configurable via DATABASE_URL)
- Drizzle ORM for type-safe database queries
- WebSocket connection pooling for Neon serverless compatibility

**Schema Design:**

**Users Table:**
- Supports three roles: buyer, seller, admin
- Phone number as primary identifier (unique)
- Optional address and GPS coordinates for buyers
- Hashed password storage

**Stores Table:**
- Linked to seller users via userId
- Contains supervisor phone (admin-visible only)
- Exact location stored (GPS coordinates, admin-visible only)

**Products Table:**
- Linked to stores via storeId
- Price fields: originalPrice and discountedPrice
- Expiration date and creation timestamp for auto-expiration logic
- Active/inactive flag (isActive)
- Image URL storage

**Orders Table:**
- Links buyers to products
- Delivery type: pickup or delivery
- Delivery address and GPS coordinates for logistics
- Order status tracking (pending, confirmed, completed, cancelled)
- Total price including marketplace fee

**Data Access Layer:**
- Storage interface (IStorage) with in-memory and database implementations
- Abstraction allows for testing and future storage backend changes

### Authentication & Authorization

**Authentication:**
- Phone-based registration and login
- Session management with secure HTTP-only cookies
- Fixed admin credentials (phone: 9123456789, password: 123456789)
- Password hashing using bcryptjs

**Authorization:**
- Three-tier role system: buyer, seller, admin
- Middleware-based route protection
- Role-specific UI rendering on frontend
- Buyers: Can view products and place orders
- Sellers: Can manage stores and products
- Admins: Full visibility including protected contact and location data

**Information Visibility:**
- Public: Product details, store names, discounted prices
- Buyer-only: Full product details after login
- Admin-only: Supervisor contacts, exact store locations, buyer delivery details

## External Dependencies

### Third-Party Services

**Database:**
- Neon Serverless PostgreSQL (@neondatabase/serverless)
- Requires DATABASE_URL environment variable
- WebSocket support for serverless connections

**UI Components:**
- Radix UI component primitives (18+ packages for accessible components)
- shadcn/ui configuration (components.json) for component generation
- Tailwind CSS for utility-first styling

**Development Tools:**
- Vite with React plugin for fast development
- Replit-specific plugins (cartographer, dev-banner, runtime-error-modal) for Replit environment
- ESBuild for production server bundling

**Image Assets:**
- Generated images stored in attached_assets/generated_images/
- Hero images for marketplace and architecture themes
- Product showcase images

### Environment Variables

**Required:**
- `DATABASE_URL`: PostgreSQL connection string (Neon serverless format)
- `SESSION_SECRET`: Secret key for session encryption (defaults to placeholder in development)
- `NODE_ENV`: Environment flag (development/production)

**Optional:**
- `REPL_ID`: Replit-specific identifier for development plugins

### Build & Deployment

**Development:**
- `npm run dev`: Starts Express server with Vite middleware for HMR
- `npm run check`: TypeScript compilation check without emission
- `npm run db:push`: Push Drizzle schema changes to database

**Production:**
- `npm run build`: Vite frontend build + ESBuild server bundle
- `npm start`: Run production server from dist/
- Static assets served from dist/public
- Server bundle in dist/index.js

### Migration Strategy

**Database Migrations:**
- Drizzle Kit configured for migrations (drizzle.config.ts)
- Migrations output to ./migrations directory
- Schema defined in shared/schema.ts
- Seed script (server/seed.ts) creates initial admin user