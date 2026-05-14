# Especificación Técnica - QR-DJ

## API Endpoints (REST)
- `GET /api/search?q=QUERY`: Busca canciones en Spotify usando Client Credentials.
- `GET /api/health`: Check de estado del servidor.

## Eventos de Tiempo Real (Socket.io)
### Desde el Cliente:
- `send-request`: Envía un objeto `Request` al servidor.
### Desde el Servidor hacia el DJ:
- `admin-new-request`: Notifica al DJ de un nuevo pedido.
- `admin-full-list`: Envía la lista completa (al conectar o resetear).
### Desde el DJ hacia el Servidor:
- `admin-update-status`: Cambia el estado de un tema (`pending`, `playing`, `rejected`).

## Modelo de Datos Detallado
```typescript
interface SongRequest {
  id: string;          // NanoID o UUID
  title: string;       // Nombre del tema
  artist: string;      // Artista(s)
  albumCover: string;  // URL de la imagen (640x640)
  spotifyUri: string;  // Para que el DJ lo abra en Spotify
  status: 'pending' | 'playing' | 'rejected';
  timestamp: number;
}
```
