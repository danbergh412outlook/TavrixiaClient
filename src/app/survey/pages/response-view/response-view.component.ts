import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SurveyApiService } from '../../services/survey-api.service';
import { UserSurveyDto } from '../../dtos/user-survey-dto';
import { CommonModule } from '@angular/common';
import { UserSurveyApiService } from '../../services/user-survey-api.service';
import { LoadingService } from '../../../shared/services/loading.service';

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
      private loader: LoadingService
    ) {}
  
    ngOnInit(): void {
      this.surveyUrlName = this.route.snapshot.paramMap.get('survey')!;
      this.urlName = this.route.snapshot.paramMap.get('response')!;
      this.userSurveyApiService.loadUserSurvey(this.surveyUrlName, true, false, this.urlName).subscribe(
        (survey) => {
          this.userSurvey = survey!;
          this.loader.hide();
        });
    }

}
