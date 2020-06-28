import { switchMap } from 'rxjs/operators';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orders$;
  displayedColumns: string[] = ['name', 'date','edit'];
  constructor(private orderService : OrderService, private authService : AuthService) {
    
    this.orders$=authService.user$.pipe(switchMap(u =>orderService.getOrdersByUser(u.uid)))   
   }
  ngOnInit(): void {
  }

}
