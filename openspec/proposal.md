# Proposal: DJ Panel - Cleanup & Grouping

## Goal
Implement list management tools for the DJ panel, including mass clearing, individual deletion, and date-based grouping.

## Proposed Changes

### Backend (`server/src/socket.ts`)
- **Add `admin-delete-request` event:** Receives an `id` and removes the request from the `requests` array.
- **Add `admin-clear-list` event:** Resets the `requests` array to `[]`.
- Both events will emit `admin-full-list` to all clients to sync the state.

### Frontend (`client/src/App.tsx`)
- **Grouping Logic:** 
    - Create a helper to group `requests` by date (YYYY-MM-DD).
    - Render headers for each day in the DJ panel.
- **New Actions:**
    - **Global "Limpiar Lista" button:** Positioned next to the QR button.
    - **"Borrar" button per item:** Using `Trash2` icon.
- **Visuals:** Maintain the Cyber-Night aesthetic. Use a confirmation prompt for "Limpiar Lista".

## Risks & Considerations
- **Data Loss:** Since there is no database (memory only), "Clear List" is permanent for the session.
- **Grouping performance:** For < 1000 items, grouping on every render (or via `useMemo`) is negligible.
