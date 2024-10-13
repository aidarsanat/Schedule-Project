import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {of, switchMap} from "rxjs";
import {StudentsService} from "../../shared/services/students.service";
import {MaterialService} from "../../shared/classes/material.service";
import {Student} from "../../shared/interfaces";

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.css'
})
export class StudentFormComponent implements OnInit {

  @ViewChild('inpun') inputRef: ElementRef;
  form: FormGroup
  image: File
  imagePreview = ''
  isNew = true
  student: Student

  constructor(private route: ActivatedRoute,
              private studentService: StudentsService,
              private router: Router,) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
    })

    this.form.disable()

    this.route.params
      .pipe(
        switchMap(
          (params: Params) => {
          if (params['id']) {
            this.isNew = false
            return this.studentService.getById(params['id'])
          }
           return of(null)
        }
        )
      )
      .subscribe(
        (student: Student | null) => {
          if(student) {
            this.student = student
            this.form.patchValue({
              name: student.name
            })
            this.imagePreview = student?.imageSrc ?? ''
            MaterialService.updateTextInputs()
          }
          this.form.enable()
        },
        error => MaterialService.toast(error.error.message)
      )
  }

  triggerClick() {
    this.inputRef.nativeElement.click()
  }

  deleteStudent() {
    const decision = window.confirm(`Вы уверены что хотите удалить студента "${this.student.name}"`)
    const id = this.student._id!
    if (decision) {
      this.studentService.remove(id)
        .subscribe(
          response => {
            MaterialService.toast(response.message)
          },
          error => MaterialService.toast(error.error.message),
          () => this.router.navigate(['/student'])
        )
    }
  }

  onFileUpload(event: any) {
    const file = event.target.files[0]
    this.image = file

    const reader = new FileReader()

    reader.onload = () => {
      this.imagePreview = reader.result as string
    }

    reader.readAsDataURL(file)
  }

  onSubmit() {
    let obs$
    this.form.disable()
    if (this.isNew) {
      obs$ = this.studentService.add(this.form.value.name, this.image)
    } else {
      if (this.student && this.student._id) {
        obs$ = this.studentService.update(this.student._id, this.form.value.name, this.image);
      } else {
        MaterialService.toast('Ошибка: Студент не найден');
        this.form.enable();
        return;
      }
    }

    obs$.subscribe(
      student => {
        this.student = student
        MaterialService.toast('Изменения сохранены')
        this.form.enable()
      },
      error => {
        MaterialService.toast(error.error.message)
        this.form.enable()
      }
    )
  }
}
