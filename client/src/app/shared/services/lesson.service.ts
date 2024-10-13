import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Lesson, Message} from "../interfaces";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class LessonsService {
  constructor(private http: HttpClient) {
  }

  fetch(): Observable<Lesson[]> {
    return this.http.get<Lesson[]>('api/lesson')
  }

  getById(id: string): Observable<Lesson> {
    return this.http.get<Lesson>(`/api/lesson/${id}`)
  }

  add(name: string, description: string): Observable<Lesson> {
    return this.http.post<Lesson>('/api/lesson', {name, description})
  }

  update(id: string, name: string, description: string): Observable<Lesson> {
    const fd = new FormData()

    fd.append('name', name)
    fd.append('description', description)

    return this.http.patch<Lesson>('/api/lesson', fd)
  }

  remove(id: string): Observable<Message> {
    return this.http.delete<Message>(`/api/lesson/${id}`)
  }
}
