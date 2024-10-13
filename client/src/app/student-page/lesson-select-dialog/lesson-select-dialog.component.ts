import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Lesson} from "../../shared/interfaces";

@Component({
  selector: 'app-lesson-select-dialog',
  templateUrl: './lesson-select-dialog.component.html',
  styleUrl: './lesson-select-dialog.component.css'
})
export class LessonSelectDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<LessonSelectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { lessons: Lesson[] }
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSelect(selectedOptions: any): void {
    const selectedLesson = selectedOptions[0]?.value;
    this.dialogRef.close(selectedLesson);
  }
}

