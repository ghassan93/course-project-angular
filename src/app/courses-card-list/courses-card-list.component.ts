import { filter, tap } from 'rxjs/operators';
import { Course } from './../model/course';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CourseDialogComponent } from '../course-dialog/course-dialog.component';

@Component({
  selector: 'courses-card-list',
  templateUrl: './courses-card-list.component.html',
  styleUrls: ['./courses-card-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesCardListComponent implements OnInit {
@Input() courses:Course[] =[];
@Output() private coursChanged = new EventEmitter();

  constructor( 
    private dialog: MatDialog) { }

  ngOnInit(): void {
  }


  editCourse(course: Course) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "400px";

    dialogConfig.data = course;

    const dialogRef = this.dialog.open(CourseDialogComponent, dialogConfig);
    dialogRef.afterClosed()
    .pipe(
       filter(val=> !!val),
       tap(() => this.coursChanged.emit())
    )
    .subscribe( )
  }

}
