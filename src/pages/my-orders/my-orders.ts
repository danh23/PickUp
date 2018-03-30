import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Order } from "../../shared/order/order";
import { OrderService } from "../../shared/order/order-service";
import { LocalDataService } from "../../shared/local-data.service";
import { OrderDetailsPage } from "../order-details/order-details";

/**
 * Generated class for the MyOrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-orders',
  templateUrl: 'my-orders.html',
})
export class MyOrdersPage {

  orders: Order[] = new Array<Order>();

  constructor(public navCtrl: NavController, public navParams: NavParams, private orderService: OrderService, private localData:LocalDataService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyOrdersPage');
    let userId = this.localData.getUser().id
    this.orderService.getOrdersByUserId(userId).subscribe(
      (res) => {
        this.orders = res;
      }, (err) => {console.log(err)}
    );
  }

  viewOrder(order: Order){
    this.navCtrl.push(OrderDetailsPage, order.id);
  }

}
