import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  addProduct(data: any) {
    return this.http.post('http://localhost:3000/products', data);
  }

  getAllProducts() {
    return this.http.get('http://localhost:3000/products');
  }
}
