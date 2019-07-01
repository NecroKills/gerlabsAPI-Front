import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { Location } from "@angular/common";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { FormUtils } from "../../../shared/form.utils";
import { Processor } from '../shared/processor.model';
import { ProcessorService } from '../shared/processor.service';

import { switchMap } from "rxjs/operators";

@Component({
  selector: 'processor-detail',
  templateUrl: './processor-detail.component.html',
  styles: [".form-control-feedback{ margin-right:20px }"]
})

export class ProcessorDetailComponent implements OnInit {
  public form: FormGroup;
  public processor: Processor;
  public formUtils: FormUtils;


  public constructor(
    private processorService: ProcessorService,
    private route: ActivatedRoute,
    private location: Location,
    private formBuilder: FormBuilder,
    private router: Router
  ) {

    this.form = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(100)]]
    })

    this.formUtils = new FormUtils(this.form);
  }


  public ngOnInit() {
    this.processor = new Processor(null, null);

    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.processorService.getById(+params.get('id')))
    )
      .subscribe(
        processor => this.setProcessor(processor),
        error => alert("Ocorreu um no servidor, tente mais tarde.")
      )
  }


  public setProcessor(processor: Processor): void {
    this.processor = processor;
    this.form.patchValue(processor);
  }


  public goBack() {
    this.location.back();
  }


  public updateProcessor() {
    this.processor.name = this.form.get('name').value;

    this.processorService.update(this.processor)
      .subscribe(
        () => {if(confirm("Processador atualizado com sucesso!")) this.router.navigate(['/processors'])},
        () => alert("Ocorreu um no servidor, tente mais tarde.")
      )
  }
}