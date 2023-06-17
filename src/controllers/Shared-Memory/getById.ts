import { SharedMemory } from '../../database/models';
import { HttpError } from '../../utils';
import { z } from 'zod';

const schema = z.object({ id: z.string() });

interface Req extends ReqWithAuth {
  params: z.infer<typeof schema>;
}
export default async function (req: Req, res: Res, next: NextFn) {
  try {
    const { id } = schema.parse(req.params);

    const sharedMemory = await SharedMemory.findById(id)
      .populate(['memory'])
      .populate({ path: 'sharedBy', select: 'username id' });

    if (!sharedMemory) throw new HttpError({ message: 'Bad Request', status: 400 });

    res.json({ data: sharedMemory });
  } catch (error) {
    next(error);
  }
}
