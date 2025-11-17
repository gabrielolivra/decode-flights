import { Injectable } from '@nestjs/common';
import { gunzipSync } from 'zlib';
import { DecodeFlightsFile } from './decode-flights.contract';

@Injectable()
export class DecodeFlightsService {
    async decodeFlights(data: DecodeFlightsFile): Promise<any> {
        if(!data || !data.buffer) {
            throw new Error('Invalid file data');
        }

        const decodedData = Buffer.from(data.buffer, 'base64').toString('utf-8');

        const json = JSON.parse(decodedData);

        const base64Data = json.data.$binary.base64;
        const compressedBuffer = Buffer.from(base64Data, 'base64');

        const decompressedBuffer = gunzipSync(compressedBuffer);
        const decompressedData = decompressedBuffer.toString('utf-8');

        const flights = JSON.parse(decompressedData);

        return { flights };
    }
}