import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserInputPage } from './user-input';

@NgModule({
  declarations: [
    UserInputPage,
  ],
  imports: [
    IonicPageModule.forChild(UserInputPage),
  ],
})
export class UserInputPageModule {}
