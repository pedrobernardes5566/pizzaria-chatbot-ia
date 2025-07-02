import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import app from './app';
import dotenv from 'dotenv';
dotenv.config();

import { botResponseIA } from './services/geminiService';
import { saveMessage } from './services/messageService';
import { AppDataSource } from './database/data-source';

AppDataSource.initialize()
  .then(() => console.log('Banco MySQL conectado com sucesso!'))
  .catch((err) => console.error('Erro ao conectar com o banco:', err));

const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: '*',
  },
});

// hhistórico armazenado por ID
const userHistories = new Map<string, any[]>();

io.on('connection', (socket) => {
  console.log('Cliente conectado: ' + socket.id);
  userHistories.set(socket.id, []);

  socket.on('send_message', async (data) => {
    console.log('Mensagem recebida:', data);

    const history = userHistories.get(socket.id) || [];

    //mensagem do usuário
    history.push({ role: 'user', content: data.message });
    await saveMessage('user', data.message);

    // resposta da IA
    const resposta = await botResponseIA(data.message, history);

    // salva resposta da IA
    history.push({ role: 'model', content: resposta });
    await saveMessage('bot', resposta);

    userHistories.set(socket.id, history);

    socket.emit('receive_message', { message: resposta });
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado: ' + socket.id);
    userHistories.delete(socket.id);
  });
});

server.listen(3333, () => console.log('Servidor rodando na porta 3333'));