import { Lesson } from './../model/lesson';
import { Observable } from 'rxjs';
import { Course } from './../model/course';
import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { map, shareReplay, filter } from 'rxjs/operators';


@Injectable({
 providedIn: 'root',
})

export class CoursesService{
    constructor(private http: HttpClient){

    }

    loadCourseById(courseId:number){
        return this.http.get<Course>(`/api/courses/${courseId}`)
         .pipe(
            shareReplay()
         );
    }

    loadAllCourseLesson(courseId:number):Observable<Lesson[]>{
        return this.http.get<Lesson[]>("/api/lessons",{
            params:{
                pageSize:"10000",
                courseId:courseId.toString()
            }
        })
        .pipe(
            map(res => res["payload"]),
            shareReplay()
        );
        
    }

    LoadAllCourses():Observable<Course[]>{
        return this.http.get<Course[]>("/api/courses")
        .pipe(
            map(res =>res["payload"]),
            shareReplay()//to send one request
        );
         
    }

    saveCourse(courssId:string,changes:Partial<Course>):Observable<any>{//**Partial** Make all properties in T optional
        return this.http.put(`/api/courses/${courssId}`,changes)
        .pipe(
            shareReplay()
        )
    }



    searchLessons(search:string):Observable<Lesson[]>{
        return this.http.get<Lesson[]>("/api/lessons",{
            params:{
                filter:search,
                pageSize:"100"
            }
        })
        .pipe(
            map(res => res["payload"]),
            shareReplay()
        );
    }
}