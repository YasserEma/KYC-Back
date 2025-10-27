import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for frontend integration
  app.enableCors();
  
  // Get port from environment or default to 3001
  const port = process.env.PORT || 3001;
  
  await app.listen(port);
  console.log(`KYC/KYB Backend API is running on: http://localhost:${port}`);
}

bootstrap().catch((err) => {
  console.error('Failed to bootstrap application:', err);
  process.exit(1);
});