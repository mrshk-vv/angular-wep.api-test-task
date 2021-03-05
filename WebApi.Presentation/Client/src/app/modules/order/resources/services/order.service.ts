import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orderApiUrl = `${environment.apiBaseUrl}Order`

  constructor(private http: HttpClient) { }

  public getOrder(orderId: string): Observable<Order> {
    return this.http.get<Order>(`${this.orderApiUrl}/GetOrder/${orderId}`)
  }

  public getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.orderApiUrl}/GetOrders`)
  }

  public addOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.orderApiUrl}/CreateOrder`, order)
  }

  public updateOrder(order: Order): Observable<Order> {
    return this.http.put<Order>(`${this.orderApiUrl}/UpdateOrder/${order.id}`, order)
  }

  public removeOrder(orderId: string){
    return this.http.delete(`${this.orderApiUrl}/RemoveOrder/${orderId}`)
  }
}
