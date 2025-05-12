import { Component, OnInit } from '@angular/core';
import { SurveyApiService } from '../../services/survey-api.service';
import { SurveyDetailsDto } from '../../dtos/survey-details-dto';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialImports } from '../../../shared/imports/material-imports';

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
  survey!: SurveyDetailsDto;
  form!: FormGroup;
  urlName!: string;

  constructor(
    private apiService: SurveyApiService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.urlName = this.route.snapshot.paramMap.get('id')!;
    this.apiService.loadSurvey(this.urlName).subscribe({
    next: (survey) => {
      this.survey = survey;
      this.buildForm();
    },
    error: (err) => {
      if (err.status === 404) {
        this.router.navigate(['/not-found']);  // Or your actual not-found route
      } else {
        console.error('Error loading survey:', err);
      }
    }
  });
  }

  buildForm(): void {
    const group: any = {};
    this.survey.surveyQuestions.forEach(q => {
      group[q.id] = new FormControl(null); // store selected response id
    });
    this.form = this.fb.group(group);
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log('User selections:', this.form.value);
      // this.form.value is a map: { [questionId]: selectedResponseId }
    }
  }
}