import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProductState } from 'src/app/store/reducers/product.reducer';
import { getProductSelector } from 'src/app/store/selectors/product.selectors';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productApiUrl = `${environment.apiBaseUrl}Product`

  constructor(private http: HttpClient) { }

  public getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.productApiUrl}/GetProduct/${id}`)
  }

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.productApiUrl}/GetProducts`)
  }

  public getAvailableProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.productApiUrl}/GetAvailableProducts`)
  }

  public addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.productApiUrl}/AddProduct`, product)
  }

  public updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.productApiUrl}/UpdateProduct/${product.id}`, product)
  }

  public removeProduct(productId: string){
    return this.http.delete(`${this.productApiUrl}/RemoveProduct/${productId}`)
  }
}
