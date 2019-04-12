import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentEditorComponent } from './student-editor/student-editor.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { StudentStatComponent } from 'src/app/student-stat/student-stat.component';
import { StudentMarksComponent } from 'src/app/student-marks/student-marks.component';
import { StudentSubjectsComponent } from 'src/app/student-subjects/student-subjects.component';


const routes: Routes = [
  { path: "", redirectTo: "/students", pathMatch: "full" },
  { path: "students/:id", component: StudentEditorComponent },
  {
    path: "students/:id/stat",
    component: StudentStatComponent,
    children: [
      {
        path: "marks", component: StudentMarksComponent
      },
      {
        path: "subjects", component: StudentSubjectsComponent
      }
    ]    
  },
  { path: "students/add", component: StudentEditorComponent },
  { path: "students", component: StudentListComponent },
  { path: "**", component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
