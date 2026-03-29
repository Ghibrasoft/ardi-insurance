# ARDI — ავტომობილის დაზღვევა

Multi-step car insurance quote application — ARDI technical assessment.

---

## Setup

```bash
git clone <repository-url>
cd ardi-insurance
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

```bash
npm run build    # production build
npm run test:run # run unit tests
```

---

## Stack

|                       | Version |
| --------------------- | ------- |
| React                 | 18.3    |
| TypeScript            | 5.9     |
| Tailwind CSS          | 4.2     |
| Vite                  | 8.0     |
| Vitest                | 4.1     |
| clsx + tailwind-merge | —       |

No third-party UI or form validation libraries.

---

## Features

### Required

- 3-step multi-step form — driver info → package selection → summary
- Validation on blur and on submit:
  - Personal ID: exactly 11 digits
  - Phone: Georgian mobile format only (`+995 5XX XXX XXX`)
  - Date of birth: minimum age 18
  - Vehicle year: cannot be in the future
  - Market value: positive number
- Premium calculated on the frontend — base rate × age multiplier × vehicle age + addons
- Mock API — plate number lookup (1s delay), auto-fills make/model/year
- Make, model, year fields are disabled after plate lookup — in a real system plate numbers are unique identifiers, so vehicle data should be fetched and locked, not manually entered. In production, driver fields (name, personal ID etc.) would also be auto-filled from a registry.
- Back navigation — data preserved across steps
- Responsive

### Bonus

- Draft auto-save to `localStorage`, restored on reload
- Quote history — saved per submission, deletable per item or in bulk
- Dark mode — CSS variable based, toggled from header, persisted
- Input masking — Georgian plate format (`AB-123-CD`), phone, numeric-only
- Error boundary — back and refresh actions
- Form dirty state — clear button disabled on untouched form
- Field errors clear on change as soon as value becomes valid
- Unit tests — `calculations.ts` and `validation.ts` (53 tests, Vitest)

---

## Architecture

**`modules/`** — feature-based encapsulation. Each module owns its components, hooks, utils, types, and API layer. Only the root component is exported. Adding a new form (e.g. home insurance) means adding a new folder under `modules/` with zero coupling to existing code.

**Controller pattern** — each step has a dedicated hook owning field handlers, blur validation, and local UI state. The top-level `use-insurance-form-controller` owns step navigation, collected data, and submission.

**Validation** — pure functions keyed by field name. Same logic used for single-field (blur) and full-form (submit) validation — no duplication.

**Error state** — owned by top controller, passed as props. Next button triggers validation without refs or imperative handles.

**`lib/`** — shared utilities (calculations, formatters, `cn`) live outside the module — reusable across future modules.

---

## Georgian-specific Notes

- Phone validation enforces `+995 5XX XXX XXX` format — Georgian mobile numbers start with `5` after the country code
- Plate number format enforced as `AB-123-CD` — Georgian standard registration plate pattern
- All UI labels and error messages are in Georgian (`ka`)

---

## What Could Be Improved

- `localStorage` — no error handling for corrupted/invalid JSON on draft load
- Accessibility — `id`/`htmlFor` pairing and ARIA attributes missing
- PDF — currently `window.print()`; proper solution needs `@react-pdf/renderer`
- Phone input — country prefix handled via mask; a proper phone input with country selector would be more robust
