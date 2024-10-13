import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS, provideHttpClient} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {AuthLayoutComponent} from './shared/layouts/auth-layout/auth-layout.component';
import {SiteLayoutComponent} from './shared/layouts/site-layout/site-layout.component';
import {RegisterPageComponent} from './register-page/register-page.component';
import {TokenInterceptor} from "./shared/classes/token.interceptor";
import {StudentPageComponent} from './student-page/student-page.component';
import {LessonPageComponent} from './lesson-page/lesson-page.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { StudentFormComponent } from './student-page/student-form/student-form.component';
import { LessonFormComponent } from './student-page/student-form/lesson-form/lesson-form.component';
import { LessonSelectDialogComponent} from "./student-page/lesson-select-dialog/lesson-select-dialog.component";
import { AuditReportComponent } from './audit-report/audit-report.component';
import {TableModule} from "primeng/table";
import {NgxSpinnerComponent} from "ngx-spinner";
import {CalendarModule} from "primeng/calendar";
import { MultiSelectModule } from 'primeng/multiselect';
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {DropdownModule} from "primeng/dropdown";
import {FloatLabelModule} from "primeng/floatlabel";
import {AuditService} from "./shared/services/audit.service";


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    AuthLayoutComponent,
    SiteLayoutComponent,
    RegisterPageComponent,
    StudentPageComponent,
    LessonPageComponent,
    LoaderComponent,
    StudentFormComponent,
    LessonFormComponent,
    LessonSelectDialogComponent,
    AuditReportComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatListModule,
    MatButtonModule,
    TableModule,
    NgxSpinnerComponent,
    CalendarModule,
    MultiSelectModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    FloatLabelModule,

  ],
  providers: [provideHttpClient(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }, AuditService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
