import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category/category.model';

@IonicPage()
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage {

  categories: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public categoryService: CategoryService) {
  }

  ionViewDidLoad() {
    this.categoryService.findAll().subscribe(response => {
      this.categories = response;
      console.log(this.categories)
    }, error => {
      if (error.status == 403 || error.status == 500) {
        this.navCtrl.setRoot('HomePage');
      }
    });
  }

  /*
    getImageCategories() {
      this.categoryService.getImage().subscribe(response => { 
  
      }, error => {});
    } */
}
