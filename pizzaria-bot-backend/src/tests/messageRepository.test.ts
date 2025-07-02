import { AppDataSource } from '../../src/database/data-source';
import { Message } from '../../src/entities/Message';

describe('Banco de dados - MessageRepository', () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  it('deve salvar e recuperar uma mensagem do banco', async () => {
    const repo = AppDataSource.getRepository(Message);

    const novaMsg = repo.create({
      role: 'user',
      content: 'Testando mensagem no banco 🚀',
    });

    await repo.save(novaMsg);

    const mensagens = await repo.find();
    expect(mensagens.length).toBeGreaterThan(0);

    const ultima = mensagens[mensagens.length - 1];
    expect(ultima.content).toBe('Testando mensagem no banco 🚀');
    expect(ultima.role).toBe('user');
  });
});
