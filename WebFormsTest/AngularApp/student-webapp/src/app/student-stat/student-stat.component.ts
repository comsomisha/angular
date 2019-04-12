import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router';
import { StudentService } from '../student.service';
import { Student } from 'src/app/models/student';

@Component({
  selector: 'app-student-stat',
  templateUrl: './student-stat.component.html',
  styleUrls: ['./student-stat.component.css']
})
export class StudentStatComponent implements OnInit {
  instance: Student;
  showInfo: boolean;
  showError: boolean;
  showContent: boolean;
  info: string;
  error: string;
 
  constructor(private dataService: StudentService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      var id = parseInt(params.get('id'));
      console.log(id);
      if (!Number.isNaN(id)) {        
        this.dataService.getStudent(id).subscribe(
          data => this.setData(data),
          error => this.handleError(error)
        );
      }
    });

  }

  setData(data: Student) {
    console.log(data);
    this.instance = data;
  }

  Marks() {
    this.router.navigate(['marks'], { relativeTo: this.route });
  }

  Subjects() {
    this.router.navigate(['subjects'], { relativeTo: this.route });
  }

  handleError(error) {
    var s = "Unknown error";
    switch (error.status) {
      case 500: s = "Internal server error"; break;
      case 400: s = "Please input correct data"; break;
      case 404: s = "Student with ID " + this.instance.ID + " is not found"; this.showContent = false; break;
      case 0: s = "Server is unavailable"; break;
    }
    this.error = s;
    this.showError = true;
  }


}
