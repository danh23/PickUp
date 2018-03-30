import { Injectable } from "@angular/core";
import { Http, Headers, Response, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Rx";
import { Order } from "./order";
import { endpoints } from "../../config/enpoints";
import { Config } from "../../config/config";

@Injectable()
export class OrderService {
    private options: RequestOptions;

    constructor(private http: Http) {}

    public createOrder(order: Order){
        let url = Config.apiUrl + endpoints.createOrder
        let result = this.http.post(url, order, this.options)
        .map((response: Response) => <number>response.json())
        .do(data => console.log("Do data: " + JSON.stringify(data)))
        .catch(this.handleError);
        return result;
    }

    public getOrdersByUserId(userId: number){
        let url = Config.apiUrl + endpoints.getOrdersByUserId + "/" + userId;
        let result = this.http.get(url, this.options)
        .map((response: Response) => response.json())
        .do(data => console.log("Do data: " + JSON.stringify(data)))
        .catch(this.handleError);
        return result;
    }
    
    public getOrdersById(orderId: number) {
        let url = Config.apiUrl + endpoints.getOrderById + "/" + orderId;
        let result = this.http.get(url, this.options)
        .map(response => response.json())
        .do(data => console.log("Do data: " + JSON.stringify(data)))
        .catch(this.handleError);
        return result;
    }

    public deleteOrderById(orderId: number) {
        let url = Config.apiUrl + endpoints.deleteOrderById + "/" + orderId;
        let result = this.http.get(url, this.options)
        .do(data => console.log("Do data: " + JSON.stringify(data)))
        .catch(this.handleError);
        return result;
    }

    private handleError(err) {
        let errMessage: string;
        if (err instanceof Response) {
            let body = err.json() || '';
            errMessage = body.message;
        } else {
            errMessage = err.meessage ? err.message : err.toString();
        }
        return Observable.throw(errMessage);
    }

}