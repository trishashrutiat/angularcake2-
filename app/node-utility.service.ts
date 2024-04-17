import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class NodeUtilityService {
  url:string="http://localhost:5000/"
  
    constructor(private httpClient:HttpClient) { }

  insert(name:string,uname:string,email:string,phone:number,password:string,gender:string ):Observable<any>{
    return this.httpClient.get(this.url+"insert?name="+name+"&username="+uname+"&email="+email+"&phone="+phone+"&password="+password+"&gender="+gender);
  }
  
  display():Observable<any>{
    return this.httpClient.get(this.url+"findAll");
  }

  insert1(username:string,password:string):Observable<any>{
    return this.httpClient.get(this.url+"insert1?username="+username+"&password="+password);
  }

  delete(email: string): Observable<any> {
    return this.httpClient.get(this.url + 'delete?email=' + email);
  }
  update(email: string, new_password: string): Observable<any> {
    return this.httpClient.get(`${this.url}update?email=${email}&password=${new_password}`);
  }

}