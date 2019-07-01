import { Response } from "@angular/http";
import { Injectable } from "@angular/core";

import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { TokenService } from "../../../shared/token.service";
import { Discipline } from "./discipline.model";


@Injectable()

export class DisciplineService{
  public disciplinesUrl = "disciplines";

  public constructor(private tokenHttp: TokenService){}


  public getAll(): Observable<Discipline[]>{
    let url = `${this.disciplinesUrl}?q[s]=updated_at+DESC`;
    
    return this.tokenHttp.get(url).pipe(
      catchError(this.handleErrors),
      map((response: Response) => this.responseToDisciplines(response))
    )
  }

  
  public getImportant(): Observable<Discipline[]>{
    let url = `${this.disciplinesUrl}?q[s]=deadline+ASC`;
    
    return this.tokenHttp.get(url).pipe(
      catchError(this.handleErrors),
      map((response: Response) => this.responseToDisciplines(response))
    )
  }


  public getById(id: number): Observable<Discipline> {
    let url = `${this.disciplinesUrl}/${id}`;

    return this.tokenHttp.get(url).pipe(
      catchError(this.handleErrors),
      map((response: Response) => this.responseToDiscipline(response))
    )
  }


  public create(discipline: Discipline): Observable<Discipline> {
    let url = this.disciplinesUrl;
    let body = JSON.stringify(discipline);

    return this.tokenHttp.post(url, body).pipe(
      catchError(this.handleErrors),
      map((response: Response) => this.responseToDiscipline(response))
    )
  }


  public update(discipline: Discipline): Observable<Discipline> {
    let url = `${this.disciplinesUrl}/${discipline.id}`;
    let body = JSON.stringify(discipline);

    return this.tokenHttp.put(url, body).pipe(
      catchError(this.handleErrors),
      map((response: Response) => this.responseToDiscipline(response))
    )
  }


  public delete(id: number): Observable<null> {
    let url = `${this.disciplinesUrl}/${id}`;

    return this.tokenHttp.delete(url).pipe(
      catchError(this.handleErrors),
      map(() => null)
    )
  }


  public searchByTitle(term: string): Observable<Discipline[]> {
    let url = `${this.disciplinesUrl}?q[title_cont]=${term}`;

    return this.tokenHttp.get(url).pipe(
      catchError(this.handleErrors),
      map((response: Response) => this.responseToDisciplines(response))
    )
  }


  private handleErrors(error: Response){
    console.log("SALVANDO O ERRO NUM ARQUIVO DE LOG - DETALHES DO ERRO => ", error);
    return throwError(error);
  }


  private responseToDisciplines(response: Response): Discipline[]{
    let collection = response.json().data as Array<any>;
    let disciplines: Discipline[] = [];

    collection.forEach(item => {
      let discipline = new Discipline(
        item.id,
        item.attributes.name,
        item.attributes.code,
        item.attributes['course-id'],
      )

      disciplines.push(discipline)
    })
    
    return disciplines;
  }


  private responseToDiscipline(response: Response): Discipline {
    return new Discipline(
      response.json().data.id,
      response.json().data.attributes.name,
      response.json().data.attributes.code,
      response.json().data.attributes['course-id'],
    )
  }
}