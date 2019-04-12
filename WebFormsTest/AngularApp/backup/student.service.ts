import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs';
import { Students } from './app/mock.data/students';
import { Student } from './app/models/student';
import { PageResponse } from './app/models/student-response';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  addStudent(arg0: any): any {
    throw new Error("Method not implemented.");
  }

  constructor(private http: HttpClient) { }

  getData(c: String, d: String, n: number, l: number): Observable<PageResponse<Student>> {
    return this.http.get<PageResponse<Student>>("http://localhost:64448/api/students?column=" + c + "&dest=" + d +
      "&pageNum=" + n + "&pageLength=" + l);
    //return of(Students);
  }
  getStudent(id: number) {
    return this.http.get<Student>("http://localhost:64448/api/student?id=" + id);
  }

  updateStudent(s: Student) {
    return this.http.put("http://localhost:64448/api/student?id=" + s.ID, s);
  }
  getColumns(): Array<string> {
    let res: Array<string> = ["Name", "Surname", "Course", "Group", "Sex"];
    return res;
  }
}
