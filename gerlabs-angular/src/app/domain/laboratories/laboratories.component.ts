import { Component, OnInit } from '@angular/core';

import { Laboratory } from './shared/laboratory.model';
import { LaboratoryService } from './shared/laboratory.service';

@Component({
  selector: 'laboratories',
  templateUrl: './laboratories.component.html'
})

export class LaboratoriesComponent implements OnInit{
  public laboratories: Array<Laboratory>;
  public newLaboratory: Laboratory;

  public constructor(private laboratoryService: LaboratoryService){ 
    this.newLaboratory = new Laboratory(null, '', '', '', '', '', '');
  }

  public ngOnInit(){
    
    this.laboratories = [];
    // this.laboratoryService.getAll()
    //   .subscribe(
    //     laboratories => this.laboratories = laboratories.sort((a, b) => b.id - a.id),
    //     error => alert("Ocorreu um no servidor, tente mais tarde.")
    //   )
  }
  
  public createLaboratory(){
    this.newLaboratory.name = this.newLaboratory.name.trim();

    if(!this.newLaboratory.name){
      alert("O laboratório deve ter um nome");
    }else{
      this.laboratoryService.create(this.newLaboratory)
        .subscribe(
          (laboratory) => {
            this.laboratories.unshift(laboratory);
            this.newLaboratory = new Laboratory(null, '', '', '', '', '', '');
          },
          () => alert("Ocorreu um no servidor, tente mais tarde.")
        )
    }
  }

  public deleteLaboratory(laboratory: Laboratory){
    if ( confirm(`Deseja realmente excluir a tarefa "${laboratory.name}"?`) ) {
      this.laboratoryService.delete(laboratory.id)
        .subscribe(
          () => this.laboratories = this.laboratories.filter(t => t !== laboratory),
          () => alert("Ocorreu um no servidor, tente mais tarde.")
        )
    }
  }

}