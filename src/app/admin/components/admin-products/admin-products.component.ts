import { Product } from 'shared/models/product';
import { ProductSeriveService } from 'shared/services/product-serive.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';



@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})

export class AdminProductsComponent implements OnInit, OnDestroy {
  products:{key: string, value:Product}[];
  displayedColumns: string[] = ['title', 'price','edit'];
  dataSource: MatTableDataSource<Product>;
  source=[]
  sourceKey=[]
  subscription : Subscription
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private productService :ProductSeriveService) {
    this.subscription=this.productService.getAll().subscribe(p => {this.products=p
      for (let prod of this.products) {this.source.push(prod.value); this.sourceKey.push(prod.key) }
      this.dataSource = new MatTableDataSource(this.source)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort
    })
      
   }

  ngOnInit(): void {
      
    
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()

  }
  

  filter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }


  }


}


