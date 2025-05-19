import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SurveyApiService } from '../../services/survey-api.service';
import { SurveyDto } from '../../dtos/survey-dto';
import { SurveyQuestionDto } from '../../dtos/survey-question-dto';
import { SurveyResponseDto } from '../../dtos/survey-response-dto';
import { MaterialImports } from '../../../shared/imports/material-imports';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { mapUpdateSurveyDto } from '../../helpers/survey-mappers';
import { LoadingService } from '../../../shared/services/loading.service';

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
  survey!: SurveyDto;
  noQuestionsError = false;
  questionMissingResponsesError = false;

  constructor(
    private route: ActivatedRoute, 
    private fb: FormBuilder, 
    private surveyApiService: SurveyApiService, 
    private router: Router, 
    private dialog: MatDialog,
    private loader: LoadingService)
  {    
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
      this.surveyApiService.loadSurvey(this.urlName).subscribe((survey) => {
          this.survey = survey;
          this.form.patchValue({ name: survey.name, id: survey.id });
          survey.surveyQuestions!.forEach(q => this.addSurveyQuestion(q));
          this.loader.hide();
      });
    }
  }
  checkNoQuestionsError(): boolean
  {
    if (this.surveyQuestions.length === 0) {
      this.noQuestionsError = true;
      return true;
    }
    this.noQuestionsError = false;
    return false;
  }
  checkQuestionMissingResponsesError(): boolean
  {
    const questionHasLackResponses = this.surveyQuestions.controls.some(q =>
      (q.get('surveyResponses') as FormArray).length < 2
    );

    if (questionHasLackResponses) {
      this.questionMissingResponsesError = true;
      return true;
    }
    this.questionMissingResponsesError = false;
    return false;
  }
  isInvalid(): boolean {
    var formInvalid = this.form.invalid;
    this.checkNoQuestionsError();
    this.checkQuestionMissingResponsesError();
    return formInvalid || this.noQuestionsError || this.questionMissingResponsesError;
  }
  modifySurvey(): void {
    const dto = mapUpdateSurveyDto(this.form.value, this.survey);

    if (this.isEditMode) {
      this.surveyApiService.updateSurvey(dto, this.survey).subscribe((survey) => {
          this.router.navigate(['/survey', survey.urlName]);
        });
    } else {
      this.surveyApiService.addSurvey(dto).subscribe((survey: SurveyDto) => {
          this.router.navigate(['/survey', survey.urlName]);
        });
    }
  }
  onSubmit(): void {
    if (this.isInvalid()) {
      this.form.markAllAsTouched(); // 👈 force error messages to show
      return;
    }
    else if (this.isEditMode)
    {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: {
          title: 'Confirm Revision',
          message: 'Modifying this survey will delete all responses. Are you sure you want to modify this item?',
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.modifySurvey();
        }
      });
    }
    else
    {
      this.modifySurvey();
    }
  }
  trackById(index: number, control: AbstractControl): any {
    return control.get('id')?.value ?? index;
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
    this.checkNoQuestionsError();
  }

  removeSurveyQuestion(index: number): void {
    this.surveyQuestions.removeAt(index); 
    this.checkNoQuestionsError();
  }
  getSurveyResponses(index: number): FormArray {
    var responses = this.surveyQuestions.at(index).get('surveyResponses') as FormArray;

    return responses;
  }
  addSurveyResponse(questionIndex: number, response?: SurveyResponseDto): void {
    var responses = this.getSurveyResponses(questionIndex);

    responses.push(
      this.buildResponseGroup(response)
    );

    if (responses.length > 1){
      this.checkQuestionMissingResponsesError();
    }
  }
  removeSurveyResponse(questionIndex: number, responseIndex: number): void {
    console.log(`questionIndex: ${questionIndex} responseIndex: ${responseIndex}`);
    var responses = this.getSurveyResponses(questionIndex)
    
    responses.controls.forEach((control, index) => {
      console.log(`Response at index ${index}:`, control.value.text);
    });

    responses.removeAt(responseIndex);
    this.checkQuestionMissingResponsesError();

    responses.controls.forEach((control, index) => {
      console.log(`Response at index ${index}:`, control.value.text);
    });
  }
}
