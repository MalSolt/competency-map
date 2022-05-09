import { JwtAuthGuard } from 'src/modules/auth/guards/auth.guard';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './modules/app.module';
import { PoliciesGuard } from './modules/auth/guards/policies.guard';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser());
  const jwtAuthGuard = app.get(JwtAuthGuard);
  const policiesGuard = app.get(PoliciesGuard);

  app.useGlobalGuards(jwtAuthGuard, policiesGuard);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
