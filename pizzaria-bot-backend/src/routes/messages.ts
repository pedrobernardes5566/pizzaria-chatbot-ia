import { Router } from 'express';
import {
  handlePostMessage,
  getAllMessages,
  deleteAllMessages,
} from '../controllers/messageController';

const router = Router();

router.post('/', handlePostMessage);
router.get('/', getAllMessages);
router.delete('/', deleteAllMessages);

export default router;