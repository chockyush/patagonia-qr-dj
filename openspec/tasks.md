# Plan de Tareas - QR-DJ

## Batch 1: Cimientos
- [x] Inicializar `/client` con Vite + React + TS.
- [x] Inicializar `/server` con Node + Express + TS.
- [x] Instalar dependencias (socket.io, spotify-web-api-node, cors).

## Batch 2: Backend (El Motor)
- [x] Integrar Spotify API (Client Credentials Flow).
- [x] Configurar Socket.io (Events: `send-request`, `admin-update`).
- [x] Crear store temporal en memoria para los pedidos.

## Batch 3: Frontend (La Interfaz)
- [x] Implementar `index.css` con variables de neón y glassmorphism.
- [x] Componente `SearchSongs` para el cliente.
- [x] Componente `DjDashboard` para el DJ.

## Batch 4: Verificación y Cierre
- [x] Pruebas integradas (Cliente pide -> DJ recibe).
- [x] Optimización para tablets.
