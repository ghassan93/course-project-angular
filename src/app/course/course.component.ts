import { Lesson } from './../model/lesson';
import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Course} from '../model/course';
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  tap,
  delay,
  map,
  concatMap,
  switchMap,
  withLatestFrom,
  concatAll, shareReplay, catchError
} from 'rxjs/operators';
import {merge, fromEvent, Observable, concat, throwError, combineLatest} from 'rxjs';
import { CoursesService } from '../services/courses.services';



interface CourseData{
  course :Course;
  lessons: Lesson[];
}


@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseComponent implements OnInit {

  // course$: Observable <Course>;

  // lessons$: Observable <Lesson[]>;

  data$: Observable <CourseData>;

  constructor(private route: ActivatedRoute,
    private coursesService:CoursesService) {


  }

  ngOnInit() {

    const courseId =parseInt (this.route.snapshot.paramMap.get("courseId"))
    const course$= this.coursesService.loadCourseById(courseId)
    //combind wite course to complete compinde
    // first null to complete anuther Observable
    .pipe(
      startWith(null)
    );

    const lessons$ = this.coursesService.loadAllCourseLesson(courseId)
    // .pipe(
    //   startWith(null)
    // );


//combind two defernt Observable
// to get all data in same time
    this.data$=combineLatest([course$, lessons$])
    .pipe(
      map(([course,lessons]) => {
          return {
            course,lessons
          }
      }),
      tap(console.log)
      
      
    );
  }


}











