import { Image, Memory } from '../../database/models';
import { z } from 'zod';

const schema = z.object({
  title: z.string(),
  description: z.string(),
  username: z.string(),
  tags: z.array(z.string()).optional(),
  images: z.array(z.string()),
});

interface Req extends ReqWithAuth {
  body: z.infer<typeof schema>;
}

export default async function (req: Req, res: Res, next: NextFn) {
  try {
    const { description, images, tags, title } = schema.parse(req.body);
    const { userId } = req;

    const newMemory = new Memory({
      title,
      description,
      tags,
      user: userId,
    });

    await newMemory.save();

    const imagesToInsert = images.map((image) => ({
      imageUrl: image,
      memory: newMemory._id,
    }));

    const memoryImages = await Image.insertMany(imagesToInsert);

    res
      .status(201)
      .json({ message: 'Memory created!', data: { memory: newMemory, images: memoryImages } });
  } catch (error) {
    next(error);
  }
}
