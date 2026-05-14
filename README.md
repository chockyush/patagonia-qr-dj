# QR-DJ System 🎶🔥

Sistema de pedidos de canciones en tiempo real para bares.

## 🚀 Cómo empezar

### 1. Configuración de Spotify
- Entra a [Spotify Developer Dashboard](https://developer.spotify.com/dashboard).
- Crea una App y obtén tu `Client ID` y `Client Secret`.
- En la carpeta `/server`, crea un archivo `.env` (basándote en `.env.example`) y pega tus credenciales.

### 2. Levantar el Servidor (Backend)
```bash
cd server
npm run dev
```
El servidor correrá en `http://localhost:3001`.

### 3. Levantar el Cliente (Frontend)
```bash
cd client
npm run dev
```
La web correrá en `http://localhost:5173`.

## 📱 Uso
- **Modo Cliente**: Busca cualquier canción de Spotify y envíala.
- **Modo DJ**: Cambia al modo DJ desde el botón superior para gestionar los pedidos en tiempo real.

## 🛠️ Tecnologías
- **Frontend**: React, Vite, Framer Motion, Lucide Icons.
- **Backend**: Node.js, Express, Socket.io, Spotify API.
- **Estética**: Cyber-Night (Glassmorphism + Neon).
