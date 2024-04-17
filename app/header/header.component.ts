import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  public totalItem : number = 0;
  public searchTerm !: string;
  constructor(private cartService : CartService,private router: Router) { }
  user:string|null="";

  ngOnInit(): void {
   
    this.user=localStorage.getItem('user');
     if(this.user==null){
      this.router.navigateByUrl('/product');
     } 


    this.cartService.getProducts()
    .subscribe(res=>{
      this.totalItem = res.length;
    })
  }

logout() {
  // Other logout logic
  this.cartService.clearCartData(); // Clear cart data
  localStorage.removeItem('user');
  this.router.navigateByUrl('/login'); // Adjust the route accordingly

}

  

}
