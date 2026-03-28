# ARDI — ავტომობილის დაზღვევა

A multi-step car insurance quote application built as a technical assessment for ARDI.

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
git clone <repository-url>
cd ardi-insurance
npm install
```

### Running the app

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for production

```bash
npm run build
npm run preview
```

---

## Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| TypeScript | Type safety |
| Tailwind CSS v3 | Styling |
| Vite | Build tool |

No third-party UI libraries (Material UI, Ant Design, Chakra, etc.) or form validation libraries (Yup, Zod) were used — all validation and UI components are hand-built.

---

## Features

### Core (Required)

- **3-step multi-step form**
  - Step 1: Driver & vehicle information with full validation
  - Step 2: Insurance package selection (Basic / Standard / Premium) + add-ons
  - Step 3: Policy summary with calculated annual and monthly premium
- **Form validation** — on blur and on submit
  - Required fields
  - Personal ID: exactly 11 digits
  - Phone: Georgian mobile format `+995 5XX XXX XXX`
  - Date of birth: driver must be at least 18 years old
  - Vehicle year: cannot be in the future
  - Market value: must be a positive number
- **Price calculation** — computed on the frontend
  - Base rate by package (Basic 1.2%, Standard 1.8%, Premium 2.5%)
  - Age surcharge (+20% for 18–25, +15% for 61+)
  - Vehicle age surcharge (+10% if older than 10 years)
  - Add-on flat fees (Roadside +40 ₾, Replacement car +90 ₾)
  - Zero deductible (+15% of total)
- **Mock API** — async plate number lookup with 1-second delay, auto-fills make/model/year
- **Back navigation** — previous step data is preserved
- **Responsive layout** — mobile and desktop

### Bonus (Additional)

- **Draft save** — form progress is auto-saved to `localStorage`, restored on page reload
- **Quote history** — completed quotes are saved to `localStorage`, viewable after submission with per-item delete and clear all
- **Error boundary** — catches unexpected render errors with back and refresh actions
- **Form dirty state** — clear form button is disabled when form is empty
- **Input masking** — plate number (`AB-123-CD`), phone (`+995 5XX XXX XXX`), numeric-only fields
- **Auto-fill locking** — make/model/year fields lock after successful plate lookup
- **Error recovery** — errors clear immediately when field becomes valid (on change), and show on blur or submit attempt

---

## Project Structure

```
src/
├── components/
│   ├── layout/
│   │   └── stepper.tsx              # Step indicator
│   └── ui/
│       ├── button.tsx               # Reusable button (variants + color schemes)
│       ├── input.tsx                # Input with mask support and clear button
│       ├── form-field.tsx           # Label + input + error wrapper
│       ├── section-card.tsx         # Titled card section
│       ├── selectable-card.tsx      # Radio/checkbox card base
│       ├── radio-card.tsx           # Single-select card
│       ├── checkbox-card.tsx        # Multi-select card
│       ├── summary-row.tsx          # Key-value display row
│       ├── divider.tsx              # Visual separator
│       └── error-boundary.tsx      # React error boundary
├── hooks/
│   └── use-local-storage.ts        # Generic localStorage hook
├── lib/
│   ├── constants/
│   │   ├── insurance-packages.ts   # Package definitions
│   │   └── insurance-addons.ts     # Add-on definitions
│   └── utils/
│       ├── calculations.ts         # Premium calculation logic
│       ├── check-plate-number.ts   # Plate lookup utility
│       ├── cn.ts                   # Tailwind class merge utility
│       ├── format-date.ts          # Date formatter
│       ├── format-price.ts         # Price formatter
│       └── sleep.ts                # Async delay helper
└── modules/
    └── insurance-form/
        ├── insurance-form.tsx                  # Root form component
        ├── insurance-form-config.ts            # Field names, labels, defaults
        ├── use-insurance-form-controller.ts    # Top-level state + navigation
        └── shared/
            ├── api/
            │   └── insurance-form-mock.ts      # Mock submit API
            ├── components/
            │   ├── driver-vehicle-form/        # Step 1
            │   ├── insurance-plan-selection/   # Step 2
            │   ├── quote-summary/              # Success state + history
            │   ├── policy-summary.tsx          # Step 3 summary
            │   ├── insurance-form-header.tsx
            │   └── insurance-form-navigation.tsx
            ├── hooks/
            │   └── use-quote-history.ts        # Quote history management
            ├── utils/
            │   └── validation.ts               # All form validators
            └── insurance-form-types.ts         # Shared TypeScript types
```

---

## Architecture Decisions

**Module encapsulation** — all insurance form logic lives under `modules/insurance-form`. The module exposes only its root component to `App.tsx`. Internal components, hooks, types, and utilities are private to the module.

**Controller pattern** — each form step has its own controller hook (`use-driver-vehicle-form-controller`, `use-insurance-plan-selection-controller`) that owns field change handlers, blur validation, and local UI state (e.g. plate lookup). The top-level `use-insurance-form-controller` owns step navigation, collected data, and submission.

**Validation strategy** — validators are pure functions defined as a record keyed by field name. This allows both single-field (on blur) and full-form (on submit) validation using the same logic without duplication.

**Error state ownership** — validation errors live in the top controller and are passed down as props. This allows the Next button (rendered outside the step component) to trigger validation and block navigation without needing refs or imperative handles.

**Shared utilities in `lib/`** — calculation logic, formatters, and the `cn` utility are in `lib/` rather than inside the module, since they are genuinely reusable across future modules (e.g. home insurance, travel insurance).

---

## What Could Be Improved

- **Unit tests** — calculation logic (`calculations.ts`) and validators (`validation.ts`) are pure functions well-suited for unit testing with Vitest
- **Dark mode** — `useDarkMode` hook and Tailwind `dark:` variants are partially prepared but not fully wired into all components
- **Phone prefix handling** — the `+995 5` prefix is baked into the mask; a more robust approach would use a proper phone input library or a more generic prefix system
- **LocalStorage error handling** — `JSON.parse` failures (corrupted draft) are not currently caught; a try/catch wrapper in `useLocalStorage` would improve resilience
- **Accessibility** — form fields need explicit `id`/`htmlFor` pairing and ARIA attributes for screen reader support
- **PDF generation** — currently uses `window.print()`; a proper PDF would use a library like `@react-pdf/renderer`
- **Stale quote on back navigation** — if user goes back from step 3 and changes data, the displayed quote is stale until they proceed to step 3 again
