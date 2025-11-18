import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DecodeFlightsModule } from './decode-flights/decode-flights.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DecodeFlightsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
