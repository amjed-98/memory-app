import { Comment } from '../../database/models';
import { findOneOrThrow } from '../../utils';
import { z } from 'zod';

const schema = z.object({ id: z.string() });

interface Req extends ReqWithAuth {
  params: z.infer<typeof schema>;
}

export default async function (req: Req, res: Res, next: NextFn) {
  try {
    const { userId } = req;
    const { id } = schema.parse(req.params);

    const comment = await findOneOrThrow(Comment, { _id: id, user: userId });

    await comment.deleteOne();

    res.json({ message: 'success' });
  } catch (error) {
    next(error);
  }
}
