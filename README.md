# 💰 Expense Manager

A modern, responsive expense tracking and budget management application built with React, TypeScript, and Tailwind CSS.

🔗 **Live Demo**: [https://shamveelgit.github.io/expense-tracker-webapp](https://shamveelgit.github.io/expense-tracker-webapp)

## ✨ Features

- 📊 **Dashboard Overview**: Visual representation of your financial status with circular charts
- 💸 **Expense Tracking**: Add, view, search, and export expenses to CSV
- 💰 **Budget Management**: Create budgets, add amounts, and monitor spending
- 🔍 **Smart Search**: Real-time search and filtering across expenses
- 📱 **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- 🎨 **Modern UI**: Clean interface with shadcn UI colors and smooth animations
- 💾 **Local Storage**: All data persists in browser localStorage

## 🚀 Tech Stack

- **React 19.1.1** - UI framework
- **TypeScript** - Type safety
- **Vite 7.1.7** - Build tool with SWC
- **Tailwind CSS 4.1.14** - Styling
- **React Router 7.9.4** - Navigation
- **Lucide React** - Icons
- **Framer Motion** - Animations

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/Shamveelgit/expense-tracker-webapp.git

# Navigate to project directory
cd expense-tracker-webapp

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🛠️ Available Scripts

```bash
# Development server with network access
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 📁 Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── ui/          # Base UI components (sidebar, etc.)
│   ├── AddExpenseModal.tsx
│   ├── AddBudgetModal.tsx
│   ├── BudgetCard.tsx
│   └── ...
├── pages/           # Page components
│   ├── Dashboard.tsx
│   ├── Expenses.tsx
│   ├── Budgets.tsx
│   ├── Analytics.tsx
│   ├── Profile.tsx
│   └── Settings.tsx
├── lib/            # Utility functions
│   └── storage.ts  # localStorage management
└── App.tsx         # Main app component
```

## 🌐 Deployment to GitHub Pages

The app is configured to deploy to GitHub Pages automatically:

1. **Build the app**:
   ```bash
   npm run build
   ```

2. **Deploy**: The built files are in the `docs` folder, which GitHub Pages serves from.

3. **GitHub Settings**:
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: `main` → `/docs` folder

## 🎯 Key Features Explained

### Dashboard
- Circular progress chart showing spending vs remaining budget
- Financial summary cards (Income, Expenses, Savings)
- Quick overview of current budgets
- Recent expenses table with search and sort

### Expenses Page
- Add new expenses with category selection
- Search expenses by company, budget, or category
- Sort by date, amount, or category
- Export expenses to CSV
- Fully responsive table and card views

### Budgets Page
- Create and manage budgets
- Add amounts to existing budgets
- Delete budgets with confirmation
- Visual spending indicators
- Budget summary with totals

## 🔧 Configuration

### Base URL
The app is configured for GitHub Pages deployment with base URL `/expense-tracker-webapp/` in `vite.config.ts`:

```typescript
export default defineConfig({
  base: '/expense-tracker-webapp/',
  // ...
})
```

### Router Configuration
React Router is configured with the appropriate basename in `App.tsx`:

```typescript
<Router basename="/expense-tracker-webapp">
```

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Shamveel**
- GitHub: [@Shamveelgit](https://github.com/Shamveelgit)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

Made with ❤️ by Shamveel

import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
