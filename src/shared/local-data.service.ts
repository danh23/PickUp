import { Injectable } from "@angular/core";
import { User } from "./user/user";

@Injectable()
export class LocalDataService {
    public isLoggedIn: boolean = false;
    public isAdmin: boolean;
    public user: User;

    constructor() {
    }

    public login(user: User){
        this.user = user;
        this.isLoggedIn = true;
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

    public logout(){
        localStorage.clear();
    }

}