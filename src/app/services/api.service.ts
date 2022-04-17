import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  postEmployee(data:any){
    return this.http.post<any>("http://localhost:3000/employeesList/", data);
  }

  getEmployee(){
    return this.http.get<any>("http://localhost:3000/employeesList/");
  }

  putEmployee(data:any, id:number){
    return this.http.put<any>("http://localhost:3000/employeesList/"+id, data);
  }

  deleteEmployee(id:number){
    return this.http.delete<any>("http://localhost:3000/employeesList/"+id);
  }
}
