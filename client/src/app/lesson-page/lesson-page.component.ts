import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {LessonsService} from "../shared/services/lesson.service";
import {Lesson} from "../shared/interfaces";
import {Observable} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MaterialService} from "../shared/classes/material.service";

@Component({
  selector: 'app-lesson-page',
  templateUrl: './lesson-page.component.html',
  styleUrl: './lesson-page.component.css'
})
export class LessonPageComponent implements OnInit, AfterViewInit {
  @ViewChild('addLessonModal') addLessonModal!: ElementRef;
  form: FormGroup;
  lessons$: Observable<Lesson[]>;

  constructor(private lessonsService: LessonsService) {}

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required)
    })
    this.lessons$ = this.lessonsService.fetch();
  }

  ngAfterViewInit() {
    MaterialService.initModal(this.addLessonModal.nativeElement);
  }

  openAddLessonModal() {
    const modalInstance = MaterialService.initModal(this.addLessonModal.nativeElement);
    modalInstance.open();
  }

  deleteLesson(lesson: Lesson) {
    const decision = window.confirm(`Вы уверены что хотите удалить предмет "${lesson.name}"?`);
    if (decision) {
      this.lessonsService.remove(lesson._id!)
        .subscribe(
          response => {
            MaterialService.toast(response.message);
            this.lessons$ = this.lessonsService.fetch(); // Перезагрузка списка уроков
          },
          error => MaterialService.toast(error.error.message)
        );
    }
  }

  onSubmit() {
    if (this.form.invalid) { return; }
    this.form.disable();
    const {name, description } = this.form.value;
    this.lessonsService.add(name, description)
      .subscribe(
        lesson => {
          MaterialService.toast('Предмет добавлен успешно');
          this.form.reset();
          this.form.enable();
          this.lessons$ = this.lessonsService.fetch(); // Перезагрузка списка уроков
          const modalInstance = MaterialService.initModal(this.addLessonModal.nativeElement);
          if (modalInstance) { modalInstance.close(); }
        },
        error => {
          MaterialService.toast(error.error.message);
          this.form.enable();
        }
      );
  }
}
