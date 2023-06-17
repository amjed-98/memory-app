import { Router } from 'express';
import * as LikeController from '../../controllers/Like';

const router = Router();

router.route('/:memoryId').put(LikeController.put).delete(LikeController.remove);

export default router;
