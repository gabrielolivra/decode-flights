import { BadRequestException, Injectable } from '@nestjs/common';
import { gunzipSync } from 'zlib';
import { DecodeFlightsFile } from './decode-flights.contract';


@Injectable()
export class DecodeFlightsService {

    async decodeFlights(data: DecodeFlightsFile): Promise<any> {

        if(this.isNullOrEmpty(data) || this.isNullOrEmpty(data.buffer)) {
            throw new BadRequestException('Invalid file data');
        }

        const decodedData = Buffer.from(data.buffer, 'base64').toString('utf-8');

        const jsonDecoded = JSON.parse(decodedData);

        const base64Data = jsonDecoded?.data?.$binary?.base64;

        if(this.isNullOrEmpty(base64Data)) {
            throw new BadRequestException('Invalid encoded data');
        }

        const compressedBuffer = Buffer.from(base64Data, 'base64');

        if(compressedBuffer.length === 0) {
            throw new BadRequestException('Decompressed data is empty');
        }

        const decompressedBuffer = gunzipSync(compressedBuffer);

        if(decompressedBuffer.length === 0) {
            throw new BadRequestException('Decompressed data is empty');
        }

        const decompressedData = decompressedBuffer.toString('utf-8');

        const flights = JSON.parse(decompressedData);

        return { flights };
    }

    private isNullOrEmpty(value: any): boolean {
        return value === null || value === undefined || value === '';
    }
}