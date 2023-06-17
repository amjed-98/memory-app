import { Router } from 'express';
import * as MemoryController from '../../controllers/Memory';

const router = Router();

router.route('/search').get(MemoryController.search);

router.route('/').post(MemoryController.create).get(MemoryController.getAll);

router.route('/:id').get(MemoryController.getById).delete(MemoryController.delete);
export default router;
