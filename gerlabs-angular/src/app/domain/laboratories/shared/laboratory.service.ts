import { Response } from "@angular/http";
import { Injectable } from "@angular/core";

import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { TokenService } from "../../../shared/token.service";
import { Laboratory } from "./laboratory.model";


@Injectable()

export class LaboratoryService{
  public laboratoriesUrl = "laboratories";

  public constructor(private tokenHttp: TokenService){}


  public getAll(): Laboratory[]{
    let url = `${this.laboratoriesUrl}?q[s]=updated_at+DESC`;
    
    let laboratories: Laboratory[];

    return laboratories;

    // return this.tokenHttp.get(url).pipe(
    //   catchError(this.handleErrors),
    //   map((response: Response) => this.responseToLaboratories(response))
    // )
  }

  
  public getImportant(): Observable<Laboratory[]>{
    let url = `${this.laboratoriesUrl}?q[s]=deadline+ASC`;
    
    return this.tokenHttp.get(url).pipe(
      catchError(this.handleErrors),
      map((response: Response) => this.responseToLaboratories(response))
    )
  }


  public getById(id: number): Observable<Laboratory> {
    let url = `${this.laboratoriesUrl}/${id}`;

    return this.tokenHttp.get(url).pipe(
      catchError(this.handleErrors),
      map((response: Response) => this.responseToLaboratory(response))
    )
  }


  public create(laboratory: Laboratory): Observable<Laboratory> {
    let url = this.laboratoriesUrl;
    let body = JSON.stringify(laboratory);

    return this.tokenHttp.post(url, body).pipe(
      catchError(this.handleErrors),
      map((response: Response) => this.responseToLaboratory(response))
    )
  }


  public update(laboratory: Laboratory): Observable<Laboratory> {
    let url = `${this.laboratoriesUrl}/${laboratory.id}`;
    let body = JSON.stringify(laboratory);

    return this.tokenHttp.put(url, body).pipe(
      catchError(this.handleErrors),
      map((response: Response) => this.responseToLaboratory(response))
    )
  }


  public delete(id: number): Observable<null> {
    let url = `${this.laboratoriesUrl}/${id}`;

    return this.tokenHttp.delete(url).pipe(
      catchError(this.handleErrors),
      map(() => null)
    )
  }


  public searchByTitle(term: string): Observable<Laboratory[]> {
    let url = `${this.laboratoriesUrl}?q[name_cont]=${term}`;

    return this.tokenHttp.get(url).pipe(
      catchError(this.handleErrors),
      map((response: Response) => this.responseToLaboratories(response))
    )
  }


  private handleErrors(error: Response){
    console.log("SALVANDO O ERRO NUM ARQUIVO DE LOG - DETALHES DO ERRO => ", error);
    return throwError(error);
  }


  private responseToLaboratories(response: Response): Laboratory[]{
    let collection = response.json().data as Array<any>;
    let laboratories: Laboratory[] = [];

    // collection.forEach(item => {
    //   let laboratory = new Laboratory(
    //     item.id,
    //     item.attributes.name,
    //     item.attributes.description,
    //     item.attributes.done,
    //     item.attributes['deadline-to-br']
    //   )

      // laboratories.push(laboratory)
    // })
    
    return laboratories;
  }


  private responseToLaboratory(response: Response): Laboratory {
    return new Laboratory(null, null, null, null, null, null, null)
    //   response.json().data.id,
    //   response.json().data.attributes.name,
    //   response.json().data.attributes.description,
    //   response.json().data.attributes.done,
    //   response.json().data.attributes['deadline-to-br'],
    // )
  }
}