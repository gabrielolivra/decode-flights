import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { DecodeFlightsService } from './decode-flights.service';
import { FileInterceptor } from '@nestjs/platform-express';
import type { DecodeFlightsFile } from './decode-flights.contract';

@Controller('decode-flights')
export class DecodeFlightsController {
    constructor(private readonly decodeFlightsService: DecodeFlightsService) {}

    @Post()
     @UseInterceptors(FileInterceptor('file'))
    async decodeFlights(@UploadedFile() file: DecodeFlightsFile) {
        return this.decodeFlightsService.decodeFlights(file);
    }
}