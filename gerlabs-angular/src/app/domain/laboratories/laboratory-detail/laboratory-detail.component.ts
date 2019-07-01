import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { Location } from "@angular/common";
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";

import { FormUtils } from "../../../shared/form.utils";
import { Laboratory } from '../shared/laboratory.model';
import { LaboratoryService } from '../shared/laboratory.service';

import { switchMap } from "rxjs/operators";

@Component({
  selector: 'laboratory-detail',
  templateUrl: './laboratory-detail.component.html',
  styles: [".form-control-feedback{ margin-right:20px }"]
})

export class LaboratoryDetailComponent implements OnInit, AfterViewInit{
  public form: FormGroup;
  public laboratory: Laboratory;
  public laboratoryDoneOptions: Array<any>;
  public hardwares: Array<any>;
  public softwares: Array<any>;
  public equipments: Array<any>;
  public formUtils: FormUtils;


  public constructor(
    private laboratoryService: LaboratoryService,
    private route: ActivatedRoute,
    private location: Location,
    private formBuilder: FormBuilder,
    private router: Router
  ){ 
    this.hardwares = [
      { value: false, text: "Pendente" },
      { value: true, text: "Feita" }
    ];
    this.softwares = [
      { value: false, text: "Pendente" },
      { value: true, text: "Feita" }
    ];
    this.equipments = [
      { value: false, text: "Pendente" },
      { value: true, text: "Feita" }
    ];

    this.form = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      capacity: [null, Validators.required],
      type: [null, Validators.required],
      hardware: [null, Validators.required],
      software: [null, Validators.required],
      equipment: [null, Validators.required],
      description: [null]
    })

    this.formUtils = new FormUtils(this.form);
  }


  public ngOnInit(){
    this.laboratory = new Laboratory(null, 'null', 'null', 'null', 'null', 'null', 'null');

    // this.route.paramMap.pipe(
    //   switchMap((params: ParamMap) => this.laboratoryService.getById(+params.get('id')))
    // )
    // .subscribe(
    //   laboratory => this.setLaboratory(laboratory),
    //   error => alert("Ocorreu um no servidor, tente mais tarde.")
    // )
  }


  public setLaboratory(laboratory: Laboratory): void {
    this.laboratory = laboratory;
    this.form.patchValue(laboratory);
  }


  public ngAfterViewInit(){
    $("#deadline").datetimepicker({
      'sideBySide': true,
      'locale': 'pt-br'
    }).on('dp.change', ()=> this.form.get('deadline').setValue( $("#deadline").val() ));
  }


  public goBack() {
    this.location.back();
  }


  public updateLaboratory(){
    this.laboratory.name = this.form.get('name').value;
    // this.laboratory.deadline = this.form.get('deadline').value;
    // this.laboratory.done = this.form.get('done').value;
    this.laboratory.description = this.form.get('description').value;

    this.laboratoryService.update(this.laboratory)
      .subscribe(
        () => {if(confirm("Laboratorio atualizado com sucesso!")) this.router.navigate(['/laboratories'])},
        () => alert("Ocorreu um no servidor, tente mais tarde.")
      )
  }
}