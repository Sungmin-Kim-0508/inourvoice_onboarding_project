import { registerAs } from '@nestjs/config';

export default registerAs('token', () => ({
  secret: process.env.JWT_SECRET || '',
}));
