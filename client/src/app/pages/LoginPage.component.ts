import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "../services/store.service";
import { LoginRequest } from "../shared/LoginResults";

@Component({
    selector:"login-page",
    templateUrl: "LoginPage.component.html"
})
export default class LoginPage {

    constructor(private store: Store, private router: Router) { }

    public creds: LoginRequest = {
        username: "",
        password: ""
    };

    public errorMessage = "";

    onLogin() {
        this.store.login(this.creds)
            .subscribe(() => {
                    // if successfully loin
                if (this.store.orders.items.length > 0) {
                    this.router.navigate(["/checkout"]);
                } else {
                    this.router.navigate(["/LoginPage"]);
                }
            }, () => this.errorMessage = "Failed to login");
    }

}