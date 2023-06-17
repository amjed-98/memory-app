import app from './app';
import { checkEnv } from './utils';

const parsedEnv = checkEnv.safeParse(process.env);

if (!parsedEnv.success)
  parsedEnv.error.issues.map((issue) =>
    console.error('missing .env variable, check you .env file', { issue: issue.path })
  );

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
