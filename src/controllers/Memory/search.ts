import Memory from '../../database/models/Memory';
import { z } from 'zod';

const schema = z.object({ tag: z.string().optional(), title: z.string().optional() });

interface Req extends ReqWithAuth {
  query: z.infer<typeof schema>;
}

export default async function (req: Req, res: Res, next: NextFn) {
  const { tag, title } = schema.parse(req.query);

  const query = {
    ...(tag && { tags: { $in: [tag] } }),
    ...(title && { title: { $regex: title, $options: 'i' } }),
  };

  try {
    const memories = await Memory.find(query);
    return res.json({ data: memories });
  } catch (error) {
    next(error);
  }
}
