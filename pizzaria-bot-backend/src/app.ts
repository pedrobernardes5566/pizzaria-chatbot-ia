import express from 'express';
import cors from 'cors';
import messageRoutes from './routes/messages';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/messages', messageRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

export default app;
