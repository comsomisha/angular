import { Injectable } from '@angular/core';
import { StudentService } from './student.service';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs';
import { Student } from './models/student';
import { PageResponse } from './models/student-response';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private _studentService: StudentService) { }

  async getGroupWithMaximalStudentCount() : Promise<number>  {
    var n = 0;
    var length = 0;
    var page = 1;
    var groups = [];
    do {
      var s: PageResponse<Student> = await this._studentService.getData("Name", "asc", page, 3).toPromise();


      length = s.TotalCount;
      for (var i = 0; i < s.Page.length; i++) {
        var student = s.Page[i] as Student;
        var g = groups[student.Group];
        if (g == undefined || g == null) {
          groups[student.Group] = 1;
        }
        else
          groups[student.Group] += 1;
        n++;
      }
    } while (n < length);

    var bestGroup = groups[0];
    var bestValue = groups[bestGroup];
    for (var i = 0; i < groups.length; i++) {
      if (groups[i] > bestValue || (groups[i] != undefined && bestValue == undefined)) {
        bestValue = groups[i];
        bestGroup = i;
      }
    }
    return await bestGroup;
  }
}
