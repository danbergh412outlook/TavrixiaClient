import { Component, OnInit } from '@angular/core';
import { SurveyApiService } from '../../services/survey-api.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialImports } from '../../../shared/imports/material-imports';
import { SurveyDto } from '../../dtos/survey-dto';
import { UserSurveyDto } from '../../dtos/user-survey-dto';
import { LoadingService } from '../../../shared/services/loading.service';
import { UserSurveyApiService } from '../../services/user-survey-api.service';
import { mapCreateUserSurveyDto } from '../../helpers/survey-mappers';

@Component({
  selector: 'app-survey-view',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    ...MaterialImports
  ],
  templateUrl: './survey-view.component.html',
  styleUrl: './survey-view.component.scss'
})
export class SurveyViewComponent implements OnInit {
  survey!: SurveyDto;
  userSurvey: UserSurveyDto | null = null;
  form!: FormGroup;
  urlName!: string;

  constructor(
    private surveyApiService: SurveyApiService,
    private userSurveyApiService: UserSurveyApiService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.loadingService.show();
    this.urlName = this.route.snapshot.paramMap.get('id')!;
    this.surveyApiService.loadSurvey(this.urlName).subscribe({
      next: (survey) => {
        this.survey = survey;
        this.buildForm();
        this.loadingService.hide();
      },
      error: (err) => {
        this.loadingService.hide();
        if (err.status === 404) {
          this.router.navigate(['/not-found']);  // Or your actual not-found route
        } else {
          console.error('Error loading survey:', err);
        }
      }
    });
    this.userSurveyApiService.loadUserSurvey(this.urlName, false, true).subscribe({
        next: (survey) => {
          this.userSurvey = survey;
          this.loadingService.hide();
        },
        error: (err) => {
            console.error('Error loading survey response:', err);
            this.loadingService.hide();
        }
      });
  }

  buildForm(): void {
    const group: any = {};
    this.survey.surveyQuestions!.forEach(q => {
      group[q.id] = new FormControl(null); // store selected response id
    });
    this.form = this.fb.group(group);
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.loadingService.show();
      let dto = mapCreateUserSurveyDto(this.form.value, this.survey);
      this.userSurveyApiService.addUserSurvey(dto).subscribe({
        next: (survey: UserSurveyDto) => {
          this.loadingService.hide();
          this.router.navigate(['survey', this.urlName, 'response', survey.userUrlName]);
        },
        error: (err) => {
          this.loadingService.hide();
        }
      });
    }
  }
}