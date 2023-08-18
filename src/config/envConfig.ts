import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  node_env: process.env.NODE_ENV,
  PORT: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  clerk_secret_key: process.env.CLERK_SECRET_KEY,
};
