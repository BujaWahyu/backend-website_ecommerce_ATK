import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupApp } from './setup-app';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupApp(app);
  app.enableCors({
    origin: 'http://localhost:3001', // Sesuaikan dengan URL frontend React.js
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
