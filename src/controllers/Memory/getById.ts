import { Memory } from '../../database/models';
import { HttpError } from '../../utils';
import { z } from 'zod';

const schema = z.object({ id: z.string() });

interface Req extends ReqWithAuth {
  params: z.infer<typeof schema>;
}
export default async function (req: Req, res: Res, next: NextFn) {
  try {
    const { id } = schema.parse(req.params);

    const memory = await Memory.findOne({ _id: id })
      .populate(['images', 'comments', 'likes'])
      .populate({ path: 'user', select: 'username' })
      .populate({ path: 'shares', populate: 'sharedBy' });

    if (!memory) throw new HttpError({ message: 'Bad Request', status: 400 });

    res.json({ data: memory });
  } catch (error) {
    next(error);
  }
}
