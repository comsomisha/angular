import { Component, OnInit } from '@angular/core';
import { Student } from '../models/student';
import { Observable } from 'rxjs/Observable';
import { StudentService } from '../student.service';
import { StudentEditComponent } from '../student-edit/student-edit.component';
import { HttpClientModule} from '@angular/common/http'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GroupService } from '../group.service'
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})

export class StudentListComponent implements OnInit {
  data: Array<Student>;
  columns: Array<string>;

  sortCol: String;
  sortDest: String;

  pageNum: number;
  pageLength: number;
  totalCount: number;
  biggestGroup: number;
  selectedStudentID: number;

  constructor(private dataService: StudentService,
    public dialog: MatDialog,
    private groupService: GroupService,
    private router: Router,
    private activatedRoute: ActivatedRoute    
  ) {
    this.selectedStudentID = 0;
    this.pageNum = 1;
    this.pageLength = 3;

  }

  loadData() {
    let s = function (n) {
      this.biggestGroup = n
    };
    this.groupService.getGroupWithMaximalStudentCount().then(s.bind(this),
      function (e) {
        console.log("Error" + e);
      }
    );
    //this.biggestGroup = this.groupService.bestGroup;
    console.log("Group result in component");
    console.log(this.biggestGroup);
    this.dataService.getData(this.sortCol, this.sortDest, this.pageNum, this.pageLength).subscribe(
      data => { this.data = data.Page; this.totalCount = data.TotalCount },
      error => { console.log(error); }
    );
  }
  ngOnInit() {
    this.loadData();
    this.columns = this.dataService.getColumns();
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      var id = parseInt(params.get('id'));
      this.selectedStudentID = id;
    });

  }

  sort(col) {
    if (col == this.sortCol) {
      this.sortDest = (this.sortDest == "asc") ? "desc" : "asc";
    }
    else {
      this.sortCol = col;
      this.sortDest = "asc";
    }
    this.loadData();
  }

  onForward() {
    this.pageNum++;
    this.loadData();
  }

  onBackward() {
    if (this.pageNum > 1) {
      this.pageNum--;
      this.loadData();
    }
  }

  onStatClick(e) {
    this.router.navigate([e.target.value + "/stat"], { relativeTo: this.activatedRoute, queryParamsHandling: '' });
  }

  onEditClick(e) {
    //this.router.navigate(['/students/edit', e.target.value]);
    console.log(this.router.url);
    this.router.navigate([e.target.value], { relativeTo: this.activatedRoute, queryParamsHandling: '' });
    /*
    const ref = this.dialog.open(StudentEditComponent, {
      height: '400px',
      width: '400px',
      maxHeight: '400px',
      maxWidth: '400px',
      
      data: { id: e.target.value}
    });
    */
  }
  onDeleteClick(e) {
    console.log("delete...");
    console.log(e.target.value);
  }
  onAddClick() {
    const ref = this.dialog.open(StudentEditComponent, {
      height: '400px',
      width: '400px',
      maxHeight: '400px',
      maxWidth: '400px',

      data: { }
    });
  }

  nextEnabled()
  {
    return this.totalCount > this.pageNum * this.pageLength;
  }
  backEnabled() {
    return this.pageNum > 1;
  }

  isSelected(s: Student) {
    return s.ID == this.selectedStudentID;
  }

}
