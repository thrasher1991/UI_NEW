import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  categoryDetails: any;
  data: any;
  param: any;
  productDetails: object = {};
  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    (this.route.params.subscribe(params => this.param = params))
    let id = JSON.parse(this.param.productId)
    this.http.get(`http://10.117.189.171:8082/INGProduct/api/products/${this.param.productId}`).subscribe((response) => {
      if (response) {
        console.log(response);
        this.productDetails = response;
         let obj = JSON.parse(JSON.stringify(response));
         let list1 = obj.categoryList;
      }  

    });
  }
}
