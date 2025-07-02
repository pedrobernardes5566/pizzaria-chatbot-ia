import { saveMessage } from '../services/messageService';
import { AppDataSource } from '../database/data-source';
import { Message } from '../entities/Message';

jest.mock('../database/data-source');

describe('saveMessage()', () => {
  const mockSave = jest.fn();
  const mockCreate = jest.fn();

  beforeEach(() => {
    (AppDataSource.getRepository as jest.Mock).mockReturnValue({
      create: mockCreate,
      save: mockSave,
    });

    mockCreate.mockReturnValue({ role: 'user', content: 'Olá!' });
    mockSave.mockResolvedValue(undefined);
  });

  it('deve criar e salvar uma mensagem corretamente', async () => {
    await saveMessage('user', 'Olá!');

    expect(mockCreate).toHaveBeenCalledWith({ role: 'user', content: 'Olá!' });
    expect(mockSave).toHaveBeenCalledWith({ role: 'user', content: 'Olá!' });
  });
});