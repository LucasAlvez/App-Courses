import { Component } from '@angular/core';
import { NavController, IonicPage, ToastController } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { Credentials } from '../../models/credentials/credentials.model';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { UserDetils } from '../../models/user/userDetails.model';

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

  user: UserDetils;

  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public authService: AuthService,
    public userService: UserService,
    public toast: ToastController) {

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
    }, error => { });
  }

  login() {
    this.authService.authenticate(this.credentials).subscribe(response => {
      this.authService.successfullLogin(response.headers.get('Authorization'));
      this.navCtrl.setRoot('CategoriesPage');
      this.getCurrentUser();
    }, error => { });
  }

  getCurrentUser() {
    this.userService.getUser().subscribe(response => {
     this.user = response;
      let toastCtrl = this.toast.create({
        message: 'Olá ' + this.user.name,
        duration: 3000
      });
      toastCtrl.present();
    }, error => {});
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }
}