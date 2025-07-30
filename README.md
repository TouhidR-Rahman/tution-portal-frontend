# Tuition Portal Frontend

A modern React application built with Vite for managing tuition centers and tutoring opportunities.

## Features

- User authentication and registration
- Tuition center management
- Tutor opportunity browsing
- Application management
- Rating and review system
- Super admin dashboard

## Tech Stack

- **React 18** - Frontend framework
- **Vite** - Build tool and development server
- **React Router DOM** - Client-side routing
- **Redux Toolkit** - State management
- **Tailwind CSS** - Styling
- **Radix UI** - UI components
- **Axios** - HTTP client
- **Framer Motion** - Animations

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd tution-portal-frontend
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

Edit the `.env` file with your backend API URL.

4. Start the development server:

```bash
npm run dev
```

## Environment Variables

- `VITE_API_BASE_URL` - Backend API base URL (default: https://tution-portal-backend.vercel.app)

## Build and Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

1. Install Vercel CLI:

```bash
npm install -g vercel
```

2. Deploy:

```bash
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

### Deploy to Other Platforms

The built files will be in the `dist` directory and can be deployed to any static hosting service like Netlify, GitHub Pages, or AWS S3.

## Project Structure

```
src/
├── components/          # React components
│   ├── admincomponent/  # Admin-specific components
│   ├── authentication/ # Auth components
│   ├── components_lite/ # Main app components
│   └── ui/             # Reusable UI components
├── hooks/              # Custom React hooks
├── lib/                # Utility libraries
├── redux/              # Redux store and slices
└── utils/              # Utility functions
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request
