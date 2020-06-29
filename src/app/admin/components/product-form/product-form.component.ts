import { Product } from 'shared/models/product';
import { ProductSeriveService, Item } from 'shared/services/product-serive.service';
import { CategoryService } from 'shared/services/category.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { CustomValidators } from 'ngx-custom-validators';import { Router, ActivatedRoute } from '@angular/router';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  id;
  categories$;
  categoryImageURL='';
  product:Product;
  productFormControl = new FormGroup({
    'title': new FormControl('',[Validators.required]),
    'price': new FormControl('',[Validators.required,Validators.pattern('[0-9]+(\.[0-9]{1,2})?'), CustomValidators.min(0)]),
    'category': new FormControl('',[Validators.required]),
    'imageURL': new FormControl('',[Validators.required, CustomValidators.url])
  });

    constructor(private route : ActivatedRoute, private categoryService : CategoryService, private productService : ProductSeriveService, private router : Router) {
    this.categories$=categoryService.getAll()
    this.id = this.route.snapshot.paramMap.get('id')
    if (this.id ) {this.productService.get(this.id).subscribe((p:Product)=>{this.product=p})}
    else {this.product= <Product>{}}
    
  }

  ngOnInit(): void {
  }


  
save(product){
  if (this.id) this.productService.update(this.id,product)
  else this.productService.creat(product)
  this.router.navigate(['/admin/products'])
}
delete(){
  
  if (!confirm('Are you sure you want to delete this product')) return;
  
  this.productService.delete(this.id)
  this.router.navigate(['/admin/products'])



}


/**changeCategory(name){
  this.categoryService.getImageUrlCategory(name).subscribe(c=>{this.category=c
    this.categoryImageURL=this.category.imageURL
    console.log(this.category)
  })
}**/
}
