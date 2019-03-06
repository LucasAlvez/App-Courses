import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Course } from '../../../models/course/course.model';
import { CourseService } from '../../../services/course.service';
import { UserService } from '../../../services/user.service';

@IonicPage()
@Component({
  selector: 'page-courses-details',
  templateUrl: 'courses-details.html',
})
export class CoursesDetailsPage {

  userId: string;
  course: Course;
  isStudent: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userService: UserService,
    public courseService: CourseService) {
  }

  ionViewDidLoad() {
    this.getCurrentUser();
    let courseId = this.navParams.get('courseId');

    this.courseService.getById(courseId).subscribe(response => {
      this.course = response;
      this.verifyStudents(courseId);
    }, error => { });
  }

  addStudents(id) {
    this.courseService.patchStudents(id).subscribe(response => {
    }, error => { });
  }

  getCurrentUser() {
    this.userService.getUser().subscribe(response => {
      this.userId = response.id;
    }, error => { });
  }

  verifyStudents(id) {
    this.courseService.getAllStudents(id).subscribe(response => {
      response['content'].forEach(student => {
        if (student.account.id === this.userId) {
          this.isStudent = true;
        }
      });
    }, error => { });
  }
}
