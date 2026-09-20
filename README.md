# Glazia — Mini Design Canvas

> **Full Stack Developer Intern Technical Assignment**  
> Built for **Glazia** using **Next.js (App Router), React, TypeScript, Tailwind CSS, React Konva, Node.js, Express.js, and MongoDB (Mongoose)**.

---

## 1. Project Overview

**Glazia Mini Design Canvas** is a modern, high-performance browser-based vector design canvas inspired by Canva and Figma. It enables users to create design canvases, place and manipulate basic geometric shapes and typography, customize properties through a dedicated inspection panel, manage layer hierarchy, and persist designs into MongoDB via a structured REST API.

The canvas engine is built natively using **React Konva** (`Stage`, `Layer`, `Rect`, `Circle`, `Text`, and `Transformer`), with state managed authoritatively in React and synchronized after each drag and transform event.

---

## 2. Features

### Core Features (Mandatory)
* **Canvas Initialization**: Create a blank canvas with customizable dimensions (default: 1000 × 650) and background color.
* **Element Creation**:
  * **Rectangle**: Configurable position, dimensions, rotation, fill color, and stroke outline.
  * **Circle**: Configurable position, diameter, fill color, and stroke outline.
  * **Text**: Customizable text content, font size, font family, and color.
* **Selection & Transform**:
  * Click any element to select it; clicking empty canvas deselects.
  * Interactive **Konva Transformer** handles for 8-point resizing and continuous 360° rotation.
  * **Dimension Normalization**: Scale factors (`scaleX`/`scaleY`) are automatically normalized into actual pixel dimensions (`width`/`height`) and scales reset to 1 on `onTransformEnd`.
* **Drag & Drop**: Smooth dragging with immediate coordinate synchronization back into React state on `onDragEnd`.
* **Properties Inspector**: Right-hand panel providing real-time two-way editing for position ($X$, $Y$), dimensions ($W$, $H$), rotation slider, fill color picker + hex input, stroke outline, text content, font size, and element deletion.
* **MongoDB Persistence & CRUD**:
  * **Create**: Save new canvases to MongoDB with title, description, dimensions, and elements array.
  * **List**: View all saved canvases on the dashboard with miniature rendered previews and metadata.
  * **Load**: Open previously saved canvases directly into the editor with state hydration.
  * **Update**: Persist modifications back to existing MongoDB documents without duplication.
  * **Delete**: Remove canvases with a destructive confirmation dialog.

### Bonus Features (Implemented)
1. **Layer Management & Reordering**: Dedicated Layers panel displaying elements in z-order, with controls to bring forward, send backward, toggle visibility, and delete.
2. **50-Step Undo / Redo**: Deep history snapshot stack with keyboard shortcuts (`Ctrl + Z`, `Ctrl + Shift + Z` / `Ctrl + Y`).
3. **Debounced Autosave**: Automatic background saving (1.5-second debounce) for existing canvases with a visual status indicator (`Saved just now`, `Saving...`).
4. **PNG Export**: High-resolution canvas export via `stage.toDataURL()` with transformer bounding boxes automatically excluded.
5. **JWT Authentication & User Canvases**: Optional user registration, login, profile management, and association of canvases with user IDs (while supporting guest mode).
6. **Canvas Zoom & Viewport**: Zoom in, zoom out, and reset zoom (`100%`) without corrupting underlying canvas coordinates.
7. **Keyboard Shortcuts**:
   * <kbd>Delete</kbd> / <kbd>Backspace</kbd>: Delete selected element.
   * <kbd>Escape</kbd>: Clear selection.
   * <kbd>Ctrl + Z</kbd>: Undo.
   * <kbd>Ctrl + Shift + Z</kbd>: Redo.
   * <kbd>Ctrl + S</kbd>: Save canvas.

---

## 3. Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend Framework** | **Next.js 14 (App Router)** | Client-side routing, layout rendering, performance optimization |
| **UI Library** | **React 18** | Authoritative canvas state and component architecture |
| **Canvas Engine** | **React Konva & Konva.js** | Declarative HTML5 2D canvas rendering (`Stage`, `Layer`, `Transformer`) |
| **Styling** | **Tailwind CSS** | Professional SaaS-style design system with custom Glazia palette |
| **Language** | **TypeScript** | Strict type definitions for canvas elements, API models, and props |
| **Icons** | **Lucide React** | Clean, recognizable modern interface icons |
| **Backend Framework** | **Node.js & Express.js** | RESTful API server, routing, and controller architecture |
| **Database** | **MongoDB & Mongoose** | Document database and object data modeling (ODM) with validation |
| **Authentication** | **JWT & Bcrypt.js** | Secure token-based authentication and password hashing |
| **CORS & Env** | **cors & dotenv** | Cross-Origin Resource Sharing and environment configuration |

