import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginPageComponent} from "./login-page/login-page.component";
import {AuthLayoutComponent} from "./shared/layouts/auth-layout/auth-layout.component";
import {SiteLayoutComponent} from "./shared/layouts/site-layout/site-layout.component";
import {RegisterPageComponent} from "./register-page/register-page.component";
import {AuthGuard} from "./shared/classes/auth.guard";
import {StudentPageComponent} from "./student-page/student-page.component";
import {LessonPageComponent} from "./lesson-page/lesson-page.component";
import {StudentFormComponent} from "./student-page/student-form/student-form.component";
import {AuditReportComponent} from "./audit-report/audit-report.component";

const routes: Routes = [
  {
    path: '', component: AuthLayoutComponent, children: [
      {path: '', redirectTo: '/login', pathMatch: 'full'},
      {path: 'login', component: LoginPageComponent},
      {path: 'register', component: RegisterPageComponent}
    ]
  },
  {
    path: '', component: SiteLayoutComponent, canActivate: [AuthGuard], children: [
      {path: 'student', component: StudentPageComponent},
      {path: 'student/new', component: StudentFormComponent},
      {path: 'student/:id', component: StudentFormComponent},
      {path: 'lesson', component: LessonPageComponent},
      {path: 'ext-audit', component: AuditReportComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
