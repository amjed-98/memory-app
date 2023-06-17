import { z } from 'zod';

const envSchema = z.object({ PORT: z.coerce.number(), DB_URL: z.string() });

export default envSchema;
