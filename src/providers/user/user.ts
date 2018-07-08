import { Injectable } from "@angular/core";
import { Http, Headers, Response, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

import { Config } from "../../config/config";
import { User } from "../../shared/user/user";
import { endpoints } from "../../config/enpoints";

@Injectable()
export class UserProvider {
  
    private options: RequestOptions;
    
    constructor(private http: Http) {}

    register(user: User) {
      let url = Config.apiUrl + endpoints.createUser

      //console.log(url);
      let result = this.http.post(url, user, this.options)
      .map((response: Response) => <number>response.json())
      .do(data => console.log("Do data: " + JSON.stringify(data)))
      .catch(this.handleError);
      return result;
    }

    login(value: string) {
      let url = Config.apiUrl + endpoints.getUserByEmailOrUsername;
      let result = this.http.post(url, value, this.options)
      .map((response: Response) => response.json())
      .do(data => console.log("Do data: " + JSON.stringify(data)))
      .catch(this.handleError);
      //console.log(result);
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