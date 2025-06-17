# SamuraiSwap - Trading Widget 🏖️⚔️

A modern React + TypeScript trading widget application with a summer vacation and trading/finance theme, featuring a charming samurai bot mascot.

## 🌟 Features

### Core Functionality

- **Token Swap Form**: Intuitive interface for swapping tokens with real-time price calculation
- **Orders Management**: Comprehensive list view with infinite scroll and status tracking
- **Order Details**: Detailed transaction information and history
- **Dark/Light Mode**: Seamless theme switching with persistent preferences

### User Experience

- **Responsive Design**: Mobile-first approach with tablet and desktop optimizations
- **Summer Theme**: Bright, cheerful colors with beach and trading icons
- **Samurai Mascot**: Animated SVG samurai bot throughout the interface
- **Infinite Scroll**: Smooth loading of historical orders
- **Real-time Updates**: Live order status and price updates

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4 (latest)
- **Routing**: React Router DOM
- **State Management**: React Context + useReducer
- **Icons**: Lucide React
- **Development**: ESLint + TypeScript compiler

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

## 🎨 Design System

### Color Palette

- **Primary**: Dark Gray (`#1f2937`) and Pink (`#ec4899`)
- **Summer Accents**: Yellow (`#fbbf24`), Ocean Blue (`#06b6d4`)
- **Trading Colors**: Green (`#10b981`), Red (`#ef4444`)

### Typography

- **Font Family**: Inter (system fallback)
- **Responsive Scale**: Mobile-first with fluid typography

### Components

- **Consistent Theming**: All components respect dark/light mode
- **Accessible**: Focus states and ARIA labels
- **Responsive**: Mobile, tablet, and desktop breakpoints

## 📱 Pages & Navigation

### Home Page (`/`)

- Hero section with samurai bot and summer messaging
- Central swap form with token selection and amount inputs
- Feature highlights and trading statistics
- Real-time price calculation and slippage settings

### Orders Page (`/orders`)

- Infinite scroll list of all swap orders
- Sortable by status (pending, completed, cancelled)
- Action buttons for viewing details and cancelling orders
- Mobile-optimized table view

### Order Details Page (`/orders/:orderId`)

- Comprehensive transaction information
- Status indicators and progress tracking
- Copy-to-clipboard functionality for IDs
- Navigation back to orders list

## 🏗️ Architecture

### State Management

- **AppContext**: Global state using React Context + useReducer
- **Order Management**: Add, cancel, and update order statuses
- **Theme Persistence**: Dark/light mode preferences

### Component Structure

```
src/
├── components/
│   ├── Layout.tsx          # Main layout with navigation
│   └── SwapForm.tsx        # Token swap interface
├── pages/
│   ├── Home.tsx            # Landing page with swap form
│   ├── Orders.tsx          # Orders list with infinite scroll
│   └── OrderDetails.tsx    # Individual order information
├── context/
│   └── AppContext.tsx      # Global state management
└── App.tsx                 # Root component with routing
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

## 🏖️ Summer Theme Elements

- **Emojis**: 🏖️ ⚔️ 🌞 💰 🌴 throughout the interface
- **Samurai Bot**: Custom SVG with sword and coin
- **Vacation Vibes**: Beach-inspired color palette
- **Trading Spirit**: Professional finance aesthetics
- **Playful Copy**: "Trade with Honor", "Summer Trading Season"

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

### Code Style

- TypeScript for type safety
- Functional components with hooks
- Tailwind for styling (minimal custom CSS)
- ESLint for code quality

### Best Practices

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

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Summer vibes inspired by beach vacation aesthetics
- Samurai culture for the honor-based trading philosophy
- Modern DeFi protocols for swap functionality inspiration
- React and Tailwind communities for excellent tooling

---

**Trade with Honor, Profit with Wisdom** 🏖️⚔️
