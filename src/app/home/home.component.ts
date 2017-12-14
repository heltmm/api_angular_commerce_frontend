import { Component, OnInit } from '@angular/core';
import { Response, Http, Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { Product } from '../product.model'
import { AuthService }     from '../services/auth.service';
import { Angular2TokenService} from 'angular2-token'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})

export class HomeComponent implements OnInit {
  private userUrl = ''
  private apiUrl = 'http://localhost:3000/products';
  private addUrl = '/order_items';
  data: Product[];


  constructor(private http: Http, public authservice: AuthService, private tokenService: Angular2TokenService) {
    this.getProducts();
    this.getData();
    this.tokenService.init({
      apiBase: 'http://localhost:3000'
    })
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

  addProductsToCart(product_id) {
    let body = {quantity: 1, product_id: product_id}
    return this.tokenService.post(this.addUrl, body)
    .subscribe(res => console.log(res.json()));;

  }

  ngOnInit() {
  }

}
