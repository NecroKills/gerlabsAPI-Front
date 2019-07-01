import { Component, OnInit } from '@angular/core';

import { Processor } from './shared/processor.model';
import { ProcessorService } from './shared/processor.service';

@Component({
  selector: 'processors',
  templateUrl: './processors.component.html'
})

export class ProcessorsComponent implements OnInit{
  public processors: Array<Processor>;
  public newProcessor: Processor;

  public constructor(private processorService: ProcessorService){ 
    this.newProcessor = new Processor(null, '');
  }

  public ngOnInit(){
    

    this.processorService.getAll()
      .subscribe(
        processors => this.processors = processors.sort((a, b) => b.id - a.id),
        error => alert("Ocorreu um no servidor, tente mais tarde.")
      )
  }
  
  public createProcessor(){
    this.newProcessor.name = this.newProcessor.name.trim();

    if(!this.newProcessor.name){
      alert("O precessador deve ter um nome");
    }else{
      this.processorService.create(this.newProcessor)
        .subscribe(
          (processor) => {
            this.processors.unshift(processor);
            this.newProcessor = new Processor(null, name);
          },
          () => alert("Ocorreu um no servidor, tente mais tarde.")
        )
    }
  }

  public deleteProcessor(processor: Processor){
    if ( confirm(`Deseja realmente excluir o processador "${processor.name}"?`) ) {
      this.processorService.delete(processor.id)
        .subscribe(
          () => this.processors = this.processors.filter(t => t !== processor),
          () => alert("Ocorreu um no servidor, tente mais tarde.")
        )
    }
  }

}