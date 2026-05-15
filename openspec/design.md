# Design: DJ Panel UI & Logic

## Grouping Logic (Frontend)

We will use a computed property (or `useMemo`) to group requests by date.

```typescript
const groupedRequests = useMemo(() => {
  const groups: { [key: string]: SongRequest[] } = {};
  
  requests.forEach(req => {
    const date = new Date(req.timestamp).toLocaleDateString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    if (!groups[date]) groups[date] = [];
    groups[date].push(req);
  });
  
  // Sort dates descending (newest day first)
  return Object.entries(groups).sort((a, b) => b[0].localeCompare(a[0]));
}, [requests]);
```

## UI Components

### 1. Global Actions (Header)
- **Clear List Button:**
    - Icon: `Trash` or `Bomb` (Lucide)
    - Label: "LIMPIAR LISTA"
    - Style: `glass-card` with red neon hover effect.
    - Behavior: Shows a native `window.confirm()` before emitting.

### 2. Group Headers
- Sticky headers for each date.
- Style: Semi-transparent dark background with a separator line.

### 3. Individual Request Actions
- Add a third button to the action group.
- Icon: `Trash2` (Lucide)
- Color: Red (`var(--secondary-color)` is already red/pink in the theme).
- Behavior: Emits `admin-delete-request`.

## Visual Adjustments
- Ensure the "playing" state still has the `neon-border`.
- Ensure the "rejected" state is visually distinct but doesn't clutter the view (maybe slightly more transparent).
