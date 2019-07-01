import { Response } from "@angular/http";
import { Injectable } from "@angular/core";

import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { TokenService } from "../../../shared/token.service";
import { Processor } from "./processor.model";


@Injectable()

export class ProcessorService{
  public processorsUrl = "processors";

  public constructor(private tokenHttp: TokenService){}


  public getAll(): Observable<Processor[]>{
    let url = `${this.processorsUrl}?q[s]=updated_at+DESC`;
    
    return this.tokenHttp.get(url).pipe(
      catchError(this.handleErrors),
      map((response: Response) => this.responseToProcessors(response))
    )
  }

  
  public getImportant(): Observable<Processor[]>{
    let url = `${this.processorsUrl}?q[s]=deadline+ASC`;
    
    return this.tokenHttp.get(url).pipe(
      catchError(this.handleErrors),
      map((response: Response) => this.responseToProcessors(response))
    )
  }


  public getById(id: number): Observable<Processor> {
    let url = `${this.processorsUrl}/${id}`;

    return this.tokenHttp.get(url).pipe(
      catchError(this.handleErrors),
      map((response: Response) => this.responseToProcessor(response))
    )
  }


  public create(processor: Processor): Observable<Processor> {
    let url = this.processorsUrl;
    let body = JSON.stringify(processor);

    return this.tokenHttp.post(url, body).pipe(
      catchError(this.handleErrors),
      map((response: Response) => this.responseToProcessor(response))
    )
  }


  public update(processor: Processor): Observable<Processor> {
    let url = `${this.processorsUrl}/${processor.id}`;
    let body = JSON.stringify(processor);

    return this.tokenHttp.put(url, body).pipe(
      catchError(this.handleErrors),
      map((response: Response) => this.responseToProcessor(response))
    )
  }


  public delete(id: number): Observable<null> {
    let url = `${this.processorsUrl}/${id}`;

    return this.tokenHttp.delete(url).pipe(
      catchError(this.handleErrors),
      map(() => null)
    )
  }


  public searchByTitle(term: string): Observable<Processor[]> {
    let url = `${this.processorsUrl}?q[title_cont]=${term}`;

    return this.tokenHttp.get(url).pipe(
      catchError(this.handleErrors),
      map((response: Response) => this.responseToProcessors(response))
    )
  }


  private handleErrors(error: Response){
    console.log("SALVANDO O ERRO NUM ARQUIVO DE LOG - DETALHES DO ERRO => ", error);
    return throwError(error);
  }


  private responseToProcessors(response: Response): Processor[]{
    let collection = response.json().data as Array<any>;
    let processors: Processor[] = [];

    collection.forEach(item => {
      let processor = new Processor(
        item.id,
        item.attributes.name
      )

      processors.push(processor)
    })
    
    return processors;
  }


  private responseToProcessor(response: Response): Processor {
    return new Processor(
      response.json().data.id,
      response.json().data.attributes.name
    )
  }
}