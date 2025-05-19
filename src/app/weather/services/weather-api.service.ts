import { Injectable, inject  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Weather } from "../models/weather";

@Injectable({
  providedIn: 'root'
})
export class WeatherApiService {
  private http = inject(HttpClient);
  private readonly baseUrl = environment.apiBaseUrl;
   loadWeather(){
    return this.http.get<Weather[]>(this.baseUrl + '/WeatherForecast');
   }
}
