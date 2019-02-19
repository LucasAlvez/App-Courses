import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { Credentials } from '../../models/credentials/credentials.model';
import { AuthService } from '../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  credentials: Credentials = {
    email: "",
    pass: ""
  };

  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public authService: AuthService) {

  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }

  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }

  ionViewDidEnter() {
    this.authService.refreshToken().subscribe(response => {
      this.authService.successfullLogin(response.headers.get('Authorization'));
      this.navCtrl.setRoot('CategoriesPage');
    }, error => {});
  }

  login() {
    this.authService.authenticate(this.credentials).subscribe(response => {
      this.authService.successfullLogin(response.headers.get('Authorization'));
      this.navCtrl.setRoot('CategoriesPage');
    }, error => {});
  }
}