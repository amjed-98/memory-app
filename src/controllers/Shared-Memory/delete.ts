import { SharedMemory } from '../../database/models';
import { findOneOrThrow } from '../../utils';
import { z } from 'zod';

const schema = z.object({ id: z.string() });

interface Req extends ReqWithAuth {
  params: z.infer<typeof schema>;
}

export default async function (req: Req, res: Res, next: NextFn) {
  try {
    const { id } = schema.parse(req.params);
    const { userId } = req;

    const sharedMemory = await findOneOrThrow(SharedMemory, { _id: id, sharedBy: userId });

    await sharedMemory.deleteOne();

    res.json({ message: 'Memory deleted' });
  } catch (error) {
    next(error);
  }
}
