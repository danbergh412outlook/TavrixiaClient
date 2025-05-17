import { Routes } from '@angular/router';
import { WeatherComponent } from './weather/pages/weather/weather.component';
import { SurveyListComponent } from './survey/pages/survey-list/survey-list.component';
import { SurveyUpdateComponent } from './survey/pages/survey-update/survey-update.component';
import { LoginComponent } from './shared/pages/login/login.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { SurveyViewComponent } from './survey/pages/survey-view/survey-view.component';
import { NotFoundComponent } from './shared/pages/not-found/not-found.component';
import { ResponseViewComponent } from './survey/pages/response-view/response-view.component';

export const routes: Routes = [
    {
        path: 'my-surveys',
        component: SurveyListComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'survey/add',
        component: SurveyUpdateComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'survey/update/:id',
        component: SurveyUpdateComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'survey/:id',
        component: SurveyViewComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'survey/:survey/response/:response',
        component: ResponseViewComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'weather',
        component: WeatherComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    { 
        path: '', 
        redirectTo: 'my-surveys', 
        pathMatch: 'full' 
    },
    { 
        path: '**', 
        component: NotFoundComponent
    }
];
