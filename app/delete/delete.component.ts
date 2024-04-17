import { Component } from '@angular/core';
import { NodeUtilityService } from '../node-utility.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css'
})
export class DeleteComponent {
  constructor(private util:NodeUtilityService){
	
	}
  dmail: string = '';
  msg:string='';
    delete() {
      this.util.delete(this.dmail).subscribe((data) => {
        if (data.status) {
          this.msg = data.message;
          
        }
      });
    }
  
}
