import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Lesson, LessonReference, Student} from "../../../shared/interfaces";
import {StudentsService} from "../../../shared/services/students.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, of, switchMap} from "rxjs";
import {MaterialService} from "../../../shared/classes/material.service";
import {FormGroup, FormBuilder, Validators } from "@angular/forms";
import {LessonSelectDialogComponent} from "../../lesson-select-dialog/lesson-select-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-lesson-form',
  templateUrl: './lesson-form.component.html',
  styleUrls: ['./lesson-form.component.css']
})
export class LessonFormComponent implements OnInit {
  @ViewChild('schedule') scheduleRef: ElementRef;
  days: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  times: string[] = ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
  student: Student = { name: '', lesson: [] as LessonReference[] }
  lessons: Lesson[] = [];
  form: FormGroup;
  student$: Observable<Student[]>;

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentsService,
    private dialog: MatDialog,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.student = {
      name: '',
      lesson: Array(60).fill(null).map(() => ({ day: '', time: '', lesson: { _id: '', name: '', description: '' } }))
    };
    this.studentService.getLessons().subscribe(lessons => {
      this.lessons = lessons;
    });


    this.route.params
      .pipe(
        switchMap(params => {
          if (params['id']) {
            return this.studentService.getById(params['id']);
          }
          return of(null);
        })
      )
      .subscribe(
        (student: Student | null) => {
          if (student) {
            this.student = student;
            this.ensureLessonArrayIsInitialized();
          } else {
            this.ensureLessonArrayIsInitialized();
          }
        },
        error => MaterialService.toast(error.error.message)
      );

    this.studentService.getLessons().subscribe(
      (lessons: Lesson[]) => {
        this.lessons = lessons;
      },
      error => MaterialService.toast(error.error.message)
    );
  }

  ensureLessonArrayIsInitialized(): void {
    if (!this.student.lesson) {
      this.student.lesson = [];
    }
    for (let i = 0; i < 60; i++) {
      const dayIndex = Math.floor(i / this.times.length);
      const timeIndex = i % this.times.length;
      if (!this.student.lesson[i]) {
        this.student.lesson[i] = {
          day: this.days[dayIndex],
          time: this.times[timeIndex],
          lesson: null as unknown as Lesson,
        };
      }
    }
  }

  openSchedule(day: string, time: string): void {
    const dialogRef = this.dialog.open(LessonSelectDialogComponent, {
      width: '250px',
      data: { lessons: this.lessons }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateLesson(day, time, result);
      }
    });
  }

  updateLesson(day: string, time: string, lesson: Lesson): void {
    if (!lesson || !lesson._id) {
      MaterialService.toast('Ошибка: Урок не выбран или не содержит _id');
      return;
    }

    const lessonIndex = this.days.indexOf(day) * this.times.length + this.times.indexOf(time);

    if (lessonIndex === -1 || lessonIndex >= 60) {
      MaterialService.toast('Ошибка: Неправильный индекс урока');
      return;
    }

    if (!this.student.lesson) {
      this.student.lesson = [];
    }

    this.student.lesson[lessonIndex] = {
      day,
      time,
      lesson: { _id: lesson._id, name: lesson.name, description: lesson.description }
    };

    this.studentService.update(this.student._id!, this.student.name, undefined, this.student.lesson).subscribe(
      updatedStudent => {
        this.student = updatedStudent;
        MaterialService.toast('Расписание обновлено');
        this.updateScheduleView();
      },
      error => MaterialService.toast(error.error.message)
    );
  }

  updateScheduleView(): void {
    this.studentService.getById(this.student._id!).subscribe(
      (student: Student) => {
        this.student = student;
      },
      error => MaterialService.toast(error.error.message)
    );
  }

  getLesson(day: string, time: string): string {
    const lessonRef = this.student.lesson?.find(lesson => lesson.day === day && lesson.time === time);
    return lessonRef && lessonRef.lesson ? lessonRef.lesson.name : '';
  }
}





