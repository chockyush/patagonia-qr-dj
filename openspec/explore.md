# Exploración Técnica - Sistema QR-DJ

## Objetivos
- Permitir búsqueda de canciones vía Spotify API.
- Comunicación bidireccional en tiempo real entre Clientes y DJ.
- Interfaz optimizada para dispositivos móviles (clientes) y tablets (DJ).

## Hallazgos
1. **Spotify API**: Se utilizará el flujo de `Client Credentials` para búsquedas públicas. Esto evita que los usuarios tengan que autenticarse.
2. **Socket.io**: Es la mejor opción para la comunicación real-time. Permite manejar "salas" (rooms) por si en el futuro queremos escalar a varios bares.
3. **Data Model**:
   - `Request`: `{ id, title, artist, coverUrl, spotifyUri, status, timestamp }`

## Riesgos y Mitigaciones
- **Rate Limiting de Spotify**: Cachearemos resultados de búsqueda comunes.
- **Conectividad en Bares**: La interfaz debe ser liviana para funcionar bien con 4G/WiFi inestable.
