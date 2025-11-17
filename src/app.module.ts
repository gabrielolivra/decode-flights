import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DecodeFlightsModule } from './decode-flights/decode-flights.module';

@Module({
  imports: [DecodeFlightsModule],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {}
