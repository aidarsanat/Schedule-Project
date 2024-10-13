import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {MaterialService} from "../../classes/material.service";

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrl: './site-layout.component.css'
})
export class SiteLayoutComponent implements AfterViewInit {

  @ViewChild('floating') floatingRef!: ElementRef

  links = [
    {url: '/student', name: 'Студенты'},
    {url: '/lesson', name: 'Предметы'},
    {url: '/ext-audit', name: 'Отчёт по данным аудита'}
  ]

  constructor(private auth: AuthService,
              private router: Router) {
  }


  ngAfterViewInit() {
    MaterialService.initializeFloatingButton(this.floatingRef)
  }


  logout (event: Event) {
    event.preventDefault()
    this.auth.logout()
    this.router.navigate(['/login'])
  }
}
