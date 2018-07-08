import { Injectable } from "@angular/core";
import { User } from "./user/user";

@Injectable()
export class LocalDataService {
    public isLoggedIn: boolean = false;
    public isAdmin: boolean;
    public user: User;
    public authToken: string;

    constructor() {
    }

    public login(user: User){
        this.user = user;
        this.isLoggedIn = true;
        this.authToken = btoa(user.email + ":" + user.password);
        localStorage.setItem("authToken", this.authToken);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("loggedIn", "true");
    }

    public checkIsLoggedIn(){
        return localStorage.getItem("loggedIn");
    }

    public getUser(){
        if(this.user === undefined){
            this.user = JSON.parse(localStorage.getItem("user"));
        }
        return this.user;
    }

    public getAuthToken(){
        if(this.authToken === undefined){
            this.authToken = JSON.parse(localStorage.getItem("authToken"));
        }
        return this.authToken;
    }

    public logout(){
        localStorage.clear();
    }

}