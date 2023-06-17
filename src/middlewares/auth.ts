import { User } from '../database/models';
import { HttpError, Jwt, findOneOrThrow } from '../utils';

interface Req extends ExpressRequest {
  cookies: { accessToken: string | undefined };
  userId: string | undefined;
}

export default async function (req: Req, res: Res, next: NextFn) {
  try {
    const token = req.cookies.accessToken;

    if (!token) throw new HttpError({ message: 'unauthorized', status: 401 });

    const { userId } = (await Jwt.verifyToken(token)) as {
      userId: string;
      iat: number;
      exp: number;
    };

    await findOneOrThrow(User, { _id: userId });

    req.userId = userId;
    return next();
  } catch (error) {
    res.clearCookie('accessToken');
    next(error);
  }
}
