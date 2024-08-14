import { ValidationPipe } from '@nestjs/common/pipes';
import cookieSession = require('cookie-session');

export const setupApp = (app:any) => {
  app.use(cookieSession({ keys: ['key1'] }));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
} 