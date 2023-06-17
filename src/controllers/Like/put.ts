import { Like, Memory } from '../../database/models';
import { HttpError, findOneOrThrow } from '../../utils';
import { z } from 'zod';

const schema = z.object({ memoryId: z.string() });

interface Req extends ReqWithAuth {
  params: z.infer<typeof schema>;
}

export default async function (req: Req, res: Res, next: NextFn) {
  try {
    const { userId } = req;
    const { memoryId } = schema.parse(req.params);

    await findOneOrThrow(Memory, { _id: memoryId });

    const alreadyLiked = await Like.findOne({ user: userId, memory: memoryId });
    if (alreadyLiked) throw new HttpError({ message: 'Bad Request', status: 400 });

    const like = new Like({ user: userId, memory: memoryId });

    await like.save();

    res.status(201).json({ message: 'Memory liked successfully' });
  } catch (error) {
    next(error);
  }
}
