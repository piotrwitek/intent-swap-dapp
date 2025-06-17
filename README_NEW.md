# IntentSwap - Cyber Trading Widget

A modern React + TypeScript trading widget with a cyber/futuristic theme and digital realm honor code.

## 🌟 Features

### Core Functionality

- **Swap Form**: Token selection, amount input, slippage settings, order type selection
- **Orders List**: Infinite scroll, status filtering, action buttons
- **Order Details**: Detailed view with transaction information
- **Theme Toggle**: Persistent dark/light mode switching
- **Responsive Navigation**: Desktop top nav + mobile bottom nav

### User Experience

- **Cyber/Futuristic Theme**: Digital elements, cyberpunk/finance aesthetic, playful but professional copy
- **Responsive Design**: Mobile-first, 3 breakpoints (mobile, tablet, desktop)
- **Dark/Light Mode**: Toggle support, persistent preference
- **Consistent Theming**: All components use Tailwind classes and respect theme

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **Routing**: React Router DOM
- **State Management**: React Context + useReducer
- **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd sdk-swap-widget
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Theme & Design

### Color Palette

- **Primary**: Dark Gray (`#1f2937`) and Pink (`#ec4899`)
- **Accent**: Summer yellow (`#fbbf24`), ocean blue (`#06b6d4`), trading green (`#10b981`), trading red (`#ef4444`)

### Typography

- **Font Family**: Inter (system fallback)
- **Responsive Scale**: Mobile-first with fluid typography

### Components

- **Consistent Theming**: All components respect dark/light mode
- **Accessible**: Focus states and ARIA labels
- **Responsive**: Mobile, tablet, and desktop breakpoints

## 📱 Pages & Navigation

### Home Page (`/`)

- Central swap form with token selection, amount input, slippage, and order type
- Cyber gradient hero and digital copy

### Orders Page (`/orders`)

- Infinite scroll list of all swap orders
- Status filtering and action buttons
- Mobile-optimized layout

### Order Details Page (`/orders/:orderId`)

- Detailed transaction information
- Status indicators and transaction breakdown
- Navigation back to orders list

## 🏗️ Architecture

### State Management

- **AppContext**: Manages global state (orders, theme, user preferences, form state)
- **Order Management**: Add, cancel, and update order statuses
- **Theme Persistence**: Dark/light mode preferences

### Component Structure

```
src/
  components/      # Reusable UI components (SwapForm, Layout, etc.)
  pages/           # Home, Orders, OrderDetails
  context/         # AppContext for global state
  utils/           # Formatting and helpers
  App.tsx          # Root component with routing
```

## 🎯 Key Features Deep Dive

### Swap Form

- Token selection from popular cryptocurrencies
- Real-time amount calculation and exchange rates
- Slippage tolerance settings (0.1%, 0.5%, 1.0%)
- Fee calculation and total cost display
- Form validation and success feedback

### Infinite Scroll Orders

- Intersection Observer API for performance
- Batch loading of 15 orders per request
- Loading states and end-of-data indicators
- Mobile-responsive table design

### Theme System

- CSS custom properties for consistent theming
- Tailwind's dark mode with class strategy
- Smooth transitions between themes
- System preference detection

## 🔧 Customization

### Adding New Tokens

Update the `POPULAR_TOKENS` array in `SwapForm.tsx`:

```typescript
const POPULAR_TOKENS = [
  { symbol: "NEW", name: "New Token", icon: "🪙" },
  // ... existing tokens
];
```

### Modifying Colors

Update the CSS custom properties in `src/index.css`:

```css
:root {
  --color-primary-pink: #ec4899;
  --color-primary-dark: #1f2937;
  /* ... other colors */
}
```

## 📦 Build & Deployment

### Production Build

```bash
npm run build
```

The build creates optimized static files in the `dist/` directory.

### Deployment Options

- **Vercel**: Connect your repository for automatic deployments
- **Netlify**: Drag and drop the `dist/` folder
- **GitHub Pages**: Use GitHub Actions for automated deployment
- **Any Static Host**: Upload the `dist/` folder contents

## 🧪 Development

- TypeScript for type safety
- Functional components with hooks
- Tailwind for styling (minimal custom CSS)
- ESLint for code quality
- Mobile-first responsive design
- Accessible components with proper ARIA labels
- Performance optimized with lazy loading
- Error boundaries for robust user experience

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- Modern DeFi protocols for swap functionality inspiration
- React and Tailwind communities for excellent tooling

---

**Trade with Honor, Profit with Wisdom** 🏖️⚔️
