import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  imageUrl = 'assets/ibaco.mp4';
  
  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigateToOtherPage(): void {
    this.router.navigate(['/login']); // Navigate to the 'other' route
  }
}

  