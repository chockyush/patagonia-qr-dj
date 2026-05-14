# Diseño de Arquitectura - QR-DJ

## Estructura de Proyecto
```
/
├── client/           # React + Vite
│   ├── src/
│   │   ├── components/  # Button, Card, SearchBar
│   │   ├── hooks/       # useSocket, useSpotify
│   │   ├── views/       # ClientView, DjView
│   │   └── App.tsx
├── server/           # Node.js + Express
│   ├── routes/       # Auth, Spotify
│   ├── socket/       # Lógica de Socket.io
│   └── index.ts
└── openspec/         # Documentación SDD
```

## Sistema de Diseño (Cyber-Night)
- **Colores**:
  - Fondo: `#0a0a0c` (Deep Black)
  - Primario: `#00f2ff` (Electric Cyan)
  - Acento: `#ff007a` (Neon Pink)
  - Superficies: `rgba(255, 255, 255, 0.05)` (Glassmorphism)
- **Tipografía**: 'Outfit' o 'Inter' (Moderna y legible).
- **Efectos**: Blur de fondo, bordes con gradientes de neón, animaciones suaves de entrada.
