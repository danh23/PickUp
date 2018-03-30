import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Order } from "../../shared/order/order";
import { OrderService } from "../../shared/order/order-service";

/**
 * Generated class for the OrderDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-details',
  templateUrl: 'order-details.html',
})
export class OrderDetailsPage {

  order: Order = new Order();
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private orderService: OrderService, public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderDetailsPage');
    console.log(this.navParams.data);
    this.orderService.getOrdersById(this.navParams.data).subscribe(res => {
      this.order = res;
    });
  }

  deleteOrder(){
    this.orderService.deleteOrderById(this.order.id).subscribe(
      ()=>{
        this.presentToast().onDidDismiss((data, role)=>{
          this.navCtrl.pop();
        })
      },(err)=>{console.log(err)});
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Order was deleted successfully',
      showCloseButton: true,
      closeButtonText: "OK"
    });
    toast.present();
    return toast;
  }

}
