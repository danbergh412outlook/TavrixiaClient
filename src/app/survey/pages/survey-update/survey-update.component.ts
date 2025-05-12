import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SurveyApiService } from '../../services/survey-api.service';
import { SurveyDto } from '../../dtos/survey-dto';
import { SurveyMapperService } from '../../services/survey-mapper.service';
import { SurveyDetailsDto } from '../../dtos/survey-details-dto';
import { SurveyQuestionDto } from '../../dtos/survey-question-dto';
import { SurveyResponseDto } from '../../dtos/survey-response-dto';
import { MaterialImports } from '../../../shared/imports/material-imports';

@Component({
  selector: 'app-survey-update',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, ...MaterialImports],
  templateUrl: './survey-update.component.html',
  styleUrl: './survey-update.component.scss'
})
export class SurveyUpdateComponent {
  isEditMode = false;
  urlName!: string;
  form: FormGroup;
  survey!: SurveyDetailsDto;
  noQuestionsError = false;
  questionMissingResponsesError = false;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private surveyApiService: SurveyApiService, private router: Router, private surveyMapperService: SurveyMapperService) {    
    this.form = this.fb.group({
      id: [null],
      name: ['', [Validators.required, Validators.maxLength(100)]], // Add validators as needed
      surveyQuestions: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.urlName = this.route.snapshot.paramMap.get('id')!;
    this.isEditMode = !!this.urlName;

    if (this.isEditMode) {
      this.surveyApiService.loadSurvey(this.urlName).subscribe(survey => {
        this.survey = survey;
        this.form.patchValue({ name: survey.name, id: survey.id });

        survey.surveyQuestions.forEach(q => this.addSurveyQuestion(q));
      });
    }
  }
  onSubmit(): void {
    this.noQuestionsError = false;
    this.questionMissingResponsesError = false;

    if (this.form.invalid) return;

    if (this.surveyQuestions.length === 0) {
      this.noQuestionsError = true;
      return;
    }

    const questionHasNoResponses = this.surveyQuestions.controls.some(q =>
      (q.get('surveyResponses') as FormArray).length === 0
    );

    if (questionHasNoResponses) {
      this.questionMissingResponsesError = true;
      return;
    }

    const dto = this.surveyMapperService.mapUpdateSurveyDto(this.form.value, this.survey);

    if (this.isEditMode) {
      this.surveyApiService.updateSurvey(dto, this.survey).subscribe(() => {
        this.router.navigate(['/survey', this.urlName]);
      });
    } else {
      this.surveyApiService.addSurvey(dto).subscribe((survey: SurveyDto) => {
        this.router.navigate(['/survey', survey.urlName]);
      });
    }
  }
  trackByIndex(index: number): number {
    return index;
  }
  get surveyQuestions(): FormArray {
    return this.form.get('surveyQuestions') as FormArray;
  }
  private buildQuestionGroup(question?: SurveyQuestionDto): FormGroup {
    return this.fb.group({
      id: [question?.id ?? null],
      text: [question?.text ?? '', [Validators.required, Validators.maxLength(100)]],
      surveyId: [question?.surveyId ?? null],
      surveyResponses: this.fb.array(
        question?.surveyResponses?.map(r => this.buildResponseGroup(r)) ?? []
      )
    });
  }
  private buildResponseGroup(response?: SurveyResponseDto): FormGroup {
    return this.fb.group({
      id: [response?.id ?? null],
      text: [response?.text ?? '', [Validators.required, Validators.maxLength(100)]],
      surveyId: [response?.surveyId ?? null],
      surveyQuestionId: [response?.surveyQuestionId ?? null]
    });
  }
  addSurveyQuestion(question?: SurveyQuestionDto): void {
    const questionGroup = this.buildQuestionGroup(question);
    this.surveyQuestions.push(questionGroup);
  }

  removeSurveyQuestion(index: number): void {
    this.surveyQuestions.removeAt(index); 
  }
  getSurveyResponses(index: number): FormArray {
    return this.surveyQuestions.at(index).get('surveyResponses') as FormArray;
  }
  addSurveyResponse(questionIndex: number, response?: SurveyResponseDto): void {
    this.getSurveyResponses(questionIndex).push(
      this.buildResponseGroup(response)
    );
  }
  removeSurveyResponse(questionIndex: number, responseIndex: number): void {
    this.getSurveyResponses(questionIndex).removeAt(responseIndex);
  }
}
