import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { Location } from "@angular/common";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { FormUtils } from "../../../shared/form.utils";
import { Discipline } from '../shared/discipline.model';
import { DisciplineService } from '../shared/discipline.service';
import { CourseService } from 'app/domain/courses/shared/course.service';
import { Course } from 'app/domain/courses/shared/course.model';

import { switchMap } from "rxjs/operators";

@Component({
  selector: 'discipline-detail',
  templateUrl: './discipline-detail.component.html',
  styles: [".form-control-feedback{ margin-right:20px }"]
})

export class DisciplineDetailComponent implements OnInit {
  public form: FormGroup;
  public discipline: Discipline;
  public formUtils: FormUtils;
  public courses: Array<Course>;

  public constructor(
    private disciplineService: DisciplineService,
    private route: ActivatedRoute,
    private location: Location,
    private formBuilder: FormBuilder,
    private courseService: CourseService,
    private router: Router
  ) {

    this.form = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      code: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      course_id: [null, [Validators.required]]
    })

    this.formUtils = new FormUtils(this.form);
  }


  public ngOnInit() {
    this.discipline = new Discipline(null, null, null, null);

    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.disciplineService.getById(+params.get('id')))
    )
      .subscribe(
        discipline => this.setDiscipline(discipline),
        error => alert("Ocorreu um no servidor, tente mais tarde.")
      )

      this.courseService.getAll()
      .subscribe(
        courses => this.courses = courses.sort((a, b) => b.id - a.id),
        error => alert("Ocorreu um no servidor, tente mais tarde.")
      )
  }


  public setDiscipline(discipline: Discipline): void {
    this.discipline = discipline;
    this.form.patchValue(discipline);
  }


  public goBack() {
    this.location.back();
  }


  public updateDiscipline() {
    this.discipline.name = this.form.get('name').value;
    this.discipline.code = this.form.get('code').value;
    this.discipline.course_id = this.form.get('course_id').value;

    this.disciplineService.update(this.discipline)
      .subscribe(
        () => {if(confirm("Disciplina atualizada com sucesso!")) this.router.navigate(['/disciplines'])},
        () => alert("Ocorreu um no servidor, tente mais tarde.")
      )
  }
}