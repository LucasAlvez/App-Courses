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
      let start = this.categories.length;
      let end = this.categories.length - 1;
      //this.getCurrentUser();
    }, error => {
      if (error.status == 403) {
        this.navCtrl.setRoot('HomePage');
      }
    });
  }
}
