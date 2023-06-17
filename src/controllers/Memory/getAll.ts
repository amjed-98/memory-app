import { Memory } from '../../database/models';

interface Req extends ReqWithAuth {}

export default async function (_req: Req, res: Res, next: NextFn) {
  try {
    const memories = await Memory.find()
      .populate(['images', 'comments', 'likes'])
      .populate({
        path: 'user',
        select: 'username',
      })
      .populate({ path: 'shares', populate: 'sharedBy' });

    res.json({ data: memories });
  } catch (error) {
    next(error);
  }
}
