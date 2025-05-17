import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SurveyApiService } from '../../services/survey-api.service';
import { UserSurveyDto } from '../../dtos/user-survey-dto';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../../shared/services/loading.service';
import { UserSurveyApiService } from '../../services/user-survey-api.service';

@Component({
  selector: 'app-response-view',
  imports: [CommonModule],
  templateUrl: './response-view.component.html',
  styleUrl: './response-view.component.scss'
})
export class ResponseViewComponent {
  surveyUrlName!: string;
  urlName!: string;
  userSurvey!: UserSurveyDto;
  constructor(
      private surveyApiService: SurveyApiService,
      private userSurveyApiService: UserSurveyApiService,
      private route: ActivatedRoute,
      private router: Router,
      private loadingService: LoadingService
    ) {}
  
    ngOnInit(): void {
      this.surveyUrlName = this.route.snapshot.paramMap.get('survey')!;
      this.urlName = this.route.snapshot.paramMap.get('response')!;
      this.loadingService.show();
      this.userSurveyApiService.loadUserSurvey(this.surveyUrlName, true, false, this.urlName).subscribe({
        next: (survey) => {
          this.userSurvey = survey!;
          this.loadingService.hide();
        },
        error: (err) => {
          this.loadingService.hide();
          if (err.status === 404) {
            this.router.navigate(['/not-found']);  // Or your actual not-found route
          } else {
            console.error('Error loading survey response:', err);
          }
        }
      });
    }

}
