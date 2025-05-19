import { Component, OnInit } from '@angular/core';
import { SurveyApiService } from '../../services/survey-api.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialImports } from '../../../shared/imports/material-imports';
import { SurveyDto } from '../../dtos/survey-dto';
import { UserSurveyDto } from '../../dtos/user-survey-dto';
import { LoadingService } from '../../../shared/services/loading.service';
import { UserSurveyApiService } from '../../services/user-survey-api.service';
import { mapCreateUserSurveyDto } from '../../helpers/survey-mappers';
import { forkJoin } from 'rxjs';

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
  showValidation = false;

  constructor(
    private surveyApiService: SurveyApiService,
    private userSurveyApiService: UserSurveyApiService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private loader: LoadingService)
   {}

  ngOnInit(): void {
    this.urlName = this.route.snapshot.paramMap.get('id')!;
    forkJoin({
      survey: this.surveyApiService.loadSurvey(this.urlName),
      userSurvey: this.userSurveyApiService.loadUserSurvey(this.urlName, false, true)
    }).subscribe(({ survey, userSurvey }) => {
        this.survey = survey;
        this.userSurvey = userSurvey;
        this.buildForm();
        this.loader.hide();
      });
  }
  onAnswerChange(){
    if (this.showValidation) {

    }
  }

  buildForm(): void {
    const group: any = {};
    this.survey.surveyQuestions!.forEach(q => {
      group[q.id] = new FormControl(null, Validators.required); // store selected response id
    });
    this.form = this.fb.group(group);
  }

  onSubmit(): void {
    this.showValidation = true;
    if (this.form.valid) {
      let dto = mapCreateUserSurveyDto(this.form.value, this.survey);
      this.userSurveyApiService.addUserSurvey(dto).subscribe((survey: UserSurveyDto) => {
        this.router.navigate(['survey', this.urlName, 'response', survey.userUrlName]);
      });
    }
  }
}