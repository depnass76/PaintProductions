import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Store }from "./store.service";

@Injectable()
export default class AuthActivator implements CanActivate {

    constructor(private store: Store, private router: Router) {
    }

    canActivate(route:any, state:any): boolean {
        if (this.store.loginRequired) {
            this.router.navigate(["login"]);
            return false;
        } else {
            return true;
        }
    }
}