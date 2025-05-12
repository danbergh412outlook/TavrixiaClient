import { Component } from '@angular/core';
import { SurveyDto } from '../../dtos/survey-dto';
import { SurveyApiService } from '../../services/survey-api.service';
import { MaterialImports } from '../../../shared/imports/material-imports';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-survey-list',
  imports: [CommonModule, RouterModule, ...MaterialImports],
  templateUrl: './survey-list.component.html',
  styleUrl: './survey-list.component.scss'
})
export class SurveyListComponent {
  surveys: SurveyDto[] | null = null;
  constructor(private apiService: SurveyApiService, private router: Router, private dialog: MatDialog) {

  }
  ngOnInit(): void {
    this.loadSurveys();
  }
  loadSurveys(){
    this.apiService.loadSurveys().subscribe(surveys => {
      this.surveys = surveys;
      console.log(this.surveys);
    });
  }
  viewSurvey(survey: SurveyDto) {
    this.router.navigate(['/survey', survey.urlName]);
  }
  openConfirm(urlName: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm Delete',
        message: 'Are you sure you want to delete this item?',
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // User clicked Yes
        this.apiService.deleteSurvey(urlName).subscribe(surveys => {
          this.loadSurveys();
          console.log("Deleted");
        });
        
      } else {
        // User clicked No
        console.log('Cancelled');
      }
    });
  }
}
