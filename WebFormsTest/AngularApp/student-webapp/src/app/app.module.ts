import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentEditComponent } from './student-edit/student-edit.component';
import { StudentEditorComponent } from './student-editor/student-editor.component';

import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule, MatButtonModule } from '@angular/material'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { GroupService } from './group.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { StudentStatComponent } from './student-stat/student-stat.component';
import { StudentMarksComponent } from './student-marks/student-marks.component';
import { StudentSubjectsComponent } from './student-subjects/student-subjects.component';
//import { MatDialogRefModule } from '@angular/material'
//import { MAT_DIALOG_DATA } from '@angular/material'

@NgModule({
  declarations: [
    AppComponent,
    StudentListComponent,
    StudentEditComponent,
    StudentEditorComponent,
    NotFoundComponent,
    StudentStatComponent,
    StudentMarksComponent,
    StudentSubjectsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatButtonModule
    //MatDialogRefModule
  ],
  entryComponents: [StudentEditComponent],
  providers: [GroupService],
  bootstrap: [AppComponent]
})
export class AppModule { }
