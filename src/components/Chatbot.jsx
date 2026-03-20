import React, { useState, useRef, useCallback } from 'react';

const faq = [
  {
    q: 'Quels services proposez-vous ?',
    a: 'Développement web, mobile, cloud, cybersécurité, UX/UI, conseil.',
  },
  {
    q: 'Comment obtenir un devis ?',
    a: 'Utilisez le formulaire de devis en ligne ou contactez-nous.',
  },
  {
    q: 'Quels sont vos délais ?',
    a: 'Variable selon le projet, généralement 2 à 6 semaines.',
  },
];

export default function Chatbot() {
  const [messages, setMessages] = useState([
    {
      from: 'bot',
      text: 'Bonjour ! Posez-moi une question ou choisissez une FAQ.',
    },
  ]);
  const [input, setInput] = useState('');
  const [minimized, setMinimized] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragRef = useRef(null);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { from: 'user', text: input }]);
    const found = faq.find((f) =>
      input.toLowerCase().includes(f.q.toLowerCase().split(' ')[0])
    );
    setTimeout(() => {
      setMessages((msgs) => [
        ...msgs,
        {
          from: 'bot',
          text: found ? found.a : 'Je transmets votre demande à un conseiller.',
        },
      ]);
    }, 700);
    setInput('');
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
  const handleMouseMove = useCallback((e) => {
    if (!dragging) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    setPosition({
      x: dragRef.current.origX + dx,
      y: dragRef.current.origY + dy,
    });
  }, [dragging]);

  const handleMouseUp = useCallback(() => {
    setDragging(false);
    document.body.style.userSelect = '';
  }, []);
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
  }, [dragging, handleMouseMove, handleMouseUp]);

  // Style for floating position
  const style = minimized
    ? { position: 'fixed', bottom: 24, right: 24, zIndex: 50 }
    : {
        position: 'fixed',
        bottom: 24 + position.y,
        right: 24 - position.x,
        zIndex: 50,
        width: '20rem',
        cursor: dragging ? 'grabbing' : 'default',
      };

  return minimized ? (
    <div style={style}>
      <button
        className="bg-purple-600 text-white rounded-full shadow-lg p-3 flex items-center justify-center hover:bg-purple-700"
        onClick={() => setMinimized(false)}
        title="Ouvrir le Chatbot Assistance"
      >
        <span role="img" aria-label="Chatbot">
          💬
        </span>
      </button>
    </div>
  ) : (
    <div style={style}>
      <div className="bg-white rounded-lg p-0 border border-purple-300">
        <div
          className="flex items-center justify-between px-4 py-2 bg-purple-100 rounded-t-lg cursor-move select-none"
          onMouseDown={handleMouseDown}
        >
          <h3 className="text-lg font-bold text-purple-700">
            Chatbot Assistance
          </h3>
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
          <div className="h-40 overflow-y-auto mb-2 bg-gray-50 rounded p-2">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`mb-1 text-sm ${
                  m.from === 'bot'
                    ? 'text-blue-700'
                    : 'text-gray-800 text-right'
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 p-2 border rounded"
              placeholder="Votre question..."
            />
            <button
              onClick={handleSend}
              className="bg-purple-600 text-white px-3 py-1 rounded font-bold"
            >
              Envoyer
            </button>
          </div>
          <div className="mt-2">
            <span className="text-xs text-gray-400">FAQ rapide :</span>
            <ul className="mt-1">
              {faq.map((f, i) => (
                <li
                  key={i}
                  className="text-xs text-blue-600 cursor-pointer hover:underline"
                  onClick={() => setInput(f.q)}
                >
                  {f.q}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
