import { Component } from '@angular/core';
import { SurveyDto } from '../../dtos/survey-dto';
import { SurveyApiService } from '../../services/survey-api.service';
import { MaterialImports } from '../../../shared/imports/material-imports';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-survey-list',
  imports: [CommonModule, RouterModule, ...MaterialImports],
  templateUrl: './survey-list.component.html',
  styleUrl: './survey-list.component.scss'
})
export class SurveyListComponent {
  surveys: SurveyDto[] | null = null;
  constructor(private apiService: SurveyApiService, private router: Router) {

  }
  ngOnInit(): void {
    this.apiService.loadSurveys().subscribe(surveys => {
      this.surveys = surveys;
      console.log(this.surveys);
    });
  }
   viewSurvey(survey: SurveyDto) {
    this.router.navigate(['/survey', survey.urlName]);
  }
}
