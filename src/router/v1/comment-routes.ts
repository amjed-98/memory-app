import { Router } from 'express';
import * as CommentController from '../../controllers/Comment';

const router = Router();

router.route('/:memoryId').post(CommentController.create).get(CommentController.getAll);

router.route('/:id').delete(CommentController.delete);

export default router;
