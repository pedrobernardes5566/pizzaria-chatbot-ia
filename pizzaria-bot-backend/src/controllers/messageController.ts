import { Request, Response } from 'express';
import { AppDataSource } from '../database/data-source';
import { Message } from '../entities/Message';
import { botResponseIA } from '../services/geminiService';
import { saveMessage } from '../services/messageService';

export const handlePostMessage = async (req: Request, res: Response) => {
  try {
    const { content } = req.body;

    const repo = AppDataSource.getRepository(Message);
    const historico = await repo.find({ order: { created_at: 'ASC' } });

    const historyFormatted = historico.map((msg) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      content: msg.content,
    }));

    const resposta = await botResponseIA(content, historyFormatted);

    await saveMessage('user', content);
    await saveMessage('bot', resposta);

    res.json({ resposta });
  } catch (error) {
    console.error('Erro ao processar mensagem:', error);
    res.status(500).json({ error: 'Erro ao gerar resposta do bot' });
  }
};

export const getAllMessages = async (req: Request, res: Response) => {
  try {
    const repo = AppDataSource.getRepository(Message);
    const mensagens = await repo.find({ order: { created_at: 'ASC' } });
    res.json(mensagens);
  } catch (error) {
    console.error('Erro ao buscar mensagens:', error);
    res.status(500).json({ error: 'Erro ao buscar histórico de mensagens' });
  }
};

export const deleteAllMessages = async (req: Request, res: Response) => {
  try {
    const repo = AppDataSource.getRepository(Message);
    await repo.clear();
    res.status(200).json({ mensagem: 'Histórico apagado com sucesso' });
  } catch (error) {
    console.error('Erro ao apagar mensagens:', error);
    res.status(500).json({ error: 'Erro ao apagar histórico de mensagens' });
  }
};