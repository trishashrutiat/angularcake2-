import { Component } from '@angular/core';
import { NodeUtilityService } from '../node-utility.service';

@Component({
  selector: 'app-forgetpass',
  templateUrl: './forgetpass.component.html',
  styleUrls: ['./forgetpass.component.css'] // Changed from 'styleUrl' to 'styleUrls'
})
export class ForgetpassComponent {
  msg: string = ' ';

  constructor(private util: NodeUtilityService) {}

  onSubmit(form: any) {
    this.util.update(form.value.email, form.value.npassword).subscribe((data) => { // Changed 'password' to 'npassword'
      if (data.status) {
        this.msg = data.message;
      }
    });
  }
}
