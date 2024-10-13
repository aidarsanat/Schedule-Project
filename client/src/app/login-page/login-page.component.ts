// import { HttpClient } from "@angular/common/http";
// import { Component, inject } from '@angular/core';
// import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
// import {AuthService} from "../shared/services/auth.service";
// import {Router} from "express";
// import {User} from "../shared/interfaces";
//
// @Component({
//   selector: 'app-login-page',
//   templateUrl: './login-page.component.html',
//   styleUrl: './login-page.component.css',
//   standalone: true,
//   imports: [ReactiveFormsModule],
// })
// export class LoginPageComponent {
//   fb = inject(FormBuilder);
//   http = inject(HttpClient);
//   authService = inject(AuthService);
//   router = inject(Router);
//
//   form = this.fb.nonNullable.group({
//     email: ['', Validators.required],
//     password: ['', Validators.required],
//   })
//
//   onSubmit(): void {
//     this.http.post<{user: User}>('/api/auth/login', this.fb)
//   }
// }

import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../shared/services/auth.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {MaterialService} from "../shared/classes/material.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent implements OnInit, OnDestroy {

  form!: FormGroup
  aSub!: Subscription

  constructor(private auth: AuthService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {
        MaterialService.toast('Теперь вы можете зайти в систему')
      } else if (params['accessDenied']) {
        MaterialService.toast('Авторизуйтесь в системе')
      } else if (params['sessionFailed']) {
        MaterialService.toast('Пожалуйста войдите в систему заново')
      }
    })
  }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.form.disable()

    const user = {
      email: this.form.value.email,
      password: this.form.value.password
    };


    this.aSub = this.auth.login(user).subscribe({
        next: () => this.router.navigate(['/student']),
        error: error => {
          MaterialService.toast(error.error.message)
          this.form.enable()
        }
      }
    )
  }
}
