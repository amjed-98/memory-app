import { HttpError, Jwt } from '../../utils';

interface Req extends ExpressRequest {
  cookies: {
    accessToken: string | undefined;
  };
}
export default async function ({ cookies }: Req, res: Res, next: NextFn) {
  try {
    const token = cookies.accessToken;
    if (!token) throw new HttpError({ message: 'unauthorized', status: 400 });

    const user = await Jwt.verifyToken(token);

    res.json({
      data: user,
      message: 'success',
    });
  } catch (error) {
    res.clearCookie('accessToken');
    next(error);
  }
}
