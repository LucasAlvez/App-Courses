import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoryService } from '../../services/category.service';
import { Course } from '../../models/course/course.model';
import { enviroment } from '../../environment/api';
import { CourseService } from '../../services/course.service';
import { UserService } from '../../services/user.service';

@IonicPage()
@Component({
  selector: 'page-courses',
  templateUrl: 'courses.html',
})
export class CoursesPage {

  bucketUrl = enviroment.bucketUrl;
  courses: Course[] = [];
  students: any[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userService: UserService,
    public categoryService: CategoryService,
    public courseService: CourseService) {
  }

  ionViewDidLoad() {
    let categoryId = this.navParams.get('categoryId');

    if (categoryId) {
      this.getByCategory(categoryId);
    } else {
      this.getAll();
    }

  }

  getByCategory(categoryId) {
    this.categoryService.getCoursesByCategory(categoryId).subscribe(response => {
      this.courses = response['content'];
    }, error => { });
  }

  getAll() {
    this.courseService.findAll().subscribe(response => {
      this.courses = response['content'];
    }, error => { });
  }
  
  courseDetails(courseId) {
    this.navCtrl.push('CoursesDetailsPage', {courseId: courseId});
  }
}
