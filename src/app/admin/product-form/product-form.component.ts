import { ProductSeriveService } from './../../product-serive.service';
import { CategoryService } from './../../category.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { CustomValidators } from 'ngx-custom-validators';;

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
  categories$;
  selectedFiles;
  productFormControl = new FormGroup({
    'title': new FormControl('',[Validators.required]),
    'price': new FormControl('',[Validators.required,Validators.pattern('^[0-9]*(\.[0-9]+)*$')]),
    'category': new FormControl('',[Validators.required]),
    'imageURL': new FormControl('',[Validators.required])
  });

    constructor(categoryService : CategoryService, private productService : ProductSeriveService) {
    this.categories$=categoryService.getCategories()

   }

  ngOnInit(): void {
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
}
save(product){
  this.productService.creat(product)
}
}
