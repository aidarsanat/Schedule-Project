import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Lesson, Message, Student, LessonReference} from "../interfaces";

@Injectable({
  providedIn: 'root'
})

export class StudentsService {
  constructor(private http: HttpClient) {
  }

  fetch(): Observable<Student[]> {
    return this.http.get<Student[]>('api/student')
  }

  getById(id: string): Observable<Student> {
    return this.http.get<Student>(`/api/student/${id}`)
  }

  add(name: string, image?: File, lessons?: LessonReference[]): Observable<Student> {
    const fd = new FormData()

    if (image) {
      fd.append('image', image, image.name)
    }
    fd.append('name', name)

    if (lessons) {
      lessons.forEach((lesson, index) => {
        if (lesson && lesson.lesson && lesson.lesson._id) {
          fd.append(`lessons[${index}].day`, lesson.day);
          fd.append(`lessons[${index}].time`, lesson.time);
          fd.append(`lessons[${index}].lesson`, lesson.lesson._id);
        }
      });
    }


    return this.http.post<Student>('/api/student', fd)
  }

  update(id: string, name: string, image?: File, lessons?: LessonReference[]): Observable<Student> {
    const fd = new FormData()

    if (image) {
      fd.append('image', image, image.name)
    }
    fd.append('name', name)

    if (lessons) {
      lessons.forEach((lesson, index) => {
        if (lesson && lesson.lesson && lesson.lesson._id) {
          fd.append(`lessons[${index}].day`, lesson.day);
          fd.append(`lessons[${index}].time`, lesson.time);
          fd.append(`lessons[${index}].lesson`, lesson.lesson._id);
        }
      });
    }
    console.log('FormData being sent:', fd);

    return this.http.patch<Student>(`/api/student/${id}`, fd)
  }

  remove(id: string): Observable<Message> {
    return this.http.delete<Message>(`/api/student/${id}`)
  }

  getLessons(): Observable<Lesson[]> {
    return this.http.get<Lesson[]>('/api/lesson');
  }
}
