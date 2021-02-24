import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  customerApiUrl = `${environment.apiBaseUrl}Customer`

  constructor(private http: HttpClient) { }

  public getCustomer(customerId: string): Observable<Customer> {
    return this.http.get<Customer>(`${this.customerApiUrl}/GetCustomer/${customerId}`)
  }

  public getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.customerApiUrl}/GetCustomers`)
  }

  public addCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.customerApiUrl}/CreateCustomer`, customer)
  }

  public updateCustomer(customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.customerApiUrl}/UpdateCustomer/${customer.id}`, customer)
  }

  public removeCustomer(customerId: string){
    return this.http.delete(`${this.customerApiUrl}/RemoveCustomer/${customerId}`)
  }

}
