import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { Location } from "@angular/common";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { FormUtils } from "../../../shared/form.utils";
import { VideoCard } from '../shared/video_card.model';
import { VideoCardService } from '../shared/video_card.service';

import { switchMap } from "rxjs/operators";

@Component({
  selector: 'video_card-detail',
  templateUrl: './video_card-detail.component.html',
  styles: [".form-control-feedback{ margin-right:20px }"]
})

export class VideoCardDetailComponent implements OnInit {
  public form: FormGroup;
  public video_card: VideoCard;
  public formUtils: FormUtils;


  public constructor(
    private videoCardService: VideoCardService,
    private route: ActivatedRoute,
    private location: Location,
    private formBuilder: FormBuilder,
    private router: Router
  ) {

    this.form = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      memory_gpu: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(100)]]
    })

    this.formUtils = new FormUtils(this.form);
  }


  public ngOnInit() {
    this.video_card = new VideoCard(null, null, null);

    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.videoCardService.getById(+params.get('id')))
    )
      .subscribe(
        video_card => this.setVideoCard(video_card),
        error => alert("Ocorreu um no servidor, tente mais tarde.")
      )
  }


  public setVideoCard(video_card: VideoCard): void {
    this.video_card = video_card;
    this.form.patchValue(video_card);
  }


  public goBack() {
    this.location.back();
  }


  public updateVideoCard() {
    this.video_card.name = this.form.get('name').value;
    this.video_card.memory_gpu = this.form.get('memory_gpu').value;
    
    this.videoCardService.update(this.video_card)
      .subscribe(
        () => {if(confirm("Placa de vídeo atualizada com sucesso!")) this.router.navigate(['/video_cards'])},
        () => alert("Ocorreu um no servidor, tente mais tarde.")
      )
  }
}