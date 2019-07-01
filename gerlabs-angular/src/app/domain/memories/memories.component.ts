import { Component, OnInit } from '@angular/core';

import { Memory } from './shared/memory.model';
import { MemoryService } from './shared/memory.service';

@Component({
  selector: 'memories',
  templateUrl: './memories.component.html'
})

export class MemoriesComponent implements OnInit {
  public memories: Array<Memory>;
  public newMemory: Memory;

  public constructor(private memoryService: MemoryService) {
    this.newMemory = new Memory(null, '');
  }

  public ngOnInit() {


    this.memoryService.getAll()
      .subscribe(
        memories => this.memories = memories.sort((a, b) => b.id - a.id),
        error => alert("Ocorreu um no servidor, tente mais tarde.")
      )
  }

  public createMemory() {
    this.newMemory.name = this.newMemory.name.trim();

    if (!this.newMemory.name) {
      alert("A memória deve ter um nome");
    } else {
      this.memoryService.create(this.newMemory)
        .subscribe(
          (memory) => {
            this.memories.unshift(memory);
            this.newMemory = new Memory(null, '');
          },
          () => alert("Ocorreu um no servidor, tente mais tarde.")
        )
    }
  }

  public deleteMemory(memory: Memory) {
    if (confirm(`Deseja realmente excluir a memória "${memory.name}"?`)) {
      this.memoryService.delete(memory.id)
        .subscribe(
          () => this.memories = this.memories.filter(t => t !== memory),
          () => alert("Ocorreu um no servidor, tente mais tarde.")
        )
    }
  }

}