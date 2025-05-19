import { Component } from '@angular/core';
import { WeatherApiService } from '../../services/weather-api.service'; // Adjust path as needed
import { Weather } from "../../models/weather";
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { LoadingService } from '../../../shared/services/loading.service';

@Component({
  selector: 'app-weather',
  imports: [],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss'
})
export class WeatherComponent {
  weather: Weather[] | null = null;
  private navSub!: Subscription;

  constructor(
    private apiService: WeatherApiService, 
    private router: Router,
    private loader: LoadingService
  ) {}

  ngOnInit(): void {
    this.navSub = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.loadWeather();
      });
    this.loadWeather(); // Initial load
  }

  ngOnDestroy(): void {
    this.navSub.unsubscribe();
  }

  loadWeather() {
    this.apiService.loadWeather().subscribe(weather => {
      this.weather = weather;
      this.loader.hide();
    });
  }
}
