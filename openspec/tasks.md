# Task List: DJ Panel Cleanup & Grouping

## Backend Tasks (Server)
- [ ] Add `admin-delete-request` event handler in `server/src/socket.ts`.
- [ ] Add `admin-clear-list` event handler in `server/src/socket.ts`.
- [ ] Verify server synchronization (broadcast `admin-full-list`).

## Frontend Tasks (Client)
- [ ] Import `Trash2` and `Trash` from `lucide-react` in `client/src/App.tsx`.
- [ ] Add `deleteRequest` and `clearList` functions to emit socket events.
- [ ] Implement `groupedRequests` using `useMemo` in `App` component.
- [ ] **UI - Header:** Add the "LIMPIAR LISTA" button in the DJ view header.
- [ ] **UI - List:** Update the request mapping to use the grouped data.
- [ ] **UI - List:** Add date headers for each group.
- [ ] **UI - List:** Add the "Borrar" button (Trash2) to each request card.

## Verification
- [ ] Check if "Limpiar Lista" clears the UI and notifies the server.
- [ ] Check if "Borrar" removes only the selected item.
- [ ] Verify that grouping works correctly (same day items together, different days separated).
