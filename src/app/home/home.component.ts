import { Component, OnInit } from '@angular/core';
import { Response, Http } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { Product } from '../product.model'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})

export class HomeComponent implements OnInit {
  private apiUrl = 'http://localhost:3000/products';
  data: Product[];

  constructor(private http: Http) {
    this.getProducts();
    this.getData();
  }

  getData() {
    return this.http.get(this.apiUrl)
    .map((res: Response) => res.json())
  }

  getProducts() {
    this.getData().subscribe(data => {
      console.log(data);
      this.data = data
    })
  }

  ngOnInit() {
  }

}
