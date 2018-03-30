import { Injectable } from "@angular/core";
import { Subject }    from 'rxjs/Subject';
import { Order, DriverToClientNotification } from "./order/order";

@Injectable()
export class SharedService {

    private sendOrder = new Subject<Order>();  
    private orderTakenNotification = new Subject<DriverToClientNotification>();

    sendOrder$ = this.sendOrder.asObservable();
    orderTakenNotification$ = this.orderTakenNotification.asObservable();
    

    publishData(data: Order) {
        this.sendOrder.next(data);
    }

    publishOrderTakenNotification(data: DriverToClientNotification) {
        this.orderTakenNotification.next(data);
    }

}