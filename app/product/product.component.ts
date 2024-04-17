import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../cart.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})

export class ProductComponent implements OnInit {
  private apiUrl = 'http://localhost:5000/api/cakes';
  public cakeList!: any[];
  user: string|null = '';
  constructor(private http: HttpClient, private api: ApiService, private cartService: CartService,private router:Router) { }

  ngOnInit(): void {

    this.api.getProduct().subscribe(res => {
      this.cakeList = res;
      this.cakeList.forEach((a: any) => {
        Object.assign(a, { quantity: 1, total: a.priceCents }); // Initialize quantity and total for each cake
      });
    });
  }

  addtocart(cake: any, quantity: number) {
    const item = { ...cake, quantity, total: cake.priceCents * quantity }; // Calculate total price based on quantity
    this.cartService.addtoCart(item);
  }
 
}
