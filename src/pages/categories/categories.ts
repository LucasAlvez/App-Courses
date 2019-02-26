import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category/category.model';
import { enviroment } from '../../environment/api';

@IonicPage()
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage {

  bucketUrl = enviroment.bucketUrl;

  categories: Category[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public categoryService: CategoryService) {
  }

  ionViewDidLoad() {
    this.categoryService.findAll().subscribe(response => {
      this.categories = this.categories.concat(response['content']);
    }, error => {
      if (error.status == 403) {
        this.navCtrl.setRoot('HomePage');
      }
    });
  }

  showCoursesByCategory(categoryId: string) {
    this.navCtrl.push('CoursesPage', {categoryId: categoryId});
  }

  showAllCourses() {
    this.navCtrl.push('CoursesPage');
  }
}
