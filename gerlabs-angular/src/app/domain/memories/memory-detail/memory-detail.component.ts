import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { Location } from "@angular/common";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { FormUtils } from "../../../shared/form.utils";
import { Memory } from '../shared/memory.model';
import { MemoryService } from '../shared/memory.service';

import { switchMap } from "rxjs/operators";

@Component({
  selector: 'memory-detail',
  templateUrl: './memory-detail.component.html',
  styles: [".form-control-feedback{ margin-right:20px }"]
})

export class MemoryDetailComponent implements OnInit {
  public form: FormGroup;
  public memory: Memory;
  public formUtils: FormUtils;


  public constructor(
    private memoryService: MemoryService,
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
    this.memory = new Memory(null, null);

    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.memoryService.getById(+params.get('id')))
    )
      .subscribe(
        memory => this.setMemory(memory),
        error => alert("Ocorreu um no servidor, tente mais tarde.")
      )
  }


  public setMemory(memory: Memory): void {
    this.memory = memory;
    this.form.patchValue(memory);
  }


  public goBack() {
    this.location.back();
  }


  public updateMemory() {
    this.memory.name = this.form.get('name').value;

    this.memoryService.update(this.memory)
      .subscribe(
        () => {if(confirm("Memória atualizada com sucesso!")) this.router.navigate(['/memories'])},
        () => alert("Ocorreu um no servidor, tente mais tarde.")
      )
  }
}