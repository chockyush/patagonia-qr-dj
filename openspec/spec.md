# Technical Specification: DJ Panel Management

## Socket.io Interface

### New Events (Admin)

#### `admin-delete-request`
- **Direction:** Client -> Server
- **Payload:** `{ id: string }`
- **Action:** Removes the request with the matching `id` from the server's `requests` array.
- **Broadcast:** Emits `admin-full-list` to all connected clients.

#### `admin-clear-list`
- **Direction:** Client -> Server
- **Payload:** None
- **Action:** Resets the server's `requests` array to an empty list `[]`.
- **Broadcast:** Emits `admin-full-list` to all connected clients.

## Data Structures

### `SongRequest` (Unchanged but for reference)
```typescript
export interface SongRequest {
  id: string;
  title: string;
  artist: string;
  albumCover: string;
  spotifyUri: string;
  status: 'pending' | 'playing' | 'rejected';
  timestamp: number;
}
```

## Security / Validation
- Currently, the project does not have auth. These events are restricted by the `/dj` route convention in the client.
- In the future, a "secret key" or JWT should be added to these admin events.
