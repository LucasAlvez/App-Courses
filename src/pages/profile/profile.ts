import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { AccountService } from '../../services/account.service';
import { enviroment } from '../../environment/api';
import { AccountModel } from '../../models/account/account.model';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  account: AccountModel;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storageService: StorageService,
    public accountService: AccountService) {
  }

  ionViewDidLoad() {
    let localUser = this.storageService.getLocalUser();
    if (localUser) {
      this.accountService.getDetails().subscribe(response => {
        this.account = response;
        console.log(this.account)
        this.getImageAccount();
      }, error => {
        if (error.status == 403 || error.status == 500) {
          this.navCtrl.setRoot('HomePage');
        }
      });
    } else {
      this.navCtrl.setRoot('HomePage');
    }
  }

  getImageAccount() {
    this.accountService.getImage(this.account.id).subscribe(response => {
      this.account.image = `${enviroment.bucketUrl}/account${this.account.id}.jpg`
      console.log(this.account)
      console.log(response)
    }, error => { });
  }

}
