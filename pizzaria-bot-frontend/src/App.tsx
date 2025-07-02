import { useState, useEffect, useRef } from 'react';
import socket from './services/socket';
import axios from 'axios';
import './App.css';

function App() {
  const [mensagens, setMensagens] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMensagens((prev) => [...prev, { role: 'bot', content: data.message }]);
      setIsBotTyping(false);
    });

    return () => {
      socket.off('receive_message');
    };
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [mensagens, isBotTyping]);

  const enviarMensagem = () => {
    if (input.trim() === '') return;

    setMensagens((prev) => [...prev, { role: 'user', content: input }]);
    socket.emit('send_message', { message: input });

    setInput('');
    setIsBotTyping(true);
  };

  const handleClearMessages = async () => {
    try {
      await axios.delete('http://localhost:3333/messages');
      setMensagens([]);
    } catch (error) {
      console.error('Erro ao limpar mensagens:', error);
    }
  };

  return (
    <div className="app-container">
      <div className="chat-box">
        <div className="chat-header">
          <h2>Seja bem vindo!</h2>
          <button onClick={handleClearMessages} className="clear-button">
            Limpar
          </button>
        </div>

        <div className="messages">
          {mensagens.map((msg, index) => (
            <p key={index}>
              <strong>{msg.role === 'user' ? 'Você' : 'Atendente'}:</strong> {msg.content}
            </p>
          ))}

          {isBotTyping && (
            <p className="typing-indicator">
              <strong>Atendente:</strong>
              <span className="dots">
                <span></span>
              </span>
            </p>
          )}

          <div ref={chatEndRef} />
        </div>

        <div className="input-container">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && enviarMensagem()}
            placeholder="Digite sua mensagem..."
          />
          <button onClick={enviarMensagem}>Enviar</button>
        </div>
      </div>
    </div>
  );
}

export default App;
