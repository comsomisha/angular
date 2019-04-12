import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { Student } from '../models/student';
import { Inject } from '@angular/core';
import { delay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-student-editor',
  templateUrl: './student-editor.component.html',
  styleUrls: ['./student-editor.component.css']
}) 
export class StudentEditorComponent implements OnInit {
  instance: Student;
  showInfo: boolean;
  showError: boolean;
  showContent: boolean;
  info: string;
  error: string;
  action: string;

  constructor(private dataService: StudentService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {    
    this.instance = new Student(0, null, null, null, 1, 0, 0);
    this.instance.ID = undefined;
    this.showContent = true;
    this.action = "Add";
    this.route.paramMap.subscribe((params: ParamMap) => {
      var id = parseInt(params.get('id'));
      if (!Number.isNaN(id)) {
        this.action = "Edit";
        this.instance.ID = id;
        this.dataService.getStudent(id).subscribe(
          data => this.setData(data),
          error => this.handleError(error)
        );
      }
    });


    /*
    if (this.data["id"] == undefined) {
    }
    else {
      this.dataService.getStudent(this.data["id"]).subscribe(
        data => this.setData(data));
    }
    */
  }

  setData(data: Student) {
    this.instance = data;
  }

  onSaveClick(studentForm) {
    console.log(studentForm);
    this.showError = false;
    if (this.instance.ID == undefined) {
      //this.instance = studentForm.value;
      this.dataService.addStudent(this.instance).subscribe(
        data => { this.instance = data; this.studentUpdated(); },
        error => { this.handleError(error); });
    } else {
      this.dataService.updateStudent(this.instance).subscribe(
        data => this.studentUpdated());
    }
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

  studentUpdated() {
    //this.router.navigate(['/students', { id: this.instance.ID }]);
    console.log(this.route);
    this.router.navigate(['../', { id: this.instance.ID }], { relativeTo: this.route });
  }

  backClick() {
    this.router.navigate(['/students']);
  }

  onCloseClick() {
    this.router.navigate(['/students']);
  }

}
