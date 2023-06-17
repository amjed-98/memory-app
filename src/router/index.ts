import { Router } from 'express';
import v1 from './v1';

const router = Router();

router.use('/api/v1', v1);

router.use((error: Error & { status?: number }, _req: ExpressRequest, res: Res, _next: NextFn) => {
  const { status = 500, message = 'server error' } = error;

  res.status(status).json({ message });
});
export default router;
