<div align="center">

<img src="frontend/public/logo.jpg" alt="Glazia Logo" width="90" height="90" style="border-radius: 20px; margin-bottom: 12px" />

# ✦ Glazia Design Canvas

### *A Canva/Figma-inspired browser design tool — built from scratch*

[![Next.js](https://img.shields.io/badge/Next.js_14-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React Konva](https://img.shields.io/badge/React_Konva-FF6B6B?style=for-the-badge&logo=react&logoColor=white)](https://konvajs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)

<br/>

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-glazia--design--canva.vercel.app-5865F2?style=for-the-badge)](https://glazia-design-canva.vercel.app/)
[![API](https://img.shields.io/badge/🔌_API-glazia--backend.onrender.com-10B981?style=for-the-badge)](https://glazia-design-canva-backend.onrender.com)

</div>

---

## 📋 Table of Contents

- [✦ Glazia Design Canvas](#-glazia-design-canvas)
    - [*A Canva/Figma-inspired browser design tool — built from scratch*](#a-canvafigma-inspired-browser-design-tool--built-from-scratch)
  - [📋 Table of Contents](#-table-of-contents)
  - [🎯 Overview](#-overview)
  - [✨ Features](#-features)
    - [🔷 Core Features](#-core-features)
    - [⭐ Bonus Features Implemented](#-bonus-features-implemented)
  - [🛠️ Tech Stack](#️-tech-stack)
  - [🏗️ Architecture](#️-architecture)
  - [📁 Project Structure](#-project-structure)
  - [⚡ Quick Start](#-quick-start)
  - [🔌 API Reference](#-api-reference)
  - [🗄️ Data Models](#️-data-models)
  - [⌨️ Keyboard Shortcuts](#️-keyboard-shortcuts)
  - [🌐 Deployment](#-deployment)
  - [⚠️ Known Limitations](#️-known-limitations)
  - [🧠 Engineering Decisions](#-engineering-decisions)
  - [✅ Testing Checklist](#-testing-checklist)
  - [📄 License](#-license)

---

## 🎯 Overview

**Glazia Design Canvas** is a full-stack, browser-based vector design editor — inspired by Canva and Figma. It enables users to:

- 🎨 Create and design on a blank canvas
- 🔷 Place, resize, rotate and style 10 shape types
- 📝 Add customisable typography
- 🗂️ Manage element layers and visibility
- 💾 Persist designs in **MongoDB** via a structured REST API
- 👤 Authenticate with JWT and associate canvases to users
- 📱 Work seamlessly on both **desktop and mobile**

The canvas engine is built natively on **React Konva** (`Stage` → `Layer` → `Transformer`), with React as the single source of truth for all element state.

---

## ✨ Features

### 🔷 Core Features

| Feature | Details |
|---------|---------|
| 🖼️ **Canvas Init** | Blank canvas with configurable dimensions (default 1000×650) and background colour |
| ➕ **Element Creation** | Rectangle, Circle, Star, Triangle, Diamond, Hexagon, Line, Arrow, Text, Badge |
| 🖱️ **Selection & Transform** | Konva Transformer with 8-point resize handles and 360° rotation |
| 🤏 **Drag & Drop** | Smooth element dragging with coordinate sync on `onDragEnd` |
| 🎛️ **Properties Inspector** | Real-time X/Y/W/H, rotation slider, fill/stroke pickers, text editing, corner radius |
| 💾 **MongoDB CRUD** | Create · List · Load · Update · Delete canvases with full API validation |
| 🔐 **Auth System** | JWT register / login / profile — with full guest mode support |
| 📱 **Mobile Responsive** | Dedicated mobile bottom toolbar, right-slide sidebars, touch-friendly hit targets |

### ⭐ Bonus Features Implemented

```
✅  1. Layer Panel          → Z-order reordering, visibility toggle, per-element delete
✅  2. Undo / Redo          → 50-step history stack (Ctrl+Z / Ctrl+Shift+Z)
✅  3. Autosave             → 1.5s debounced background save with status indicator
✅  4. PNG Export           → High-res export via stage.toDataURL() (transformer hidden)
✅  5. JWT Auth             → Register · Login · Profile update · Canvas ownership
✅  6. Zoom & Viewport      → Zoom in/out/reset without corrupting canvas coordinates
✅  7. Keyboard Shortcuts   → Delete, Escape, Ctrl+Z/Y/S
✅  8. Guest Mode           → Full editor without login; prompt on save with data preserved
✅  9. Canvas Thumbnails    → Auto-generated preview cards in the dashboard
✅ 10. Dark Sidebar         → Sleek pure-black sidebar with responsive mobile drawer
```

---

## 🛠️ Tech Stack

<table>
  <thead>
    <tr>
      <th>Layer</th>
      <th>Technology</th>
      <th>Why</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>🖥️ <b>Frontend</b></td>
      <td>Next.js 14 (App Router) + TypeScript</td>
      <td>File-based routing, SSR/CSR control, strict types</td>
    </tr>
    <tr>
      <td>🎨 <b>Canvas Engine</b></td>
      <td>React Konva + Konva.js</td>
      <td>Declarative HTML5 2D canvas with native Transformer</td>
    </tr>
    <tr>
      <td>💅 <b>Styling</b></td>
      <td>Tailwind CSS 3</td>
      <td>Utility-first, responsive, custom Glazia palette</td>
    </tr>
    <tr>
      <td>🎭 <b>Icons</b></td>
      <td>Lucide React</td>
      <td>600+ clean, consistent SVG icons</td>
    </tr>
    <tr>
      <td>⚙️ <b>Backend</b></td>
      <td>Node.js + Express.js</td>
      <td>Lightweight REST API, middleware architecture</td>
    </tr>
    <tr>
      <td>🍃 <b>Database</b></td>
      <td>MongoDB + Mongoose</td>
      <td>Flexible document store, schema validation, ODM</td>
    </tr>
    <tr>
      <td>🔐 <b>Auth</b></td>
      <td>JWT + bcrypt.js</td>
      <td>Stateless token auth, secure password hashing</td>
    </tr>
    <tr>
      <td>🌐 <b>Deploy</b></td>
      <td>Vercel + Render + MongoDB Atlas</td>
      <td>Production hosting with zero-config CI/CD</td>
    </tr>
  </tbody>
</table>

---

## 🏗️ Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                    🖥️  Next.js Frontend                      │
│                                                              │
│  useCanvas() ◄──► useHistory()   (50-step undo/redo)        │
│       │                                                      │
│       ▼                                                      │
│  <CanvasStageWrapper>  (ref-safe lazy loader)                │
│    └── <CanvasStage>   (Konva — client only, no SSR)         │
│          └── <Stage>                                         │
│                └── <Layer>                                   │
│                      ├── <Rect />        background          │
│                      ├── <CanvasElement />  per element      │
│                      └── <SelectionTransformer />            │
│                            └─► normalize scaleX/scaleY       │
│                                                              │
│  lib/api.ts  →  centralized fetch client                     │
└───────────────────────────┬──────────────────────────────────┘
                            │  HTTP REST (JSON)
                            ▼
┌──────────────────────────────────────────────────────────────┐
│                  ⚙️  Express.js Backend                      │
│                                                              │
│  /api/canvases  ──►  canvasValidator  ──►  canvasController  │
│  /api/auth      ──►  authMiddleware   ──►  authController    │
│                              │                               │
│                              ▼                               │
│                       canvasService                          │
│                              │                               │
│                              ▼                               │
│                  Mongoose Models (Canvas, User)              │
│                              │                               │
│                              ▼                               │
│                  🍃 MongoDB Atlas / Local                    │
└──────────────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
Assignment/
│
├── 🖥️ frontend/
│   ├── app/
│   │   ├── page.tsx                 # 🏠 Landing page
│   │   ├── login/page.tsx           # 🔑 Login
│   │   ├── register/page.tsx        # 📝 Register
│   │   ├── canvases/page.tsx        # 🗂️  My Canvases dashboard
│   │   ├── editor/[id]/page.tsx     # 🎨 Canvas Editor (main workspace)
│   │   └── profile/page.tsx         # 👤 User Profile
│   │
│   ├── components/
│   │   ├── canvas/
│   │   │   ├── CanvasStage.tsx      # Konva Stage + Layer (client-only)
│   │   │   ├── CanvasStageWrapper.tsx # Ref-safe lazy loader (fixes next/dynamic ref bug)
│   │   │   ├── CanvasElement.tsx    # Renders all 10 element types
│   │   │   └── SelectionTransformer.tsx
│   │   ├── editor/
│   │   │   ├── TopBar.tsx           # Header: name, zoom, save, export
│   │   │   ├── Toolbar.tsx          # Left tool rail (desktop)
│   │   │   ├── MobileToolbar.tsx    # Bottom tab bar (mobile)
│   │   │   ├── PropertiesPanel.tsx  # Right properties inspector
│   │   │   ├── LayersPanel.tsx      # Layer order & visibility
│   │   │   ├── SaveModal.tsx
│   │   │   └── LoadModal.tsx
│   │   ├── layout/
│   │   │   └── Sidebar.tsx          # Black sidebar + MobilePageHeader
│   │   └── ui/
│   │       ├── Button.tsx · Input.tsx · Modal.tsx
│   │
│   ├── hooks/
│   │   ├── useCanvas.ts             # Core canvas state (add/update/delete/zoom)
│   │   └── useHistory.ts            # Undo/redo snapshot manager
│   │
│   ├── lib/api.ts                   # REST API client
│   ├── types/canvas.ts              # TypeScript interfaces
│   └── public/logo.jpg
│
└── ⚙️ backend/
    └── src/
        ├── config/db.js             # MongoDB connection
        ├── controllers/
        │   ├── canvasController.js  # Canvas CRUD
        │   └── authController.js    # JWT auth
        ├── middleware/
        │   ├── auth.js              # protect + optionalAuth
        │   ├── errorHandler.js
        │   └── notFound.js
        ├── models/
        │   ├── Canvas.js            # Canvas + element subdocuments
        │   └── User.js
        ├── routes/
        │   ├── canvasRoutes.js      # /api/canvases
        │   └── authRoutes.js        # /api/auth
        ├── services/canvasService.js
        ├── validators/canvasValidator.js
        └── server.js
```

---

## ⚡ Quick Start

### Prerequisites

| Requirement | Version |
|-------------|---------|
| Node.js | `v18+` (v24 tested) |
| npm | `v9+` |
| MongoDB | Local `27017` or Atlas URI |

### 1️⃣ Clone

```bash
git clone https://github.com/Harsh-2006-git/Glazia-Design-Canva.git
cd Glazia-Design-Canva
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install

# Copy and fill environment file
cp .env.example .env
```

**`backend/.env`**
```env
PORT=5001
MONGODB_URI=mongodb://127.0.0.1:27017/glazia_design_canvas
CLIENT_URL=http://localhost:3000
JWT_SECRET=your_super_secret_jwt_key_here
NODE_ENV=development
```

```bash
npm run dev   # Starts on http://localhost:5001
```

### 3️⃣ Frontend Setup

```bash
cd ../frontend
npm install

# Copy and fill environment file
cp .env.example .env.local
```

**`frontend/.env.local`**
```env
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

```bash
npm run dev   # Starts on http://localhost:3000
```

> 💡 Open **two terminals** — one for backend, one for frontend.

---

## 🔌 API Reference

All responses follow a consistent envelope:

```json
// ✅ Success
{ "success": true, "data": { ... } }

// ❌ Error
{ "success": false, "message": "Validation failed", "errors": ["..."] }
```

### 🗂️ Canvas Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/canvases` | Create new canvas | Optional |
| `GET` | `/api/canvases` | List all canvases | Optional |
| `GET` | `/api/canvases/:id` | Get canvas by ID | Optional |
| `PUT` | `/api/canvases/:id` | Update canvas | Optional |
| `DELETE` | `/api/canvases/:id` | Delete canvas | Optional |

### 🔐 Auth Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Create account (`name`, `email`, `password`) |
| `POST` | `/api/auth/login` | Login → returns JWT token |
| `GET` | `/api/auth/me` | Get current user profile |
| `PUT` | `/api/auth/profile` | Update name or password |

### 📦 Sample Canvas Payload

```json
{
  "name": "My First Design",
  "description": "A sample canvas with shapes",
  "width": 1000,
  "height": 650,
  "backgroundColor": "#ffffff",
  "elements": [
    {
      "id": "el_001",
      "type": "rectangle",
      "x": 425, "y": 275,
      "width": 150, "height": 100,
      "rotation": 0,
      "fill": "#2563eb",
      "stroke": "", "strokeWidth": 0,
      "cornerRadius": 4,
      "visible": true
    },
    {
      "id": "el_002",
      "type": "text",
      "x": 380, "y": 300,
      "width": 240, "height": 50,
      "rotation": 0,
      "fill": "#111827",
      "text": "Hello Glazia",
      "fontSize": 28,
      "fontFamily": "Inter",
      "visible": true
    }
  ]
}
```

**Supported element types:** `rectangle` · `circle` · `star` · `triangle` · `diamond` · `hexagon` · `line` · `arrow` · `text` · `badge`

---

## 🗄️ Data Models

### Canvas Schema

```
Canvas
 ├── name             String  required  max:120
 ├── description      String  optional  max:500
 ├── width            Number  100–4000  default:1000
 ├── height           Number  100–4000  default:650
 ├── backgroundColor  String  default:"#ffffff"
 ├── userId           ObjectId (ref: User, nullable)
 ├── createdAt / updatedAt  (timestamps)
 └── elements[]
       ├── id            String (stable frontend ID)
       ├── type          Enum (10 types)
       ├── x / y         Number
       ├── width / height Number (min: 1)
       ├── rotation      Number (degrees)
       ├── fill          String (hex)
       ├── stroke        String
       ├── strokeWidth   Number
       ├── cornerRadius  Number
       ├── text          String
       ├── fontSize      Number (min: 6)
       ├── fontFamily    String
       └── visible       Boolean
```

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl + S` | Save canvas |
| `Ctrl + Z` | Undo |
| `Ctrl + Shift + Z` | Redo |
| `Delete` / `Backspace` | Delete selected element |
| `Escape` | Deselect element |

---

## 🌐 Deployment

| Service | Platform | URL |
|---------|----------|-----|
| 🖥️ Frontend | Vercel | https://glazia-design-canva.vercel.app/ |
| ⚙️ Backend API | Render | https://glazia-design-canva-backend.onrender.com |
| 🍃 Database | MongoDB Atlas | `glazia_design_canvas` collection |

### Production Environment Variables

**Vercel (Frontend)**
```env
NEXT_PUBLIC_API_URL=https://glazia-design-canva-backend.onrender.com/api
```

**Render (Backend)**
```env
PORT=5001
NODE_ENV=production
MONGODB_URI=mongodb+srv://<user>:<pass>@<cluster>.mongodb.net/glazia_design_canvas
CLIENT_URL=https://glazia-design-canva.vercel.app
JWT_SECRET=<your-32+-char-random-secret>
```

> ⚠️ **MongoDB Atlas** — whitelist `0.0.0.0/0` in Network Access for Render's dynamic IPs.

---

## ⚠️ Known Limitations

| Limitation | Detail |
|------------|--------|
| 🖼️ No real-time collaboration | Single-user editor only; no WebSocket/CRDT sync |
| 📷 No image uploads | Image element type not yet implemented |
| 📐 No vector paths | Pen/bezier tool not available |
| 🔒 Canvas ownership | Canvases with no user ID are visible to all users |
| 📦 No versioning | No per-canvas version history on the server |
| 📱 Konva on mobile | Touch-based resizing via transformer is limited by Konva's mobile support |

---

## 🧠 Engineering Decisions

### 1. React as Single Source of Truth
Konva does **not** hold authoritative state. All element positions, dimensions, and properties live in `useCanvas()` (React state). Konva events (`onDragEnd`, `onTransformEnd`) immediately write back to React — preventing the canvas from diverging from the database model.

### 2. Transformer Scale Normalisation
Konva Transformer modifies `scaleX`/`scaleY` during resize. Without normalisation, cumulative scale drift corrupts coordinates after each load cycle. Fix:

```ts
const newWidth = Math.max(20, Math.round(node.width() * scaleX));
node.scaleX(1); // always reset to 1
```

### 3. `CanvasStageWrapper` (solves `next/dynamic` ref bug)
`next/dynamic()` wraps components in `LoadableComponent` — a plain function component that **cannot forward refs**. The fix: a manual `forwardRef` wrapper that `useEffect`-imports the Konva stage client-side and relays `getStage()` + `exportToDataURL()` via `useImperativeHandle`.

### 4. Export PNG Zoom Compensation
`stage.toDataURL()` works in pixel space. At 80% zoom the stage is 800px wide — passing `width: 1000` exports blank pixels. Fix:

```ts
const currentScale = stage.scaleX();
stage.toDataURL({
  width:  canvas.width  * currentScale,
  pixelRatio: 2 / currentScale   // always outputs full-res
});
```

### 5. Centered Element Placement
All new elements appear at the centre of the canvas (`cx = width/2 - elementWidth/2`) with a small diagonal stagger offset, so elements never pile up in the top-left corner.

### 6. Service Layer Pattern
Backend separates **Routes → Validators → Controllers → Services → Models** for clean separation of concerns and easier unit testing of business logic.

---

## ✅ Testing Checklist

- [x] Create blank canvas with custom size and background
- [x] Add all 10 element types — they spawn centred on canvas
- [x] Select element → Konva transformer handles appear
- [x] Deselect on empty canvas click
- [x] Drag elements — coordinates sync on `onDragEnd`
- [x] Resize via 8-point handles — scale normalised correctly
- [x] Rotate element — angle updates in Properties panel
- [x] Edit all properties (X, Y, W, H, fill, stroke, text, font)
- [x] Delete element via Properties panel or `Delete` key
- [x] Undo/Redo 50 steps
- [x] Layers panel: reorder, visibility toggle, delete
- [x] Save canvas (`POST /api/canvases` → 201)
- [x] Load canvas from dashboard
- [x] Update canvas (`PUT /api/canvases/:id` → 200)
- [x] Delete canvas with confirm modal
- [x] Export PNG at full resolution regardless of zoom level
- [x] Autosave after 1.5s of inactivity
- [x] Register / Login / Profile update
- [x] Guest mode — edit without login, prompt on save
- [x] Mobile bottom toolbar, right-side property/layers sidebars
- [x] API returns 400 for invalid element types or missing required fields
- [x] `npm run build` compiles without errors

---

## 📄 License

Created for the **Glazia Full Stack Developer Intern Technical Assignment**.

<div align="center">

Made with ❤️ by **Harsh** · Powered by **Next.js**, **Konva**, **MongoDB**

[![GitHub](https://img.shields.io/badge/GitHub-Harsh--2006--git-181717?style=flat-square&logo=github)](https://github.com/Harsh-2006-git/Glazia-Design-Canva)
[![Live Demo](https://img.shields.io/badge/Live-glazia--design--canva.vercel.app-5865F2?style=flat-square&logo=vercel)](https://glazia-design-canva.vercel.app/)

</div>
