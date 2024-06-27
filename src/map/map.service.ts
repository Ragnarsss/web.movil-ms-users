import {
  Client,
  TimeZoneResponseData,
} from '@googlemaps/google-maps-services-js';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MapService {
  private googleMapsClient: Client;

  constructor() {
    this.googleMapsClient = new Client({});
  }

  async getTimeZone(latitud: number, longitud: number) {
    const response = await this.googleMapsClient.timezone({
      params: {
        location: { lat: latitud, lng: longitud },
        timestamp: Math.floor(Date.now() / 1000), // Google Maps API espera un timestamp en segundos
        key: process.env.GOOGLE_API_KEY,
      },
    });

    const data: TimeZoneResponseData = response.data;
    const currentTime = new Date();
    const localTime = new Date(
      currentTime.getTime() + (data.dstOffset + data.rawOffset) * 1000,
    );

    return localTime;
  }
}
