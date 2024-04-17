import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  user: string|null = '';

  constructor(private router:Router) {}

  ngOnInit(): void {
    // Retrieve email from query parameters
    this.user=localStorage.getItem('user');
    if(this.user==null){
      this.router.navigate(['/product']);
    }
  }
}


