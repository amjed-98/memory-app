export default async function (req: Req, res: Res, next: NextFn) {
  try {
    res.clearCookie('accessToken');
    res.json({ message: 'success' });
  } catch (error) {
    next(error);
  }
}