---

## 4. Architecture & System Flow

```text
┌─────────────────────────────────────────────────────────────┐
│                    Next.js Frontend                         │
│                                                             │
│  useCanvas() <───> useHistory() (Undo/Redo 50 snapshots)    │
│       │                                                     │
│       ▼                                                     │
│  <CanvasStage>                                              │
│    └── <Stage>                                              │
│          └── <Layer>                                        │
│                ├── <Rect /> (Background paper)              │
│                ├── <CanvasElement /> (Rect, Circle, Text)   │
│                └── <SelectionTransformer />                 │
│                      └─► onTransformEnd (normalize scale)   │
│                                                             │
│  lib/api.ts (Centralized API Client)                        │
└──────────────────────────┬──────────────────────────────────┘
                           │ HTTP REST (JSON)
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                   Express.js Backend                        │
│                                                             │
│  Routes (/api/canvases, /api/auth)                          │
│       ↓                                                     │
│  Validators (Payload integrity & ObjectId checks)           │
│       ↓                                                     │
│  Controllers (canvasController, authController)             │
│       ↓                                                     │
│  Services (canvasService)                                   │
│       ↓                                                     │
│  Models (Mongoose: Canvas, User)                            │
│       ↓                                                     │
│  MongoDB (glazia_design_canvas)                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 5. Folder Structure

```text
glazia-mini-design-canvas/
│
├── frontend/
│   ├── app/
│   │   ├── layout.tsx              # Root HTML & Glazia metadata
│   │   ├── globals.css             # Tailwind & workspace styles
│   │   ├── page.tsx                # Screen 1: Landing page
│   │   ├── canvases/
│   │   │   └── page.tsx            # Screen 4: My Canvases Dashboard
│   │   ├── editor/
│   │   │   └── [id]/
│   │   │       └── page.tsx        # Screen 5: Canvas Editor Main Workspace
│   │   ├── login/
│   │   │   └── page.tsx            # Screen 2: Login Page
│   │   ├── register/
│   │   │   └── page.tsx            # Screen 3: Register Page
│   │   ├── profile/
│   │   │   └── page.tsx            # Screen 9: User Profile Page
│   │   └── not-found.tsx           # Screen 10: 404 Error Page
│   │
│   ├── components/
│   │   ├── canvas/
│   │   │   ├── CanvasStage.tsx     # Konva Stage & Layer wrapper (client-only)
│   │   │   ├── CanvasElement.tsx   # Rect, Circle, and Text rendering
│   │   │   └── SelectionTransformer.tsx # Normalized Transformer
│   │   ├── editor/
│   │   │   ├── TopBar.tsx          # Branding, title, zoom, save/export actions
│   │   │   ├── Toolbar.tsx         # Left vertical tool rail
│   │   │   ├── PropertiesPanel.tsx # Right properties inspection panel
│   │   │   ├── LayersPanel.tsx     # Layer ordering & visibility drawer
│   │   │   ├── SaveModal.tsx       # Canvas naming & description modal
│   │   │   └── LoadModal.tsx       # Canvas picker modal
│   │   └── ui/
│   │       ├── Button.tsx          # Button with variants and loading state
│   │       ├── Input.tsx           # Form input with validation states
│   │       └── Modal.tsx           # Accessible modal container
│   │
│   ├── hooks/
│   │   ├── useCanvas.ts            # Core canvas state management
│   │   └── useHistory.ts           # 50-step undo/redo snapshot manager
│   │
│   ├── lib/
│   │   └── api.ts                  # Centralized REST API client
│   │
│   ├── types/
│   │   └── canvas.ts               # TypeScript types and interfaces
│   │
│   ├── public/
│   │   ├── logo.jpg                # Glazia brand logo
│   │   └── favicon.ico             # Glazia favicon
│   │
│   ├── .env.example
│   ├── .env.local
│   ├── package.json
│   ├── tsconfig.json
│   └── tailwind.config.js
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js               # MongoDB connection handler
│   │   ├── controllers/
│   │   │   ├── canvasController.js # CRUD controllers
│   │   │   └── authController.js   # JWT authentication controller
│   │   ├── middleware/
│   │   │   ├── auth.js             # Optional & strict JWT middleware
│   │   │   ├── errorHandler.js     # Centralized error formatter
│   │   │   └── notFound.js         # 404 handler
│   │   ├── models/
│   │   │   ├── Canvas.js           # Canvas & elements Mongoose schema
│   │   │   └── User.js             # User account Mongoose schema
│   │   ├── routes/
│   │   │   ├── canvasRoutes.js     # /api/canvases endpoints
│   │   │   └── authRoutes.js       # /api/auth endpoints
│   │   ├── services/
│   │   │   └── canvasService.js    # Data persistence business logic
│   │   ├── validators/
│   │   │   └── canvasValidator.js  # Request payload integrity rules
│   │   └── server.js               # Express application entrypoint
│   │
│   ├── test_api.js                 # Automated backend test suite
│   ├── .env.example
│   ├── .env
│   └── package.json
│
├── glazia_windoors_private_limited_logo.jpg # Original brand logo asset
├── .gitignore
└── README.md
```

---

## 6. Installation & Setup

### Prerequisites
* **Node.js** (v18 or higher recommended; v24 verified)
* **npm** (v9 or higher)
* **MongoDB** (running locally on port 27017 or a MongoDB Atlas URI)

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd Assignment
```

