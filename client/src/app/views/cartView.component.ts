import { OnInit } from "@angular/core";
import { Component } from "@angular/core";
import { Store } from "../services/store.service";

@Component({
    selector: "cart",
    templateUrl: "cartView.component.html",
    styleUrls:["cartView.component.css"]

})
export default class CartView  {


    constructor(public store: Store) {

    }
   
}