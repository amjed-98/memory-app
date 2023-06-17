import { User } from '../../database/models';
import { compare } from 'bcryptjs';
import { HttpError, Jwt, findOneOrThrow } from '../../utils';
import { z } from 'zod';

const schema = z.object({ email: z.string().email(), password: z.string() });

interface Req extends ExpressRequest {
  body: z.infer<typeof schema>;
}

export default async function (req: Req, res: Res, next: NextFn) {
  try {
    const { email, password } = schema.parse(req.body);

    const user = await findOneOrThrow(User, { email }, { message: 'user not found', status: 400 });

    const { username, id } = user;

    const passwordIsValid = await compare(password, user.password);
    if (!passwordIsValid) throw new HttpError({ message: 'wrong email or password', status: 400 });

    const accessToken = await Jwt.signToken({ username, userId: id });

    res.cookie('accessToken', accessToken);

    res.json({ data: user });
  } catch (error) {
    res.clearCookie('accessToken');
    next(error);
  }
}
