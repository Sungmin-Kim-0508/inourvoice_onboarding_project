import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigType } from '@nestjs/config';
import appConfig from 'config/app.config';
import { SocketIoAdapter } from './adapters/socket-io.adapters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useWebSocketAdapter(new SocketIoAdapter(app));
  const { port } = app.get<ConfigType<typeof appConfig>>(appConfig.KEY);

  // const config = new DocumentBuilder()
  //   .setTitle('Inourvoice API')
  //   .setDescription('기본 inourvoice 명세입니다.')
  //   .setVersion('1.0')
  //   .addTag('inourvoice')
  //   .build();
  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('swagger', app, document);

  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
