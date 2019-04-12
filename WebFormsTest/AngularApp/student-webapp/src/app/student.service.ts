import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs';
import { Student } from './models/student';
import { PageResponse } from './models/student-response';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/catch';
//import 'rxjs/add/Observable/throw';
import { throwError } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  getData(c: String, d: String, n: number, l: number): Observable<PageResponse<Student>> {
    return this.http.get<PageResponse<Student>>("http://localhost:64448/api/students?column=" + c + "&dest=" + d +
      "&pageNum=" + n + "&pageLength=" + l);
    //return of(Students);
  }
  getStudent(id: number) {
    return this.http.get<Student>("http://localhost:64448/api/student?id=" + id).
      catch(error => { return throwError(error); });
  }

  updateStudent(s: Student) {
    return this.http.put("http://localhost:64448/api/student?id=" + s.ID, s).
      catch(error => { return throwError(error); });
  }

  addStudent(s: Student): Observable<Student> {
    return this.http.post<Student>("http://localhost:64448/api/student?id=" + s.ID, s).
      catch(error => {  return throwError(error); });
  }

  getColumns(): Array<string> {
    let res: Array<string> = ["Name", "Surname", "Course", "Group", "Sex"];
    return res;
  }
}
