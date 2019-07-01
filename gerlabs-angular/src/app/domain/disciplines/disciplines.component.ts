import { Component, OnInit } from '@angular/core';

import { Discipline } from './shared/discipline.model';
import { DisciplineService } from './shared/discipline.service';
import { Course } from '../courses/shared/course.model';
import { CourseService } from '../courses/shared/course.service';

@Component({
  selector: 'disciplines',
  templateUrl: './disciplines.component.html'
})

export class DisciplinesComponent implements OnInit {
  public disciplines: Array<Discipline>;
  public courses: Array<Course>;
  public newDiscipline: Discipline;

  public constructor(
    private disciplineService: DisciplineService,
    private courseService: CourseService
    ) {
    this.newDiscipline = new Discipline(null, '', '', null);
  }

  public ngOnInit() {
    this.disciplineService.getAll()
      .subscribe(
        disciplines => this.disciplines = disciplines.sort((a, b) => b.id - a.id),
        error => alert("Ocorreu um no servidor, tente mais tarde.")
      )

      this.courseService.getAll()
      .subscribe(
        courses => this.courses = courses.sort((a, b) => b.id - a.id),
        error => alert("Ocorreu um no servidor, tente mais tarde.")
      )
  }

  public createDiscipline() {
    this.newDiscipline.name = this.newDiscipline.name.trim();
    this.newDiscipline.code = this.newDiscipline.code.trim();

    if (!this.newDiscipline.name || !this.newDiscipline.code || !this.newDiscipline.course_id) {
      alert("A disciplina deve ter um nome, um código e um curso");
    } else {
      this.disciplineService.create(this.newDiscipline)
        .subscribe(
          (discipline) => {
            this.disciplines.unshift(discipline);
            this.newDiscipline = new Discipline(null, '', '', null);
          },
          () => alert("Ocorreu um no servidor, tente mais tarde.")
        )
    }
  }

  public deleteDiscipline(discipline: Discipline) {
    if (confirm(`Deseja realmente excluir a disciplina "${discipline.name}"?`)) {
      this.disciplineService.delete(discipline.id)
        .subscribe(
          () => this.disciplines = this.disciplines.filter(t => t !== discipline),
          () => alert("Ocorreu um no servidor, tente mais tarde.")
        )
    }
  }

}