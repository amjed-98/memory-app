import { Like, Memory } from '../../database/models';
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

    const like = await findOneOrThrow(Like, { user: userId, memory: memoryId });

    await like.deleteOne();

    res.json({ message: 'like removed successfully' });
  } catch (error) {
    next(error);
  }
}
