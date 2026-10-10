import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Training } from '../models/training';
import { Lesson } from '../models/lesson';
import { Curse } from '../models/curse';
import { environment } from '../../environments/environment';

/** 'trainings' = Treinamentos, 'disciplines' = Disciplinas. */
export type LessonGroupKind = 'trainings' | 'disciplines';

/** Treinamentos, Disciplinas (com suas aulas) e Cursos no linchpin-backend. */
@Injectable({
  providedIn: 'root'
})
export class LessonApiService {

  constructor(private httpClient: HttpClient) {}

  listGroups(kind: LessonGroupKind): Observable<Training[]> {
    return this.httpClient.get<Training[]>(`${environment.apiUrl}/${kind}`);
  }

  createGroup(kind: LessonGroupKind, group: Partial<Training>): Observable<Training> {
    return this.httpClient.post<Training>(`${environment.apiUrl}/${kind}`, group);
  }

  removeGroup(kind: LessonGroupKind, groupId: number): Observable<void> {
    return this.httpClient.delete<void>(`${environment.apiUrl}/${kind}/${groupId}`);
  }

  addLesson(kind: LessonGroupKind, groupId: number, lesson: Partial<Lesson>): Observable<Lesson> {
    return this.httpClient.post<Lesson>(`${environment.apiUrl}/${kind}/${groupId}/lessons`, lesson);
  }

  updateLesson(kind: LessonGroupKind, groupId: number, lesson: Lesson): Observable<Lesson> {
    return this.httpClient.put<Lesson>(`${environment.apiUrl}/${kind}/${groupId}/lessons/${lesson.id}`, lesson);
  }

  listCourses(): Observable<Curse[]> {
    return this.httpClient.get<Curse[]>(`${environment.apiUrl}/courses`);
  }

  createCourse(course: Partial<Curse>): Observable<Curse> {
    return this.httpClient.post<Curse>(`${environment.apiUrl}/courses`, course);
  }

  updateCourse(id: number, course: Partial<Curse>): Observable<Curse> {
    return this.httpClient.put<Curse>(`${environment.apiUrl}/courses/${id}`, course);
  }
}
