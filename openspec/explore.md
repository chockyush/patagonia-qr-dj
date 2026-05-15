# Exploration: DJ Panel Enhancements

## Current State
- **Backend (`server/src/socket.ts`):** 
    - Manages an in-memory array `requests`.
    - Events: `send-request`, `admin-update-status`, `admin-full-list`, `admin-new-request`.
    - No mechanism to remove items from the array or clear it completely.
- **Frontend (`client/src/App.tsx`):**
    - Single entry point for both views.
    - DJ view lists all requests from the backend without filtering or grouping.
    - Statuses: `pending`, `playing`, `rejected`.
    - Styles: "Cyber-Night" aesthetic with glassmorphism and neon borders.

## Requirements
1. **Clear List Button:** DJ needs a way to wipe all requests.
2. **Delete Individual Request:** DJ needs a "Borrar" option per item, different from "Reject".
3. **Grouping by Day:** Requests should be grouped by date to manage high volume over multiple nights.

## Technical Considerations
- **Grouping:** Frontend-side grouping is easier since the data volume is manageable. We can group the `requests` state before rendering.
- **Deletion:** Deleting should remove the item from the server-side array to keep it clean and sync across all connected DJ panels.
- **Icons:** `Trash2` and `RotateCcw` or `Trash` from `lucide-react` fit the aesthetic.