### Step 2: Configure Environment Variables

**Backend (`backend/.env`):**
```env
PORT=5001
MONGODB_URI=mongodb://127.0.0.1:27017/glazia_design_canvas
CLIENT_URL=http://localhost:3000
JWT_SECRET=glazia_design_canvas_jwt_secret_token_change_in_production
NODE_ENV=development
```

**Frontend (`frontend/.env.local`):**
```env
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

---

## 7. Running Locally

### Start Backend Server
Open a terminal in the `backend/` directory:
```bash
cd backend
npm install
npm run dev
```
The REST API will start at **`http://localhost:5001`**.

To verify the backend and run the automated test suite:
```bash
npm test
```

### Start Frontend Application
In a separate terminal, start the Next.js frontend:
```bash
cd frontend
npm install
npm run dev
```
The frontend will start at **`http://localhost:3000`**.

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 8. API Documentation

All endpoints produce standardized JSON responses:
* **Success**: `{ "success": true, "data": ... }`
* **Error**: `{ "success": false, "message": "...", "errors": [] }`

### Canvas Endpoints

| Method | Endpoint | Description | Status Code |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/canvases` | Create and save a new canvas | `201 Created` |
| `GET` | `/api/canvases` | Retrieve all saved canvases | `200 OK` |
| `GET` | `/api/canvases/:id` | Retrieve single canvas by ID | `200 OK` / `404` |
| `PUT` | `/api/canvases/:id` | Update an existing canvas document | `200 OK` / `400` / `404` |
| `DELETE` | `/api/canvases/:id` | Delete canvas by ID | `200 OK` / `404` |

### Sample Request Body (`POST` / `PUT`)
```json
{
  "name": "Glazia Demo Canvas",
  "description": "Sample design with geometric elements",
  "width": 1000,
  "height": 650,
  "backgroundColor": "#ffffff",
  "elements": [
    {
      "id": "el_001",
      "type": "rectangle",
      "x": 100,
      "y": 100,
      "width": 150,
      "height": 100,
      "rotation": 0,
      "fill": "#2563eb",
      "stroke": "#111827",
      "strokeWidth": 1,
      "visible": true
    },
    {
      "id": "el_002",
      "type": "circle",
      "x": 200,
      "y": 150,
      "width": 120,
      "height": 120,
      "rotation": 0,
      "fill": "#ef476f",
      "stroke": "",
      "strokeWidth": 0,
      "visible": true
    },
    {
      "id": "el_003",
      "type": "text",
      "x": 150,
      "y": 150,
      "width": 200,
      "height": 50,
      "rotation": 0,
      "fill": "#111827",
      "text": "Glazia",
      "fontSize": 28,
      "fontFamily": "Inter",
      "visible": true
    }
  ]
}
```

### Auth Endpoints (Bonus)
* `POST /api/auth/register`: Create user account (`name`, `email`, `password`)
* `POST /api/auth/login`: Authenticate user and receive JWT token
* `GET  /api/auth/me`: Fetch authenticated user profile
* `PUT  /api/auth/profile`: Update user name or password

---

## 9. Data Model

### Canvas Schema (`Canvas.js`)
* `name`: String, required, max 120 chars.
* `description`: String, optional, max 500 chars.
* `width`: Number, required, default `1000`, min `100`, max `4000`.
* `height`: Number, required, default `650`, min `100`, max `4000`.
* `backgroundColor`: String, default `#ffffff`.
* `elements`: Array of validated subdocuments:
  * `id`: String (stable frontend unique ID)
  * `type`: Enum `['rectangle', 'circle', 'text']`
  * `x`: Number
  * `y`: Number
  * `width`: Number
  * `height`: Number
  * `rotation`: Number (degrees 0–360)
  * `fill`: String (hex color)
  * `stroke`: String
  * `strokeWidth`: Number
  * `text`: String (for text elements)
  * `fontSize`: Number
  * `fontFamily`: String
  * `visible`: Boolean
