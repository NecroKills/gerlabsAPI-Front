import { Response } from "@angular/http";
import { Injectable } from "@angular/core";

import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { TokenService } from "../../../shared/token.service";
import { Hardware } from "./hardware.model";


@Injectable()

export class HardwareService {
  public hardwaresUrl = "hardwares";

  public constructor(private tokenHttp: TokenService) { }


  public getAll(): Observable<Hardware[]> {
    let url = `${this.hardwaresUrl}?q[s]=updated_at+DESC`;

    return this.tokenHttp.get(url).pipe(
      catchError(this.handleErrors),
      map((response: Response) => this.responseToHardwares(response))
    )
  }


  public getImportant(): Observable<Hardware[]> {
    let url = `${this.hardwaresUrl}?q[s]=deadline+ASC`;

    return this.tokenHttp.get(url).pipe(
      catchError(this.handleErrors),
      map((response: Response) => this.responseToHardwares(response))
    )
  }


  public getById(id: number): Observable<Hardware> {
    let url = `${this.hardwaresUrl}/${id}`;

    return this.tokenHttp.get(url).pipe(
      catchError(this.handleErrors),
      map((response: Response) => this.responseToHardware(response))
    )
  }


  public create(hardware: Hardware): Observable<Hardware> {
    let url = this.hardwaresUrl;
    let body = JSON.stringify(hardware);

    return this.tokenHttp.post(url, body).pipe(
      catchError(this.handleErrors),
      map((response: Response) => this.responseToHardware(response))
    )
  }


  public update(hardware: Hardware): Observable<Hardware> {
    let url = `${this.hardwaresUrl}/${hardware.id}`;
    let body = JSON.stringify(hardware);

    return this.tokenHttp.put(url, body).pipe(
      catchError(this.handleErrors),
      map((response: Response) => this.responseToHardware(response))
    )
  }


  public delete(id: number): Observable<null> {
    let url = `${this.hardwaresUrl}/${id}`;

    return this.tokenHttp.delete(url).pipe(
      catchError(this.handleErrors),
      map(() => null)
    )
  }


  public searchByTitle(term: string): Observable<Hardware[]> {
    let url = `${this.hardwaresUrl}?q[title_cont]=${term}`;

    return this.tokenHttp.get(url).pipe(
      catchError(this.handleErrors),
      map((response: Response) => this.responseToHardwares(response))
    )
  }


  private handleErrors(error: Response) {
    console.log("SALVANDO O ERRO NUM ARQUIVO DE LOG - DETALHES DO ERRO => ", error);
    return throwError(error);
  }


  private responseToHardwares(response: Response): Hardware[] {
    let collection = response.json().data as Array<any>;
    let hardwares: Hardware[] = [];

    console.log(collection);
    

    collection.forEach(item => {
      let hardware = new Hardware(
        item.id,
        item.attributes['videoCard-id'],
        item.attributes['memory-id'],
        item.attributes['processor-id']
      )

      hardwares.push(hardware)
    })

    return hardwares;
  }


  private responseToHardware(response: Response): Hardware {
    return new Hardware(
      response.json().data.id,
      response.json().data.attributes['videoCard-id'],
      response.json().data.attributes['memory-id'],
      response.json().data.attributes['processor-id']
    )
  }
}