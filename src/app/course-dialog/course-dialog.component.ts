import { Message } from './../model/message';
import { CoursesService } from './../services/courses.services';
import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {Course} from "../model/course";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import * as moment from 'moment';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import { LoadingService } from '../loading/loading.service';
import { MessagesService } from '../messages/messages.service';
import { CoursesStore } from '../services/courses.store';

@Component({
    selector: 'course-dialog',
    templateUrl: './course-dialog.component.html',
    styleUrls: ['./course-dialog.component.css'],
    providers:[
        LoadingService,
        MessagesService]
})
export class CourseDialogComponent implements AfterViewInit {

    form: FormGroup;

    course:Course;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<CourseDialogComponent>,
        @Inject(MAT_DIALOG_DATA) course:Course,
        private coursesService:CoursesService,
        private loadingService: LoadingService,
        private messagesService: MessagesService,
        private coursesStore : CoursesStore,
        ) {

        this.course = course;

        this.form = fb.group({
            description: [course.description, Validators.required],
            category: [course.category, Validators.required],
            releasedAt: [moment(), Validators.required],
            longDescription: [course.longDescription,Validators.required]
        });

    }

    ngAfterViewInit() {

    }

    save() {

      const changes = this.form.value;

      this.coursesService.saveCourse(this.course.id,changes)
    //   .pipe(
    //     catchError(err => {
    //         const Message="Cloud not save  course"
    //         this.messagesService.showErrors(Message);
    //         return throwError(err)
    //     })
    //   ) 
      .subscribe();
      this.dialogRef.close(changes);
    }

    close() {
        this.dialogRef.close();
    }

}
