import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {StudentsService} from "../shared/services/students.service";
import {Student} from "../shared/interfaces";

@Component({
  selector: 'app-student-page',
  templateUrl: './student-page.component.html',
  styleUrl: './student-page.component.css'
})
export class StudentPageComponent implements OnInit {
  students$: Observable<Student[]>

  constructor(private studentsService: StudentsService) {
  }

  ngOnInit() {
    this.students$ = this.studentsService.fetch()
  }
}
