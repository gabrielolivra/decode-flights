import { Module } from "@nestjs/common";
import { DecodeFlightsService } from "./decode-flights.service";
import { DecodeFlightsController } from "./decode-flights.controller";

@Module({
controllers: [DecodeFlightsController],
providers: [DecodeFlightsService],
})

export class DecodeFlightsModule {}