import { Component, OnInit } from '@angular/core';

import { VideoCard } from './shared/video_card.model';
import { VideoCardService } from './shared/video_card.service';

@Component({
  selector: 'video_cards',
  templateUrl: './video_cards.component.html'
})

export class VideoCardsComponent implements OnInit{
  public video_cards: Array<VideoCard>;
  public newVideoCard: VideoCard;

  public constructor(private videoCardService: VideoCardService){ 
    this.newVideoCard = new VideoCard(null, '','');
  }

  public ngOnInit(){
    

    this.videoCardService.getAll()
      .subscribe(
        video_cards => this.video_cards = video_cards.sort((a, b) => b.id - a.id),
        error => alert("Ocorreu um no servidor, tente mais tarde.")
      )
  }
  
  public createVideoCard(){
    this.newVideoCard.name = this.newVideoCard.name.trim();
    this.newVideoCard.memory_gpu = this.newVideoCard.memory_gpu.trim();

    if(!this.newVideoCard.name || !this.newVideoCard.memory_gpu){
      alert("A placa de vídeo deve ter um nome e uma GPU");
    }else{
      this.videoCardService.create(this.newVideoCard)
        .subscribe(
          (video_card) => {
            this.video_cards.unshift(video_card);
            this.newVideoCard = new VideoCard(null, name, '');
          },
          () => alert("Ocorreu um no servidor, tente mais tarde.")
        )
    }
  }

  public deleteVideoCard(video_card: VideoCard){
    if ( confirm(`Deseja realmente excluir a placa de vídeo "${video_card.name}"?`) ) {
      this.videoCardService.delete(video_card.id)
        .subscribe(
          () => this.video_cards = this.video_cards.filter(t => t !== video_card),
          () => alert("Ocorreu um no servidor, tente mais tarde.")
        )
    }
  }

}