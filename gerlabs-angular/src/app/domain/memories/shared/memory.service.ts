import { Response } from "@angular/http";
import { Injectable } from "@angular/core";

import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { TokenService } from "../../../shared/token.service";
import { Memory } from "./memory.model";


@Injectable()

export class MemoryService{
  public memoriesUrl = "memories";

  public constructor(private tokenHttp: TokenService){}


  public getAll(): Observable<Memory[]>{
    let url = `${this.memoriesUrl}?q[s]=updated_at+DESC`;
    
    return this.tokenHttp.get(url).pipe(
      catchError(this.handleErrors),
      map((response: Response) => this.responseToMemories(response))
    )
  }


  public getById(id: number): Observable<Memory> {
    let url = `${this.memoriesUrl}/${id}`;

    return this.tokenHttp.get(url).pipe(
      catchError(this.handleErrors),
      map((response: Response) => this.responseToMemory(response))
    )
  }


  public create(memory: Memory): Observable<Memory> {
    let url = this.memoriesUrl;
    let body = JSON.stringify(memory);

    return this.tokenHttp.post(url, body).pipe(
      catchError(this.handleErrors),
      map((response: Response) => this.responseToMemory(response))
    )
  }


  public update(memory: Memory): Observable<Memory> {
    let url = `${this.memoriesUrl}/${memory.id}`;
    let body = JSON.stringify(memory);

    return this.tokenHttp.put(url, body).pipe(
      catchError(this.handleErrors),
      map((response: Response) => this.responseToMemory(response))
    )
  }


  public delete(id: number): Observable<null> {
    let url = `${this.memoriesUrl}/${id}`;

    return this.tokenHttp.delete(url).pipe(
      catchError(this.handleErrors),
      map(() => null)
    )
  }


  public searchByTitle(term: string): Observable<Memory[]> {
    let url = `${this.memoriesUrl}?q[title_cont]=${term}`;

    return this.tokenHttp.get(url).pipe(
      catchError(this.handleErrors),
      map((response: Response) => this.responseToMemories(response))
    )
  }


  private handleErrors(error: Response){
    console.log("SALVANDO O ERRO NUM ARQUIVO DE LOG - DETALHES DO ERRO => ", error);
    return throwError(error);
  }


  private responseToMemories(response: Response): Memory[]{
    let collection = response.json().data as Array<any>;
    let memories: Memory[] = [];

    collection.forEach(item => {
      let memory = new Memory(
        item.id,
        item.attributes.name
      )

      memories.push(memory)
    })
    
    return memories;
  }


  private responseToMemory(response: Response): Memory {
    return new Memory(
      response.json().data.id,
      response.json().data.attributes.name
    )
  }
}