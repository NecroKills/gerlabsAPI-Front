import { Response } from "@angular/http";
import { Injectable } from "@angular/core";

import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { TokenService } from "../../../shared/token.service";
import { Course } from "./course.model";


@Injectable()

export class CourseService{
  public coursesUrl = "courses";

  public constructor(private tokenHttp: TokenService){}


  public getAll(): Observable<Course[]>{
    let url = `${this.coursesUrl}?q[s]=updated_at+DESC`;
    
    return this.tokenHttp.get(url).pipe(
      catchError(this.handleErrors),
      map((response: Response) => this.responseToCourses(response))
    )
  }

  
  public getImportant(): Observable<Course[]>{
    let url = `${this.coursesUrl}?q[s]=deadline+ASC`;
    
    return this.tokenHttp.get(url).pipe(
      catchError(this.handleErrors),
      map((response: Response) => this.responseToCourses(response))
    )
  }


  public getById(id: number): Observable<Course> {
    let url = `${this.coursesUrl}/${id}`;

    return this.tokenHttp.get(url).pipe(
      catchError(this.handleErrors),
      map((response: Response) => this.responseToCourse(response))
    )
  }


  public create(course: Course): Observable<Course> {
    let url = this.coursesUrl;
    let body = JSON.stringify(course);

    return this.tokenHttp.post(url, body).pipe(
      catchError(this.handleErrors),
      map((response: Response) => this.responseToCourse(response))
    )
  }


  public update(course: Course): Observable<Course> {
    let url = `${this.coursesUrl}/${course.id}`;
    let body = JSON.stringify(course);

    return this.tokenHttp.put(url, body).pipe(
      catchError(this.handleErrors),
      map((response: Response) => this.responseToCourse(response))
    )
  }


  public delete(id: number): Observable<null> {
    let url = `${this.coursesUrl}/${id}`;

    return this.tokenHttp.delete(url).pipe(
      catchError(this.handleErrors),
      map(() => null)
    )
  }


  public searchByTitle(term: string): Observable<Course[]> {
    let url = `${this.coursesUrl}?q[title_cont]=${term}`;

    return this.tokenHttp.get(url).pipe(
      catchError(this.handleErrors),
      map((response: Response) => this.responseToCourses(response))
    )
  }


  private handleErrors(error: Response){
    console.log("SALVANDO O ERRO NUM ARQUIVO DE LOG - DETALHES DO ERRO => ", error);
    return throwError(error);
  }


  private responseToCourses(response: Response): Course[]{
    let collection = response.json().data as Array<any>;
    let courses: Course[] = [];

    collection.forEach(item => {
      let course = new Course(
        item.id,
        item.attributes.name,
        item.attributes.code
      )

      courses.push(course)
    })
    
    return courses;
  }


  private responseToCourse(response: Response): Course {
    return new Course(
      response.json().data.id,
      response.json().data.attributes.name,
      response.json().data.attributes.code
    )
  }
}