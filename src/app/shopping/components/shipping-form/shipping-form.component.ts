import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Order } from 'shared/models/order';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'shared/services/auth.service';
import { OrderService } from 'shared/services/order.service';
import { map } from 'rxjs/operators';




export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  matcher = new MyErrorStateMatcher();
  shippingFormControl = new FormGroup({
    'name': new FormControl('',[Validators.required]),
    'adresse': new FormControl('',[Validators.required]),
    'city': new FormControl('',[Validators.required]),
  });
  userSubscription : Subscription;
  userId;
  @Input('cart') cart;
  constructor(private router : Router , private authService: AuthService , private orderService : OrderService) { }

  ngOnInit() {
    this.userSubscription=this.authService.user$.subscribe(user=>this.userId=user.uid)
  }

  ngOnDestroy(){
    this.userSubscription.unsubscribe();

  }

  async placeOrder(shipping){
    let order = new Order(this.userId, shipping, this.cart);
    let result = await this.orderService.placeOrder(order)
    this.router.navigate(['/order-success', result.key])

  }



}
