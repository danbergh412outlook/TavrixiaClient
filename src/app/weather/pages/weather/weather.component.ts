import { Component } from '@angular/core';
import { WeatherApiService } from '../../services/weather-api.service'; // Adjust path as needed
import { Weather } from "../../models/weather";

@Component({
  selector: 'app-weather',
  imports: [],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss'
})
export class WeatherComponent {
  weather: Weather[] | null = null;
  constructor(private apiService: WeatherApiService) {

  }
  ngOnInit(): void {
    this.apiService.loadWeather().subscribe(weather => {
      this.weather = weather;
      console.log(this.weather);
    });
  }
}
