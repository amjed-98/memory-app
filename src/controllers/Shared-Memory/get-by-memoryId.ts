import { SharedMemory } from '../../database/models';
import { z } from 'zod';

const schema = z.object({ memoryId: z.string() });

interface Req extends ReqWithAuth {
  params: z.infer<typeof schema>;
}
export default async function (req: Req, res: Res, next: NextFn) {
  try {
    const { memoryId } = schema.parse(req.params);

    const shares = await SharedMemory.find({ memory: memoryId })
      .populate('memory')
      .populate('sharedBy', 'username');

    res.json({ data: shares });
  } catch (error) {
    next(error);
  }
}
