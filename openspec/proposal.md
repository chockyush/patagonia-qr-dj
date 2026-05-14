# Propuesta de Sistema: QR-DJ Request

## Objetivo
Crear una aplicación web real-time que conecte a los clientes de un bar con el DJ a través de un código QR.

## Stack Tecnológico
- **Frontend**: Vite + React + Vanilla CSS (Aesthetics: Cyber-Night).
- **Backend**: Node.js + Express + Socket.io.
- **Integración**: Spotify Web API (Búsqueda).

## Experiencia de Usuario
1. **Cliente**:
   - Escanea QR.
   - Ve una interfaz oscura y elegante con un buscador.
   - Busca "The Less I Know The Better - Tame Impala".
   - Selecciona el tema y confirma el pedido.
2. **DJ**:
   - En su tablet ve una lista que se actualiza sola.
   - Los pedidos nuevos resaltan (animación de neón).
   - Puede marcar temas como "En cola", "Sonando" o "Rechazado".

## Próximos Pasos (Fase Spec)
- Definir los endpoints de la API.
- Definir los eventos de Socket.io.
- Mockup de la UI.
