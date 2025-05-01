import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.enableCors();
  app.enableShutdownHooks();
  app.use(
    (
      req: { method: string; }, 
      res: { setHeader: (arg0: string, arg1: string) => void; sendStatus: (arg0: number) => any; }, 
      next: () => void
    ) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
      }
      next();
    }
  );

  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(3001);
}
bootstrap();
