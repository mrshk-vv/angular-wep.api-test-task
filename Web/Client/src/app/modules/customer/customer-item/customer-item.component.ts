import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Guid } from 'guid-typescript';
import { addCustomer } from 'src/app/store/actions/customer.actions';
import { CustomerState } from 'src/app/store/reducers/customer.reducer';
import { Customer } from '../resources/models/customer.model';

@Component({
  selector: 'app-customer-item',
  templateUrl: './customer-item.component.html',
  styleUrls: ['./customer-item.component.scss']
})
export class CustomersItemComponent implements OnInit {

  customerId: string

  customerForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(6)]),
    address: new FormControl('', [Validators.required, Validators.minLength(10)]),
  })

  constructor(private store: Store<CustomerState>) { }

  ngOnInit(): void {
    this.initCustomerForm()
  }

  initCustomerForm(){
    this.customerForm.setValue({
      name: '',
      address: ''
    })
  }


  get name(){
    return this.customerForm.get('name') as FormGroup
  }

  get address(){
    return this.customerForm.get('address') as FormGroup
  }

  submit(){
    let customer: Customer = this.customerForm.value
    this.store.dispatch(addCustomer({customerToAdd: customer}))
  }

}
