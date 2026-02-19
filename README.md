# Science MCQ Hub - RBSE Class 10

A comprehensive interactive platform for RBSE Class 10 Science with **650 high-quality MCQs** across 13 chapters.

**Made with ❤️ by Naman**

## Features

✨ **650 Curated Questions**
- 30 original questions per chapter
- 20 ultra-hard board-exam-level questions per chapter
- Difficulty levels: Easy, Medium, Hard, Ultra-Hard

🎯 **Smart Learning Features**
- **Difficulty Filtering**: Practice specific difficulty levels
- **Spaced Repetition Algorithm**: SM-2 algorithm for optimal learning
- **Progress Tracking**: Track your learning progress across chapters
- **Detailed Explanations**: Every question includes comprehensive explanations

📊 **Analytics Dashboard**
- Visual data representation of question distribution
- Chapter-wise performance metrics
- Cumulative question coverage tracking
- Real-time accuracy statistics

🎨 **User Experience**
- Clean, modern interface with Tailwind CSS
- Mobile-responsive design
- Dark mode support
- Smooth animations and transitions
- Real-time score tracking

## Chapters Covered

1. Chemical Reactions and Equations
2. Acids, Bases and Salts
3. Metals and Non-metals
4. Carbon and its Compounds
5. Life Processes
6. Control and Coordination
7. How do Organisms Reproduce?
8. Heredity
9. Light – Reflection and Refraction
10. The Human Eye and the Colourful World
11. Electricity
12. Magnetic Effects of Electric Current
13. Our Environment

## Tech Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS 4
- **Routing**: Wouter
- **UI Components**: shadcn/ui
- **Charts**: Recharts
- **Build Tool**: Vite
- **Deployment**: Vercel

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd science-mcq-hub

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## Deployment on Vercel

### Option 1: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Option 2: GitHub Integration

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Select your GitHub repository
5. Vercel will automatically detect the configuration
6. Click "Deploy"

### Environment Variables

No environment variables are required for this project as it's a static frontend application.

## Project Structure

```
science-mcq-hub/
├── client/
│   ├── src/
│   │   ├── pages/           # Page components
│   │   ├── components/      # Reusable UI components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── data/            # MCQ data files (chapter1.json - chapter13.json)
│   │   ├── App.tsx          # Main app component
│   │   └── index.css        # Global styles
│   ├── public/              # Static assets
│   └── index.html           # HTML entry point
├── vercel.json              # Vercel deployment config
├── package.json             # Dependencies and scripts
└── README.md                # This file
```

## Key Features Explained

### 1. Difficulty Filtering
- Filter questions by difficulty level: All, Easy, Medium, Hard, Ultra-Hard
- Practice targeted question sets for exam preparation
- View statistics for each difficulty level

### 2. Spaced Repetition Algorithm
- Implements SM-2 algorithm for optimal learning
- Automatically schedules questions for review
- Tracks review history and accuracy
- Adapts difficulty based on performance

### 3. Progress Tracking
- Real-time score calculation
- Accuracy percentage display
- Chapter-wise performance metrics
- Review statistics and recommendations

### 4. Analytics Dashboard
- Visual charts showing question distribution
- Difficulty level breakdown
- Cumulative question coverage
- Chapter-wise question statistics

## Scripts

```bash
# Development
npm run dev          # Start dev server with HMR

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run check        # TypeScript type checking
npm run format       # Format code with Prettier
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimizations

- Code splitting and lazy loading
- Optimized bundle size (~150KB gzipped)
- Efficient localStorage usage for spaced repetition
- Progressive image loading
- CSS-in-JS with Tailwind for minimal CSS

## Data Storage

- Quiz progress and spaced repetition data stored in browser localStorage
- No backend required - fully client-side application
- Data persists across browser sessions

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for educational purposes.

## Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

**Made with ❤️ by Naman**

RBSE Class 10 Science MCQ Hub | 650 Questions | 13 Chapters | Spaced Repetition Learning
