﻿import { RouterModule } from "@angular/router";
import { CheckoutPage } from "../pages/checkout.component";
import LoginPage from "../pages/LoginPage.component";
import {shopPage} from "../pages/shopPage.component";
import AuthActivator from "../services/authActivator.service";

const routes = [
    { path: "", component: shopPage },
    { path: "checkout", component: CheckoutPage , canActivate: [AuthActivator] },
    { path: "login", component: LoginPage },
    { path: "**", redirectTo: "/" }
];

const router = RouterModule.forRoot(routes, 
{
  useHash: false
});

export default router;