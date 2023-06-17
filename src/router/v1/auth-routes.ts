import { Router } from 'express';
import * as UserController from '../../controllers/Auth';

const router = Router();

router.get('/', UserController.checkAuth);
router.post('/signup', UserController.signup);
router.post('/logout', UserController.logout);
router.post('/login', UserController.login);

export default router;
