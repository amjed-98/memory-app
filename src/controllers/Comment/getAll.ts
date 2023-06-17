import { Comment } from '../../database/models';
import { z } from 'zod';

const schema = z.object({ memoryId: z.string() });

interface Req extends ReqWithAuth {
  params: z.infer<typeof schema>;
}

export default async function (req: Req, res: Res, next: NextFn) {
  try {
    const { memoryId } = schema.parse(req.params);

    const comments = await Comment.find({ memory: memoryId }).populate({
      path: 'user',
      select: 'username',
    });

    res.json({ data: comments });
  } catch (error) {
    next(error);
  }
}