* `userId`: ObjectId (optional ref to User)
* `timestamps`: `createdAt`, `updatedAt`

---

## 10. Key Engineering & Design Decisions

1. **Why React Konva?**  
   React Konva allows declarative mapping between React component state and HTML5 Canvas scenegraph nodes. The Konva Transformer provides high-precision transformation handles natively.
2. **Authoritative React State**:  
   Konva does NOT hold authoritative element state. React state (`useCanvas`) is the single source of truth. All Konva drag and transform events propagate back to React state.
3. **Transformer Dimension Normalization**:  
   Konva Transformer alters `scaleX` and `scaleY` during drag resizing. To avoid cumulative scaling issues and corrupting coordinates upon reload, dimensions are normalized:
   ```ts
   const newWidth = Math.max(20, Math.round(node.width() * scaleX));
   const newHeight = Math.max(20, Math.round(node.height() * scaleY));
   node.scaleX(1);
   node.scaleY(1);
   updateElement(id, { width: newWidth, height: newHeight, rotation: node.rotation() });
   ```
4. **Service / Controller / Model Separation**:  
   Backend code is structured cleanly into routes, request validators, controllers, and services for maximum maintainability and testability.
5. **Client-Side Konva Dynamic Import**:  
   Next.js server-side rendering does not have access to DOM/HTML Canvas. The canvas stage is loaded dynamically with `ssr: false` to guarantee zero hydration mismatch or `window is not defined` errors.

---

## 11. Testing & Verification Checklist

- [x] Create a new canvas with custom dimensions and background color
- [x] Add Rectangle with default values (`#2563eb`, $150 \times 100$)
- [x] Add Circle with default values (`#ef476f`, diameter $120$)
- [x] Add Text with default values (`Hello World`, font size $28$)
- [x] Select elements; Konva Transformer handles appear
- [x] Deselect when clicking canvas background
- [x] Drag elements across canvas; coordinates update on `onDragEnd`
- [x] Resize elements using 8-point handles; dimensions normalize accurately
- [x] Rotate elements; degree updates in properties panel
- [x] Edit properties (X, Y, Width, Height, Fill, Stroke, Text content, Font size)
- [x] Delete element via Properties panel or <kbd>Delete</kbd> key
- [x] Save canvas to MongoDB (`POST /api/canvases`)
- [x] List saved canvases on Dashboard (`GET /api/canvases`)
- [x] Load previously saved canvas into editor (`GET /api/canvases/:id`)
- [x] Update existing canvas document without duplication (`PUT /api/canvases/:id`)
- [x] Delete canvas with confirmation modal (`DELETE /api/canvases/:id`)
- [x] Layer reordering (bring forward, send backward, toggle visibility)
- [x] Undo / Redo history with keyboard shortcuts
- [x] Debounced autosave (1.5s debounce with status indicator)
- [x] PNG export with selection handles hidden
- [x] Server validation (400 responses for malformed payloads or invalid IDs)
- [x] Next.js production build (`npm run build`) compiles cleanly

---

## 12. License

Created for the **Glazia Full Stack Developer Intern Assignment**. All rights reserved.
