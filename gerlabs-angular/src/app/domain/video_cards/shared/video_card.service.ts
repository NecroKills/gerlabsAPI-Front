import { Response } from "@angular/http";
import { Injectable } from "@angular/core";

import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { TokenService } from "../../../shared/token.service";
import { VideoCard } from "./video_card.model";


@Injectable()

export class VideoCardService{
  public video_cardsUrl = "video_cards";

  public constructor(private tokenHttp: TokenService){}


  public getAll(): Observable<VideoCard[]>{
    let url = `${this.video_cardsUrl}?q[s]=updated_at+DESC`;
    
    return this.tokenHttp.get(url).pipe(
      catchError(this.handleErrors),
      map((response: Response) => this.responseToVideoCards(response))
    )
  }

  
  public getImportant(): Observable<VideoCard[]>{
    let url = `${this.video_cardsUrl}?q[s]=deadline+ASC`;
    
    return this.tokenHttp.get(url).pipe(
      catchError(this.handleErrors),
      map((response: Response) => this.responseToVideoCards(response))
    )
  }


  public getById(id: number): Observable<VideoCard> {
    let url = `${this.video_cardsUrl}/${id}`;

    return this.tokenHttp.get(url).pipe(
      catchError(this.handleErrors),
      map((response: Response) => this.responseToVideoCard(response))
    )
  }


  public create(video_card: VideoCard): Observable<VideoCard> {
    let url = this.video_cardsUrl;
    let body = JSON.stringify(video_card);

    return this.tokenHttp.post(url, body).pipe(
      catchError(this.handleErrors),
      map((response: Response) => this.responseToVideoCard(response))
    )
  }


  public update(video_card: VideoCard): Observable<VideoCard> {
    let url = `${this.video_cardsUrl}/${video_card.id}`;
    let body = JSON.stringify(video_card);

    return this.tokenHttp.put(url, body).pipe(
      catchError(this.handleErrors),
      map((response: Response) => this.responseToVideoCard(response))
    )
  }


  public delete(id: number): Observable<null> {
    let url = `${this.video_cardsUrl}/${id}`;

    return this.tokenHttp.delete(url).pipe(
      catchError(this.handleErrors),
      map(() => null)
    )
  }


  public searchByTitle(term: string): Observable<VideoCard[]> {
    let url = `${this.video_cardsUrl}?q[title_cont]=${term}`;

    return this.tokenHttp.get(url).pipe(
      catchError(this.handleErrors),
      map((response: Response) => this.responseToVideoCards(response))
    )
  }


  private handleErrors(error: Response){
    console.log("SALVANDO O ERRO NUM ARQUIVO DE LOG - DETALHES DO ERRO => ", error);
    return throwError(error);
  }


  private responseToVideoCards(response: Response): VideoCard[]{
    let collection = response.json().data as Array<any>;
    let video_cards: VideoCard[] = [];

    collection.forEach(item => {
      let video_card = new VideoCard(
        item.id,
        item.attributes.name,
        item.attributes["memory-gpu"]
      )

      video_cards.push(video_card)
    })
    
    return video_cards;
  }


  private responseToVideoCard(response: Response): VideoCard {
    console.log(response);
    return new VideoCard(
      response.json().data.id,
      response.json().data.attributes.name,
      response.json().data.attributes["memory-gpu"]
    )
  }
}