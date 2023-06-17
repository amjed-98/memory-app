import { Router } from 'express';
import { auth } from '../../middlewares';

import userRoutes from './auth-routes';
import memoryRoutes from './memory-routes';
import commentRoutes from './comment-routes';
import likeRoutes from './like-routes';
import shareMemoryRoutes from './share-memory-routes';

const router = Router();

router.use('/auth', userRoutes);

router.use(auth);
router.use('/memory', memoryRoutes);
router.use('/comment', commentRoutes);
router.use('/like', likeRoutes);
router.use('/share-memory', shareMemoryRoutes);

export default router;
