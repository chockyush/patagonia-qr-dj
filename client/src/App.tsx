import React, { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Search, Disc, Check, X, Shield, QrCode } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export interface SongRequest {
  id: string;
  title: string;
  artist: string;
  albumCover: string;
  spotifyUri: string;
  status: 'pending' | 'playing' | 'rejected';
  timestamp: number;
}

const SERVER_URL = 'http://localhost:3001';

const App = () => {
  const [view, setView] = useState<'client' | 'dj'>('client');
  const [socket, setSocket] = useState<Socket | null>(null);
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [requests, setRequests] = useState<SongRequest[]>([]);
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    const newSocket = io(SERVER_URL);
    setSocket(newSocket);

    newSocket.on('admin-full-list', (list: SongRequest[]) => {
      setRequests(list);
    });

    newSocket.on('admin-new-request', (req: SongRequest) => {
      setRequests(prev => [req, ...prev]);
    });

    return () => {
      newSocket.close();
    };
  }, []);

  // Búsqueda automática con debounce
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (search.length > 2) {
        try {
          const res = await fetch(`${SERVER_URL}/api/search?q=${encodeURIComponent(search)}`);
          const data = await res.json();
          setResults(data);
        } catch (error) {
          console.error("Error buscando:", error);
        }
      } else {
        setResults([]);
      }
    }, 500); // Espera 500ms después de que el usuario deja de escribir

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault(); // Ahora solo previene el refresh, la búsqueda es automática
  };

  const sendRequest = (song: any) => {
    const newRequest: SongRequest = {
      id: Math.random().toString(36).substr(2, 9),
      title: song.title,
      artist: song.artist,
      albumCover: song.albumCover,
      spotifyUri: song.spotifyUri,
      status: 'pending',
      timestamp: Date.now(),
    };
    socket?.emit('send-request', newRequest);
    setResults([]);
    setSearch('');
  };

  const updateStatus = (id: string, status: SongRequest['status']) => {
    socket?.emit('admin-update-status', { id, status });
  };

  // Detectar la ruta actual para separar vistas
  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/dj') {
      setView('dj');
    } else {
      setView('client');
    }
  }, []);

  // Actualizar el título de la pestaña dinámicamente
  useEffect(() => {
    document.title = view === 'dj' ? 'Panel DJ 🎧' : 'Pedí tu tema 🎶';
  }, [view]);

  return (
    <div style={{ padding: '15px', maxWidth: '800px', margin: '0 auto' }}>
      <AnimatePresence>
        {showQR && view === 'dj' && (
          <div style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            width: '100vw', 
            height: '100vh', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            zIndex: 9999,
            background: 'rgba(0,0,0,0.8)',
            padding: '20px'
          }}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="glass-card neon-border" 
              style={{ 
                textAlign: 'center',
                background: 'rgba(5,5,5,0.95)',
                width: '100%',
                maxWidth: '350px',
                position: 'relative'
              }}
            >
              <h2 className="neon-text" style={{ marginBottom: '15px', fontSize: '1.2rem' }}>ESCANEÁ Y PEDÍ TU TEMA</h2>
              <div style={{ background: 'white', padding: '15px', borderRadius: '12px', display: 'inline-block' }}>
                <QRCodeSVG 
                  value={window.location.origin} 
                  size={220}
                  fgColor="#000000"
                  bgColor="#ffffff"
                  level="L"
                />
              </div>
              <p style={{ marginTop: '15px', opacity: 0.6, fontSize: '0.8rem', wordBreak: 'break-all' }}>{window.location.origin}</p>
              <button 
                className="primary" 
                style={{ marginTop: '20px', width: '100%' }}
                onClick={() => setShowQR(false)}
              >
                CERRAR
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '40px',
        flexWrap: 'wrap',
        gap: '15px'
      }}>
        <div style={{ flex: '1 1 200px' }}>
          <h1 className="neon-text" style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', display: 'flex', alignItems: 'center', gap: '10px', textTransform: 'uppercase', letterSpacing: '2px' }}>
            <Music size={28} /> Patagonia Bar
          </h1>
          <p style={{ opacity: 0.8, fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '1px', color: 'var(--secondary-color)' }}>
            SUGERENCIAS MUSICALES AL DJ
          </p>
        </div>
        {/* El botón de modo ahora es sutil y solo informativo o para testing rápido, 
            podés entrar a /dj directamente para el panel del DJ */}
        {view === 'dj' && (
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button 
              onClick={() => setShowQR(!showQR)} 
              className="glass-card" 
              style={{ padding: '8px 15px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary-color)', border: '1px solid var(--primary-color)' }}
            >
              <QrCode size={18} /> {showQR ? 'CERRAR QR' : 'MOSTRAR QR'}
            </button>
            <div className="glass-card neon-border" style={{ padding: '8px 15px', borderRadius: '20px', fontSize: '0.8rem' }}>
              <Shield size={14} style={{ marginRight: '5px' }} /> PANEL DJ
            </div>
          </div>
        )}
      </header>



      <AnimatePresence mode="wait">
        {view === 'client' ? (
          <motion.section
            key="client"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <form onSubmit={handleSearch} style={{ marginBottom: '30px', position: 'relative' }}>
              <Search style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} />
              <input 
                type="text" 
                placeholder="Busca tu tema favorito..." 
                value={search} 
                onChange={(e) => setSearch(e.target.value)}
                style={{ paddingLeft: '50px', border: '1px solid rgba(0, 242, 255, 0.3)' }}
              />
            </form>

            <div style={{ display: 'grid', gap: '15px' }}>
              {results.length > 0 ? (
                results.map((song) => (
                  <motion.div 
                    key={song.id} 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card" 
                    style={{ display: 'flex', alignItems: 'center', gap: '15px', border: '1px solid rgba(255,255,255,0.1)' }}
                  >
                    <img src={song.albumCover} width={60} height={60} style={{ borderRadius: '8px' }} />
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '1.1rem' }}>{song.title}</h4>
                      <p style={{ opacity: 0.7 }}>{song.artist}</p>
                    </div>
                    <button className="primary" onClick={() => sendRequest(song)}>Pedir</button>
                  </motion.div>
                ))
              ) : search.length > 2 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="glass-card neon-border" 
                  style={{ textAlign: 'center', padding: '30px' }}
                >
                  <p style={{ marginBottom: '15px', opacity: 0.8 }}>¿No encontrás tu canción? Pedila a mano:</p>
                  <button className="primary" onClick={() => sendRequest({
                    title: search,
                    artist: 'Pedido Manual',
                    albumCover: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=200&h=200&fit=crop', // Imagen genérica de vinilo
                    spotifyUri: ''
                  })}>
                    Pedir "{search}"
                  </button>
                </motion.div>
              )}
            </div>
          </motion.section>
        ) : (
          <motion.section
            key="dj"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h2 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Disc className="neon-text" /> Pedidos en Cola
            </h2>
            <div style={{ display: 'grid', gap: '15px' }}>
              <AnimatePresence>
                {requests.length === 0 && (
                  <p style={{ opacity: 0.5, textAlign: 'center', marginTop: '40px' }}>No hay pedidos todavía. ¡Esperando la música!</p>
                )}
                {requests.map((req) => (
                  <motion.div 
                    key={req.id} 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    layout
                    className={`glass-card ${req.status === 'playing' ? 'neon-border' : ''}`} 
                    style={{ display: 'flex', alignItems: 'center', gap: '15px', border: '1px solid rgba(255,255,255,0.1)' }}
                  >
                    <img src={req.albumCover} width={60} height={60} style={{ borderRadius: '8px' }} />
                    <div style={{ flex: 1 }}>
                      <h4>{req.title}</h4>
                      <p style={{ opacity: 0.7 }}>{req.artist}</p>
                      <span className="neon-text" style={{ fontSize: '0.7rem', fontWeight: 'bold' }}>
                        {req.status === 'pending' ? '🟡 PENDIENTE' : req.status === 'playing' ? '🔵 SONANDO' : '🔴 RECHAZADO'}
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button onClick={() => updateStatus(req.id, 'playing')} className="glass-card" style={{ padding: '8px', color: 'var(--primary-color)', border: '1px solid var(--primary-color)' }}>
                        <Check size={20} />
                      </button>
                      <button onClick={() => updateStatus(req.id, 'rejected')} className="glass-card" style={{ padding: '8px', color: 'var(--secondary-color)', border: '1px solid var(--secondary-color)' }}>
                        <X size={20} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
