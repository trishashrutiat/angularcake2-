import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList: any[] = [];
  public productList = new BehaviorSubject<any[]>([]);

  constructor() {
    // Load cart data from local storage when the service is instantiated
    this.loadCartData();
  }

  getProducts() {
    return this.productList.asObservable();
  }

  // Method to save cart data to local storage
  private saveCartData() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItemList));
  }

  // Method to load cart data from local storage
  private loadCartData() {
    const savedCartItems = localStorage.getItem('cartItems');
    if (savedCartItems) {
      this.cartItemList = JSON.parse(savedCartItems);
      this.productList.next(this.cartItemList);
    }
  }

  // Method to clear cart data from local storage and reset the cart
  clearCartData() {
    localStorage.removeItem('cartItems');
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
  }

  setProduct(products: any[]) {
    this.cartItemList.push(...products);
    this.productList.next(this.cartItemList);
    // Save cart data to local storage after updating
    this.saveCartData();
  }

  addtoCart(product: any) {
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    // Save cart data to local storage after updating
    this.saveCartData();
  }

  getTotalPrice(): number {
    let grandTotal = 0;
    this.cartItemList.forEach(item => {
      grandTotal += item.total;
    });
    return grandTotal;
  }

  removeCartItem(product: any) {
    const index = this.cartItemList.findIndex(item => item.id === product.id);
    if (index !== -1) {
      this.cartItemList.splice(index, 1);
      this.productList.next(this.cartItemList);
      // Save cart data to local storage after updating
      this.saveCartData();
    }
  }

  removeAllCart() {
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
    // Save cart data to local storage after updating
    this.saveCartData();
  }
}
