import { Comment, Memory } from '../../database/models';
import { findOneOrThrow } from '../../utils';

import { z } from 'zod';

const schema = z.object({
  params: z.object({ memoryId: z.string() }),
  body: z.object({ text: z.string() }),
});

interface Req extends ReqWithAuth {
  params: z.infer<typeof schema>['params'];
  body: z.infer<typeof schema>['body'];
}

export default async function (req: Req, res: Res, next: NextFn) {
  try {
    const { userId } = req;

    const {
      body: { text },
      params: { memoryId },
    } = schema.parse(req);

    await findOneOrThrow(Memory, { _id: memoryId });

    const comment = new Comment({ text, user: userId, memory: memoryId });

    await comment.save();

    res.status(201).json({ data: comment, message: 'success' });
  } catch (error) {
    next(error);
  }
}
