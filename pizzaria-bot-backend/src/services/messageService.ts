import { AppDataSource } from '../database/data-source';
import { Message } from '../entities/Message';

export const saveMessage = async (role: 'user' | 'bot', content: string) => {
  const repo = AppDataSource.getRepository(Message);

  const message = repo.create({
    role,
    content,
  });

  await repo.save(message);
};