// import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
// import {Lesson, LessonReference, Student} from "../../../shared/interfaces";
// import {StudentsService} from "../../../shared/services/students.service";
// import {ActivatedRoute, Router} from "@angular/router";
// import {Observable, of, switchMap} from "rxjs";
// import {MaterialService} from "../../../shared/classes/material.service";
// import {FormGroup, FormBuilder, Validators } from "@angular/forms";
// import {LessonSelectDialogComponent} from "../../lesson-select-dialog/lesson-select-dialog.component";
// import {MatDialog} from "@angular/material/dialog";
//
// @Component({
//   selector: 'app-lesson-form',
//   templateUrl: './lesson-form.component.html',
//   styleUrl: './lesson-form.component.css'
// })
// export class LessonFormComponent implements OnInit {
//   @ViewChild('schedule') scheduleRef: ElementRef;
//   days: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//   times: string[] = ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
//   student: Student = { name: '', lesson: [] as LessonReference[] }
//   lessons: Lesson[] = [];
//   form: FormGroup
//   student$: Observable<Student[]>
//
//   constructor(
//     private route: ActivatedRoute,
//     private studentService: StudentsService,
//     private dialog: MatDialog,
//     private router: Router,
//     private fb: FormBuilder
//   ) {}
//
//   ngOnInit(): void {
//     this.route.params
//       .pipe(
//         switchMap(params => {
//           if (params['id']) {
//             return this.studentService.getById(params['id']);
//           }
//           return of(null);
//         })
//       )
//       .subscribe(
//         (student: Student | null) => {
//           if (student) {
//             this.student = student;
//           }
//         },
//         error => MaterialService.toast(error.error.message)
//       );
//
//     this.studentService.getLessons().subscribe(
//       (lessons: Lesson[]) => {
//         this.lessons = lessons;
//       },
//       error => MaterialService.toast(error.error.message)
//     );
//
//     // this.form = this.fb.group({
//     //   name: ['', Validators.required],
//     //   image: [null]
//     // });
//   }
//
//   openSchedule(day: string, time: string): void {
//     const dialogRef = this.dialog.open(LessonSelectDialogComponent, {
//       width: '250px',
//       data: { lessons: this.lessons }
//     });
//
//     dialogRef.afterClosed().subscribe(result => {
//       if (result) {
//         this.updateLesson(day, time, result);
//       }
//     });
//   }
//
//   updateLesson(day: string, time: string, lesson: Lesson): void {
//     if (!lesson || !lesson._id) {
//       MaterialService.toast('Ошибка: Урок не выбран или не содержит _id');
//       return;
//     }
//
//     if (!this.student.lesson) {
//       this.student.lesson = [];
//     }
//
//     // Найти индекс существующего урока, если он уже существует для данного дня и времени
//     const index = this.student.lesson.findIndex(l => l.day === day && l.time === time);
//     if (index !== -1) {
//       // Обновить существующий урок
//       this.student.lesson[index] = { day, time, lesson: lesson };
//     } else {
//       // Добавить новый урок
//       this.student.lesson.push({ day, time, lesson: lesson });
//     }
//
//     this.studentService.update(this.student._id!, this.student.name, undefined, this.student.lesson).subscribe(
//       updatedStudent => {
//         this.student = updatedStudent;
//         MaterialService.toast('Расписание обновлено');
//       },
//       error => MaterialService.toast(error.error.message)
//     );
//   }
//
//   getLesson(day: string, time: string): string {
//     const lessonRef = this.student.lesson?.find(lesson => lesson.day === day && lesson.time === time);
//     return lessonRef && lessonRef.lesson ? lessonRef.lesson.name : '';
//   }
// }










//   updateLesson(day: string, time: string, lesson: Lesson): void {
//     if (!lesson || !lesson._id) {
//       MaterialService.toast('Ошибка: Урок не выбран или не содержит _id');
//       return;
//     }
//
//     const lessonReference: LessonReference = {
//       day: day,
//       time: time,
//       lesson: lesson
//     };
//
//     // Инициализация массива lesson, если он неопределен
//     if (!this.student.lesson) {
//       this.student.lesson = [];
//     }
//
//     // Найти индекс существующего урока, если он уже существует для данного дня и времени
//     const index = this.student.lesson.findIndex(l => l.day === day && l.time === time);
//     if (index !== -1) {
//       // Обновить существующий урок
//       this.student.lesson[index] = lessonReference;
//     } else {
//       // Добавить новый урок
//       this.student.lesson.push(lessonReference);
//     }
//
//     // Обновить студента в базе данных
//     this.studentService.update(this.student._id!, this.student.name, undefined, this.student.lesson).subscribe(
//       updatedStudent => {
//         this.student = updatedStudent;
//         MaterialService.toast('Расписание обновлено');
//       },
//       error => MaterialService.toast(error.error.message)
//     );
//   }
//
//   getLesson(day: string, time: string): string {
//     // const lessonRef = this.student.lesson?.find(lesson => lesson.day === day && lesson.time === time);
//     // if (!lessonRef) return '';
//     //
//     // const lesson = this.lessons.find(l => l._id === lessonRef.lesson);
//     // return lesson ? lesson.name : '';
//
//
//     const lessonRef = this.student.lesson?.find(lesson => lesson.day === day && lesson.time === time);
//     return lessonRef && lessonRef.lesson ? lessonRef.lesson.name : '';
//   }
// }
