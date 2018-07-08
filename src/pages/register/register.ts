import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from "../../providers/user/user";
import { User } from "../../shared/user/user";
import { HomePage } from "../home/home";
import { LocalDataService } from "../../shared/local-data.service";
import { LoginPage } from '../login/login';

declare var facebookConnectPlugin: any;

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  email: string;
  password: string;
  rePassword: string;
  lastName: string;
  firstName: string;
  city: string;
  country: string;
  username: string;
  user: User = new User();
  isLoggingIn = true;

  @ViewChild("container") container: ElementRef;

  constructor(public navCtrl: NavController, private userService: UserProvider, private localData: LocalDataService) {
  }

 

  toggleDisplay() {
    this.isLoggingIn = !this.isLoggingIn;
    //let container = this.container.nativeElement;
    // container.animate({
    //   backgroundColor: this.isLoggingIn ? 'red' : 'gray',
    //   duration: 200
    // });
  }

  
  back() {
    this.navCtrl.push(LoginPage);
  }

  signUp() {
    if (this.password != this.rePassword){
      alert("Passwords doesn`t match.");
      this.toggleDisplay();
    }

    this.user.email = this.email;
    this.user.lastName = this.lastName;
    this.user.firstName = this.firstName;
    this.user.city = this.city;
    this.user.country = this.country;
    this.user.password = this.password;
    this.user.username = this.username;
   // console.log(this.user);
    this.userService.register(this.user)
      .subscribe(
        () => {
          this.navCtrl.push(HomePage);
        },
        () => alert("Unfortunately we were unable to create your account.")
      );
  }

  

}
