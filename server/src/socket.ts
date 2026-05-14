import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';

export interface SongRequest {
  id: string;
  title: string;
  artist: string;
  albumCover: string;
  spotifyUri: string;
  status: 'pending' | 'playing' | 'rejected';
  timestamp: number;
}

let requests: SongRequest[] = [];

export function setupSocket(server: HttpServer) {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || "*", 
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    console.log('📱 Nueva conexión:', socket.id);

    // Enviar lista actual al conectar (especialmente para el DJ)
    socket.emit('admin-full-list', requests);

    // Cliente envía un nuevo pedido
    socket.on('send-request', (newRequest: SongRequest) => {
      requests.push(newRequest);
      console.log('🎵 Nuevo pedido:', newRequest.title);
      // Notificar a todos (o solo al DJ si usamos salas)
      io.emit('admin-new-request', newRequest);
    });

    // DJ actualiza el estado de un pedido
    socket.on('admin-update-status', ({ id, status }: { id: string, status: SongRequest['status'] }) => {
      const request = requests.find(r => r.id === id);
      if (request) {
        request.status = status;
        io.emit('admin-full-list', requests);
      }
    });

    socket.on('disconnect', () => {
      console.log('👋 Conexión cerrada');
    });
  });

  return io;
}
