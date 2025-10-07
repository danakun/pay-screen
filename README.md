# Payment Screen

A modern, responsive payment interface built with React, TypeScript, and Vite.

[Live Demo](https://pay-screen.vercel.app/)

## Features

- Clean, modern UI with Roboto font family
- Multiple payment method support
- Fully responsive design
- Fast development with Vite
- TypeScript for type safety
- CSS Modules for scoped styling

## Getting Started

### Installation

```bash
# Clone the repository
git clone <your-repo-url>

# Navigate to project directory
cd pay-screen

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
```

## Testing Card Information

For testing purposes, you can use the following valid test card number:

### Mastercard

- **Card Number**: `5425 2334 3010 9903`
- **CVV/CVC**: Any 3 digits - e.g., `123`
- **Expiry Date**: Any future date - e.g., `12/26`

> **Note**: This is a test card number that passes Luhn algorithm validation. It is for development and testing purposes only. Never use real card information in development environments.

## Project Structure

```
pay-screen/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── features/
│   │   │   ├── OrderSummary/
│   │   │   └── PaymentSection/
│   │   ├── layout/
│   │   │   └── Footer/
│   │   └── ui/
│   │       ├── CardInput/
│   │       ├── LanguageSelector/
│   │       ├── PayButton/
│   │       └── PaymentMethodButton/
│   ├── App.module.css
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Technology Stack

- **React** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **CSS Modules** - Scoped styling
- **Google Fonts** - Roboto & Roboto Condensed

## Design Tokens

The project uses CSS custom properties for consistent theming:

- **Colors**: Primary blue, neutral grays, error states
- **Typography**: Roboto (400, 500 weights) + Roboto Condensed
- **Spacing**: Consistent 8px/16px scale
- **Transitions**: 200ms ease-in-out

## Support

Thank You!
