import { Component, OnInit } from '@angular/core';

import { Course } from './shared/course.model';
import { CourseService } from './shared/course.service';

@Component({
  selector: 'courses',
  templateUrl: './courses.component.html'
})

export class CoursesComponent implements OnInit{
  public courses: Array<Course>;
  public newCourse: Course;

  public constructor(private courseService: CourseService){ 
    this.newCourse = new Course(null, '', '');
  }

  public ngOnInit(){
    

    this.courseService.getAll()
      .subscribe(
        courses => this.courses = courses.sort((a, b) => b.id - a.id),
        error => alert("Ocorreu um no servidor, tente mais tarde.")
      )
  }
  
  public createCourse(){
    this.newCourse.name = this.newCourse.name.trim();
    this.newCourse.code = this.newCourse.code.trim();

    if(!this.newCourse.name || !this.newCourse.code){
      alert("O curso deve ter um nome e um código");
    }else{
      this.courseService.create(this.newCourse)
        .subscribe(
          (course) => {
            this.courses.unshift(course);
            this.newCourse = new Course(null, '', '');
          },
          () => alert("Ocorreu um no servidor, tente mais tarde.")
        )
    }
  }

  public deleteCourse(course: Course){
    if ( confirm(`Deseja realmente excluir o curso "${course.name}"?`) ) {
      this.courseService.delete(course.id)
        .subscribe(
          () => this.courses = this.courses.filter(t => t !== course),
          () => alert("Ocorreu um no servidor, tente mais tarde.")
        )
    }
  }

}