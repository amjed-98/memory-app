import { Router } from 'express';
import * as ShareMemoryController from '../../controllers/Shared-Memory';

const router = Router();

router.route('/:memoryId').post(ShareMemoryController.create);

router.route('/shares/:memoryId').get(ShareMemoryController.getByMemoryId);
router.route('/:id').get(ShareMemoryController.getById).delete(ShareMemoryController.delete);

export default router;
