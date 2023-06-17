import { User } from '../../database/models';
import { HttpError, Jwt } from '../../utils';
import { hash } from 'bcryptjs';
import { z } from 'zod';

const schema = z.object({ email: z.string().email(), password: z.string(), username: z.string() });

interface Req extends ExpressRequest {
  body: z.infer<typeof schema>;
}

export default async function (req: Req, res: Res, next: NextFn) {
  try {
    const { email, password } = schema.parse(req.body);

    const alreadyRegistered = await User.findOne({ email });

    if (alreadyRegistered)
      throw new HttpError({ message: 'email already registered', status: 403 });

    req.body.password = await hash(password, 10);
    const user = new User(req.body);

    await user.save();

    const accessToken = await Jwt.signToken({ username: user.username, userId: user.id });

    res.cookie('accessToken', accessToken);

    res.json({ data: user });
  } catch (error) {
    next(error);
  }
}
