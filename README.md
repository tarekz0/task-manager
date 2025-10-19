# 🧩 Tasks Management App

A **production-grade React + TypeScript** application demonstrating frontend leadership skills, scalable architecture, and clean UI implementation.

This solution covers everything requested in the assignment — from CRUD operations and dashboards to design system, state management, and CI automation.

---

## 🌟 Overview

The **Tasks Management App** allows users to create, update, delete, and monitor tasks in an elegant, responsive dashboard.

Key highlights:
- ⚡ Built with **React 18 + Vite + TypeScript**
- 🎨 Custom **Design System** (Buttons, Inputs, Modals, Tables)
- 📊 Interactive **Dashboard with Recharts**
- 🔧 Mock REST API using **MSW (Mock Service Worker)**
- 💾 Predictable state with **Zustand**
- ✅ Validation with **React Hook Form + Zod**
- 🧱 Storybook documentation
- 🧪 Unit and E2E tests
- 🧰 ESLint + Prettier + GitHub Actions CI

---

## 🧠 Core Features

### 🧾 Task Management
- Full CRUD (Create, Read, Update, Delete)
- Client-side search, sorting, filtering, and pagination
- Modal-based form with validation
- Responsive table (desktop) + card view (mobile)
- Accessible error handling and field feedback

### 📊 Dashboard
- Displays meaningful KPIs:
  - Total tasks
  - Open vs Closed ratio
  - Average estimated hours
  - Overdue tasks
- Includes:
  - **Tasks per Status (Pie Chart)**
  - **Tasks per Category (Bar Chart)**
- Fully responsive with smooth gradients and dark-mode support

### 🎨 Design System
Reusable, accessible components:
- **Button** — Variants (primary, secondary, ghost), supports icons  
- **Input**, **Select**, **FormField** — Validation ready  
- **Modal** — Keyboard + focus-trap  
- **Table**, **Card**, **Badge** — Responsive, consistent  
- Documented in **Storybook**

### 🧩 Developer Experience
- ⚙️ Vite — Fast dev/build pipeline
- 🧠 TypeScript (strict mode)
- 🧱 Zustand — Minimal, predictable state store
- 🧰 ESLint + Prettier — Linting and formatting
- 🧪 Jest + React Testing Library — Unit tests
- 🧩 Cypress — E2E test example
- 🧰 GitHub Actions — Lint, test, build CI

---

## 🛠️ Tech Stack

| Category | Technology |
|-----------|-------------|
| Framework | React 18 + TypeScript |
| Bundler | Vite |
| Styling | TailwindCSS |
| State Management | Zustand |
| Validation | Zod |
| Forms | React Hook Form |
| Mock API | MSW (Mock Service Worker) |
| Charts | Recharts |
| Icons | Lucide React |
| Documentation | Storybook |
| Testing | Jest + RTL + Cypress |
| CI/CD | GitHub Actions |

---

## 🧱 Architecture

```
frontend-lead-task/
 ├─ public/
 │   └─ mockServiceWorker.js           # MSW worker (auto-generated)
 ├─ src/
 │   ├─ api/                           # MSW handlers + API client
 │   ├─ state/                         # Zustand store (useTasksStore)
 │   ├─ components/
 │   │   └─ ui/                        # Reusable design system components
 │   ├─ pages/
 │   │   ├─ Dashboard.tsx              # Charts & metrics
 │   │   └─ Tasks.tsx                  # CRUD + filtering
 │   ├─ utils/                         # Zod validation schema
 │   ├─ styles/                        # Tailwind setup
 │   ├─ types.ts                       # Shared TypeScript models
 │   └─ main.tsx                       # Router + app entry + MSW startup
 ├─ .storybook/                        # Storybook configuration
 ├─ .github/workflows/ci.yml           # CI pipeline
 ├─ README.md
 └─ package.json
```

---

## ⚙️ Setup & Run

### 1️⃣ Install dependencies
```bash
npm install
```

### 2️⃣ Initialize the MSW worker
```bash
npx msw init public/ --save
```

### 3️⃣ Start the development server
```bash
npm run dev
```
Then open: [http://localhost:5173](http://localhost:5173)

---

## 🧪 Testing

### Unit Tests
```bash
npm run test
```

### Watch Mode
```bash
npm run test:watch
```

### E2E (Cypress)
```bash
npm run cypress:open
```

---

## 🧹 Linting & Formatting

```bash
npm run lint
npm run format
```

---

## 🧭 Architecture Decisions

| Concern | Decision |
|----------|-----------|
| **State** | Zustand for simple, testable, lightweight state logic |
| **Data Layer** | MSW mocks a REST API, easily swappable for real backend |
| **Forms & Validation** | React Hook Form + Zod for robust type-safe validation |
| **Styling** | TailwindCSS for rapid and consistent styling |
| **Routing** | React Router v6 with lazy loading |
| **Charts** | Recharts with responsive layout and modern gradients |
| **Icons** | Lucide React (lightweight, SVG-based) |
| **Testing** | Jest for unit tests, Cypress for integration |
| **DX** | ESLint, Prettier, strict TypeScript, Vite fast HMR |
| **CI/CD** | GitHub Actions runs lint, tests, and build automatically |

---

## 🎨 UI Enhancements

- Switched table “Edit” and “Delete” actions to **icon buttons** (`lucide-react`’s ✏️ and 🗑️)
- Applied **gradient color palette** to charts:
  - `#6d28d9` (purple)
  - `#10b981` (emerald)
  - `#facc15` (gold)
  - `#f97316` (orange)
  - `#3b82f6` (blue)
- Added **rounded bar corners**, **labels**, and **dark-mode tooltips**
- Adjusted modals for accessibility and focus control

---

## 🧩 MSW Configuration

Mock Service Worker simulates REST endpoints under `/api/tasks`.  
To regenerate:
```bash
npx msw init public/ --save
```

Ensure your `main.tsx` only enables MSW in development:

```ts
if (import.meta.env.DEV) {
  const { worker } = await import('./api/msw/browser')
  worker.start()
}
```

---

## 🧱 CI/CD Pipeline

**GitHub Actions Workflow** (`.github/workflows/ci.yml`):

```yaml
name: CI
on:
  push: { branches: [ main ] }
  pull_request: { branches: [ main ] }

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run lint
      - run: npm test
      - run: npm run build
```

---

## 🧠 Accessibility & Performance

- Semantic HTML and keyboard navigation
- ARIA attributes in modals and forms
- Focus trap in dialogs
- Lazy-loaded routes for code-splitting
- Avoided unnecessary re-renders with memoized lists

---

## 📸 Screenshots

### Dashboard
![Dashboard](/screenshots/dashboard.png)

### Tasks Management
![Tasks](/screenshots/tasks-list.png)

---


## 👤 Author

**Tarek Abd ElAziz**  
---
