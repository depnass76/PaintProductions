﻿import { OnInit } from "@angular/core";
import { Component } from "@angular/core";
import { Store } from "../services/store.service";

@Component({
    selector:"product-list",
    templateUrl: "productListView.component.html",
    styleUrls: ["productListView.component.css"]

})
export default class ProductListView implements OnInit {
     
    
    constructor(public store: Store) {
    }
    ngOnInit(): void {
        this.store.loadProducts()
            .subscribe(); //this kicks off the operations
    }
}