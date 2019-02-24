import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { UserCreate } from '../../models/user/user-create.model';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  formGroup: FormGroup;
  user: UserCreate;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alert: AlertController,
    public formBuilder: FormBuilder,
    public userService: UserService) {

    this.formGroup = this.formBuilder.group({
      name: [null, Validators.required],
      email: [null,  Validators.compose([Validators.required, Validators.email])],
      pass : [null, Validators.compose([Validators.required, Validators.minLength(6)])] 
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signupUser() {
    this.userService.postUser(this.formGroup.value).subscribe(response => {
      this.showAlert();
    }, error => {});
  }

  showAlert() {
    let alertCtrl =  this.alert.create({
      title: 'Sucesso',
      message: "Cadastro efetuado com sucesso",
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.pop();
          }  
        }
      ]
    });
    alertCtrl.present();
  }
}
