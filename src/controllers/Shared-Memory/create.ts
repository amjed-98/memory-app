import { Memory, SharedMemory } from '../../database/models';
import { findOneOrThrow } from '../../utils';
import { z } from 'zod';

const schema = z.object({ memoryId: z.string() });

interface Req extends ReqWithAuth {
  params: z.infer<typeof schema>;
}

export default async function (req: Req, res: Res, next: NextFn) {
  try {
    const { memoryId } = schema.parse(req.params);
    const { userId } = req;

    await findOneOrThrow(Memory, { _id: memoryId });

    const sharedMemory = new SharedMemory({
      sharedBy: userId,
      memory: memoryId,
    });

    await sharedMemory.save();

    res.status(201).json({ message: 'shared memory!', data: sharedMemory });
  } catch (error) {
    next(error);
  }
}
