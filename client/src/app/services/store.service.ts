import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Product } from "../shared/Product";
import { OrderItem, Orders } from "../shared/Orders";
import { BOOL_TYPE } from "@angular/compiler/src/output/output_ast";
import { LoginRequest, LoginResults } from "../shared/LoginResults";


@Injectable()

export class Store {
    [x: string]: any;

    constructor(private http: HttpClient) {
    
    }

    public paintproducts: Product[] = [];
    public orders: Orders = new Orders();

    public token = "";
    public expiration = new Date();

    loadProducts(): Observable<void> {
        return this.http.get<[]>("https://localhost:44316/api/paintproducts")
            .pipe(map(data => {
                this.paintproducts = data;
                return;
            }));
    }

    get loginRequired(): boolean {
        return this.token.length === 0 || this.expiration > new Date();
    }

    login(creds: LoginRequest) {
        return this.http.post<LoginResults>("/account/createtoken", creds)
            .pipe(map(data => {
                this.token = data.token;
                this.expiration = data.expiration;
            }));
    }

    checkout() {
        const headers = new HttpHeaders().set("Authorization", `Bearer ${this.token}`);
        return this.http.post("/api/orders", this.orders, {
            headers: headers
        })
            .pipe(map(() => {
                this.orders = new Orders();
            }));
    }

    addToOrder(product: Product) {


        let item: OrderItem | undefined;

        item= this.orders.items.find(o => o.productId === product.id);

        if (item) {
            item.quantity++;
        }
        else {
            item = new OrderItem();
            item.productId = product.id;
            item.productTitle = product.title;
            item.productArtId = product.artId;
            item.productArtist = product.artist;
            item.productCategory = product.category;
            item.productSize = product.size;
            item.unitPrice = product.price;
            item.quantity = 1;
            this.orders.items.push(item);
        }
        
    }
    
}