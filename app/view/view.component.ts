import { Component } from '@angular/core';
import { NodeUtilityService } from '../node-utility.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})

export class ViewComponent {
  msg:string="";
  sList:any[]=[];
  constructor(private util:NodeUtilityService){
		this.display();
	}

  display() {
    this.util.display().subscribe((data) => {
      if (data.status) {
        this.sList = data.list;
      }
      this.msg = data.message;
    });
  }
}