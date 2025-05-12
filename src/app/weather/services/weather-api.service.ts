import { Injectable, inject  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Weather } from "../models/weather";
import { GoogleAuthService } from '../../shared/services/google-auth.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherApiService {
  private http = inject(HttpClient);
  private readonly baseUrl = environment.apiBaseUrl;
  constructor(private googleAuthService: GoogleAuthService) {
    
   }
   loadWeather(){
    let token = this.googleAuthService.getToken();
    console.log(token);
    return this.http.get<Weather[]>(this.baseUrl + '/WeatherForecast', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
   }
}
