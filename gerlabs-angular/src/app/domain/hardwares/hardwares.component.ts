import { Component, OnInit } from '@angular/core';

import { Hardware } from './shared/hardware.model';
import { HardwareService } from './shared/hardware.service';
import { Processor } from '../processors/shared/processor.model';
import { Memory } from '../memories/shared/memory.model';
import { ProcessorService } from '../processors/shared/processor.service';
import { MemoryService } from '../memories/shared/memory.service';
import { VideoCardService } from '../video_cards/shared/video_card.service';
import { VideoCard } from '../video_cards/shared/video_card.model';

@Component({
  selector: 'hardwares',
  templateUrl: './hardwares.component.html'
})

export class HardwaresComponent implements OnInit {
  
  public newHardware: Hardware;
  public memories: Array<Memory>;
  public hardwares: Array<Hardware>;
  public processors: Array<Processor>;
  public videoCards: Array<VideoCard>;

  public constructor(
    private hardwareService: HardwareService,
    private processorService: ProcessorService,
    private videoCardService: VideoCardService,
    private memoryService: MemoryService
  ) {
    this.newHardware = new Hardware(null, null, null, null);
  }

  public ngOnInit() {

    this.hardwareService.getAll()
      .subscribe(
        hardwares => this.hardwares = hardwares.sort((a, b) => b.id - a.id),
        error => alert("Ocorreu um no servidor, tente mais tarde.")
      )

    this.processorService.getAll()
      .subscribe(
        processors => this.processors = processors.sort((a, b) => b.id - a.id),
        error => alert("Ocorreu um no servidor, tente mais tarde.")
      )

    this.videoCardService.getAll()
      .subscribe(
        videoCards => this.videoCards = videoCards.sort((a, b) => b.id - a.id),
        error => alert("Ocorreu um no servidor, tente mais tarde.")
      )

    this.memoryService.getAll()
      .subscribe(
        memories => this.memories = memories.sort((a, b) => b.id - a.id),
        error => alert("Ocorreu um no servidor, tente mais tarde.")
      )
  }

  public createHardware() {
    if (!this.newHardware.videoCard
      && !this.newHardware.memory
      && !this.newHardware.processor) {
      alert("O hardware deve ter seus campos preenchidos!");
    } else {
      this.hardwareService.create(this.newHardware)
        .subscribe(
          (hardware) => {
            this.hardwares.unshift(hardware);
            this.newHardware = new Hardware(null, null, null, null);
          },
          () => alert("Ocorreu um no servidor, tente mais tarde.")
        )
    }
  }

  public deleteHardware(hardware: Hardware) {
    if (confirm(`Deseja realmente excluir a tarefa "${hardware.processor}"?`)) {
      this.hardwareService.delete(hardware.id)
        .subscribe(
          () => this.hardwares = this.hardwares.filter(t => t !== hardware),
          () => alert("Ocorreu um no servidor, tente mais tarde.")
        )
    }
  }

}