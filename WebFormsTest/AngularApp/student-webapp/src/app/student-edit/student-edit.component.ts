import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { Student } from '../models/student';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
}) 
export class StudentEditComponent implements OnInit {
  instance: Student;
  showInfo: boolean;
  showError: boolean;
  info: string;
  error: string;

  constructor(private dataService: StudentService,
    public dialogRef: MatDialogRef<StudentEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: object) { }

  ngOnInit() {
    if (this.data["id"] == undefined) {
      this.instance = new Student(0, null, null, null, 1, 0, 0);
      this.instance.ID = undefined;
    }
    else {
      this.dataService.getStudent(this.data["id"]).subscribe(
        data => this.setData(data));
    }
  }

  setData(data: Student) {
    this.instance = data;
  }

  onSaveClick() {
    this.showError = false;
    if (this.instance.ID == undefined) {
      this.dataService.addStudent(this.instance).subscribe(
        data => this.studentUpdated(),
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
      case 404: s = "Student with ID " + this.instance.ID + " is not found"; break;
      case 0: s = "Server is unavailable"; break;
    }
    this.error = s;
    this.showError = true;
  }

  studentUpdated() {
    this.showInfo = true;
    this.info = "Student data updated.";
    this.dialogRef.close();
  }

  onCloseClick() {
    console.log("Cancel clicked");
  }

}
