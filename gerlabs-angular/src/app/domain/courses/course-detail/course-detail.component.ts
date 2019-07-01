import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { Location } from "@angular/common";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { FormUtils } from "../../../shared/form.utils";
import { Course } from '../shared/course.model';
import { CourseService } from '../shared/course.service';

import { switchMap } from "rxjs/operators";

@Component({
  selector: 'course-detail',
  templateUrl: './course-detail.component.html',
  styles: [".form-control-feedback{ margin-right:20px }"]
})

export class CourseDetailComponent implements OnInit {
  public form: FormGroup;
  public course: Course;
  public formUtils: FormUtils;


  public constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private location: Location,
    private formBuilder: FormBuilder,
    private router: Router
  ) {

    this.form = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      code: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(100)]]
    })

    this.formUtils = new FormUtils(this.form);
  }


  public ngOnInit() {
    this.course = new Course(null, null, null);

    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.courseService.getById(+params.get('id')))
    )
      .subscribe(
        course => this.setCourse(course),
        error => alert("Ocorreu um no servidor, tente mais tarde.")
      )
  }


  public setCourse(course: Course): void {
    this.course = course;
    this.form.patchValue(course);
  }


  public goBack() {
    this.location.back();
  }


  public updateCourse() {
    this.course.name = this.form.get('name').value;
    this.course.code = this.form.get('code').value;

    this.courseService.update(this.course)
      .subscribe(
        () => {if(confirm("Curso atualizado com sucesso!")) this.router.navigate(['/courses'])},
        () => alert("Ocorreu um no servidor, tente mais tarde.")
      )
  }
}