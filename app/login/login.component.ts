
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { NodeUtilityService } from '../node-utility.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  msg: string = "";
  user: string = "";
  
  constructor(private router: Router, private util:NodeUtilityService) {}

  onSubmit(form: any) {
    this.util.insert1(form.value.username, form.value.password).subscribe((data) => {
      if (data.status) {
        console.log("Server response:", data);
        // If status is true, login successful
        if (data.message === 'admin') {
          localStorage.setItem("admin", form.value.username);
          this.router.navigate(['/admin']);
        } else {
          localStorage.setItem("user", form.value.username);
          this.router.navigate(['/product']);
        }
        this.msg = data.message;
      } else {
        // If status is false, login failed
        this.msg = data.message;
      }
    });
  }
}
