import { Component } from '@angular/core';
import { NodeUtilityService } from '../node-utility.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
 
  name: string="";
  username: string="";
  email: String="";
  phone: String="";
  password: String="";
  gender: String="";


	msg:string='';

	constructor(private util:NodeUtilityService){}

  onSubmit(form: any) {
    this.util
      .insert(form.value.name, form.value.uname, form.value.email,form.value.phone,form.value.password,form.value.gender)
      .subscribe((data) => {
        if (data.status) this.msg = data.message;
      });
  }

}
