import React, { useState, useRef, useCallback } from 'react';
import { useNotifications } from '../contexts/NotificationsContext';

// ...variable mockNotifications supprimée...

export default function Notifications() {
  const { notifications, addNotification, removeNotification } =
    useNotifications();
  const [input, setInput] = useState('');
  const [minimized, setMinimized] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragRef = useRef(null);

  // Ajout dynamique de notification
  const handleAddNotification = () => {
    if (!input.trim()) return;
    addNotification(input, 'info');
    setInput('');
  };

  // Suppression d'une notification
  const handleDeleteNotification = (id) => {
    removeNotification(id);
  };

  // Drag & drop handlers
  const handleMouseDown = (e) => {
    setDragging(true);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      origX: position.x,
      origY: position.y,
    };
    document.body.style.userSelect = 'none';
  };
  const handleMouseMove = useCallback(
    (e) => {
      if (!dragging) return;
      const dx = e.clientX - dragRef.current.startX;
      const dy = e.clientY - dragRef.current.startY;
      setPosition({
        x: dragRef.current.origX + dx,
        y: dragRef.current.origY + dy,
      });
    },
    [dragging]
  );
  const handleMouseUp = () => {
    setDragging(false);
    document.body.style.userSelect = '';
  };
  React.useEffect(() => {
    if (dragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, handleMouseMove]);

  // Style for floating position
  const style = minimized
    ? { position: 'fixed', top: 24, right: 24, zIndex: 50 }
    : {
        position: 'fixed',
        top: 24 + position.y,
        right: 24 - position.x,
        zIndex: 50,
        width: '20rem',
        cursor: dragging ? 'grabbing' : 'default',
      };

  return minimized ? (
    <div style={style}>
      <button
        className="bg-purple-600 text-white rounded-full p-3 flex items-center justify-center hover:bg-purple-700"
        onClick={() => setMinimized(false)}
        title="Ouvrir les notifications"
      >
        <span role="img" aria-label="Notifications">
          🔔
        </span>
      </button>
    </div>
  ) : (
    <div style={style}>
      <div className="bg-white rounded-lg p-0 border border-purple-300">
        <div className="p-4 border-b border-purple-200 flex gap-2 items-center">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ajouter une notification..."
            className="flex-1 p-2 border rounded"
          />
          <button
            onClick={handleAddNotification}
            className="bg-purple-600 text-white px-3 py-1 rounded font-bold"
          >
            Ajouter
          </button>
        </div>
        <div
          className="flex items-center justify-between px-4 py-2 bg-purple-100 rounded-t-lg cursor-move select-none"
          onMouseDown={handleMouseDown}
        >
          <h3 className="text-lg font-bold text-purple-700">Notifications</h3>
          <div className="flex gap-2">
            <button
              className="text-purple-600 hover:text-purple-900 text-xl font-bold"
              onClick={() => setMinimized(true)}
              title="Réduire"
            >
              –
            </button>
            <button
              className="text-gray-400 hover:text-red-500 text-xl font-bold"
              onClick={() => setMinimized(true)}
              title="Fermer"
            >
              ×
            </button>
          </div>
        </div>
        <div className="p-4">
          {notifications.length === 0 ? null : (
            <ul>
              {notifications.map((n) => (
                <li
                  key={n.id}
                  className="mb-2 border-b pb-2 flex justify-between items-center"
                >
                  <div>
                    <span
                      className={`text-gray-800 ${
                        n.type === 'error'
                          ? 'text-red-500'
                          : n.type === 'success'
                          ? 'text-green-500'
                          : ''
                      }`}
                    >
                      {n.message}
                    </span>
                    <span className="text-xs text-gray-400 ml-2">{n.time}</span>
                  </div>
                  <button
                    onClick={() => handleDeleteNotification(n.id)}
                    className="text-red-400 hover:text-red-600 ml-2 text-xs"
                    title="Supprimer"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
