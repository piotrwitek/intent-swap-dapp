<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# IntentSwap - Trading Widget

## Project Overview

This is a React + TypeScript trading widget application with a cyber / futuristic trading theme, featuring a digital realm honor code.

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **Routing**: React Router DOM
- **State Management**: React Context + useReducer
- **Icons**: Lucide React

## Theme & Design

- **Primary Colors**: Dark gray (`#1f2937`) and Pink (`#ec4899`)
- **Accent Colors**: Summer yellow (`#fbbf24`), ocean blue (`#06b6d4`), trading green (`#10b981`), trading red (`#ef4444`)
- **Responsive**: Mobile-first design with 3 breakpoints (mobile, tablet, desktop)
- **Dark/Light Mode**: Toggle support using Tailwind's dark mode

## Architecture

- **AppContext**: manages global state (orders, theme, user preferences, form state)
- **Layout**: Main layout component wraps all pages
- **Pages**: Home (swap form), Orders (infinite scroll list), Order Details
- **Components**: Reusable UI components with consistent theming

## Code Style

- Use TypeScript interfaces for all prop types
- Prefer functional components with hooks
- Use Tailwind classes for styling (avoid custom CSS when possible)
- Implement responsive design with Tailwind breakpoint classes
- Follow React best practices for state management and lifecycle

## Features

- **Swap Form**: Token selection, amount input, slippage settings, order type selection
- **Orders List**: Infinite scroll, status filtering, action buttons
- **Order Details**: Detailed view with transaction information
- **Theme Toggle**: Persistent dark/light mode switching
- **Responsive Navigation**: Desktop top nav + mobile bottom nav

## Cyber/Futuristic Theme Elements

- Include digital elements in key interactions
- Cyberpunk + financial trading aesthetic
- Playful but professional tone in copy text

## Numeric Input Handling

- For all numeric text inputs, do not use min, max, or step attributes unless native HTML validation is required. Use JS validation instead.
