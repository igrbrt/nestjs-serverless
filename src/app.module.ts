import { Module } from '@nestjs/common';
import { DynamooseModule } from 'nestjs-dynamoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    DynamooseModule.forRoot({
      local: true,
      aws: { region: 'local' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
