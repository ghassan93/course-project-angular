import { MessagesService } from './../messages/messages.service';
import { HttpClient } from '@angular/common/http';
import { catchError, filter, map, tap, shareReplay } from 'rxjs/operators';
import { Course, sortCoursesBySeqNo } from './../model/course';
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { LoadingService } from '../loading/loading.service';


@Injectable({
    providedIn: 'root',
})
export class CoursesStore{
    [x: string]: any;


    private subject = new BehaviorSubject<Course[]>([]);

    courses$: Observable<Course[]>=this.subject.asObservable();

    constructor(
        private http:HttpClient,
        private loadingService: LoadingService,
        private messages: MessagesService){
        
        this.loadAllCourses();
    }


    private  loadAllCourses(){
        
      const loadCourses$ =  this.http.get<Course[]>(`/api/courses`)
        .pipe(
            map(respons => respons['payload']),
            catchError(err =>{
                const message ="Could not load  courses";
                this.messagesService.showErrors(message); 
                console.log(message,err);
                return throwError(err);
            }),
            //if not error
            tap(courses => this.subject.next(courses))
        );

        this.loadingService.showLoaderUntilCompleted(loadCourses$)
        .subscribe();
    }
                                         // Partial not follow all key of object Course
    saveCourse(courseId:string, changes:Partial<Course>):Observable<any>{
       
         const courses=this.subject.getValue();
         const index =courses.findIndex(course => course.id == courseId);
         const newCourse:Course = {
            ...courses[index],
            ...changes
         };

         const newCourses:Course[] = courses.slice(0);

         newCourse[index]=newCourses;

         this.subject.next(newCourses);
        return this.http.put(`/api/course/${courseId}`,changes)
        .pipe(
            catchError(err => {
                        const Message="Cloud not save  course"
                        this.messagesService.showErrors(Message);
                        return throwError(err)
                    }),
            shareReplay()
        );



    }

    filterByCategory(category: string): Observable<Course[]>{
        return this.courses$
        .pipe(
            map(courses => 
                courses.filter(course => course.category == category)
                .sort(sortCoursesBySeqNo)
                )  
        )
    }

}