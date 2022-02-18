import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  products = new BehaviorSubject('');

  constructor(private http: HttpClient) { }

  addProduct(data: any) {
    return this.http.post<any>('http://localhost:3000/products/', data);
  }

  getAllProducts() {
    return this.http.get<any>('http://localhost:3000/products/');
  }

  deleteProduct(id: number) {
    return this.http.delete<any>('http://localhost:3000/products/'+id);
  }

  putProduct(id: number, data: any) {
    return this.http.put<any>('http://localhost:3000/products/'+id, data);
  }
}
