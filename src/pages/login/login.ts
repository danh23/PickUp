import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from "../../providers/user/user";
import { User } from "../../shared/user/user";
import { HomePage } from "../home/home";
import { LocalDataService } from "../../shared/local-data.service";
import { RegisterPage } from '../register/register';

declare var facebookConnectPlugin: any;

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  value: string;
  password: string;
  user: User = new User();
  isLoggingIn = true;

  @ViewChild("container") container: ElementRef;

  constructor(public navCtrl: NavController, private userService: UserProvider, private localData: LocalDataService) {
  }

  submit() {
      this.navCtrl.push(RegisterPage);
  }

  login() {

    //console.log(this.value);
    this.userService.login(this.value).subscribe(
      (res) => {
        this.user = res;
        this.localData.login(res);
        this.navCtrl.setRoot(HomePage);
      },
      (error) => alert("Unfortunately we could not find your account.")
    );
  }

  toggleDisplay() {
    this.isLoggingIn = !this.isLoggingIn;
  }

 

  fbLogin() {
    facebookConnectPlugin.login(["public_profile"], function(userData) {
      console.log("UserInfo: ", userData);
    }, function(error) {
      console.error(error);
    })
  }

}
