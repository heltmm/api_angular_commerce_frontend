import { Component, OnInit } from '@angular/core';
import { Angular2TokenService} from 'angular2-token'
import { AuthService }     from '../services/auth.service';
import { OrderItem } from '../order_item.model'
import { Observable }     from 'rxjs/Observable';
import { Response, Http, Headers, RequestOptions } from '@angular/http';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass']
})
export class CartComponent implements OnInit {
  data: Observable<any[]>;

  constructor( public authservice: AuthService, private tokenService: Angular2TokenService) {
    this.tokenService.init({
      apiBase: 'http://localhost:3000'
    })

  }

  getData() {
    return this.tokenService.get('/cart')
    .map((res: Response) => res.json())
  }

  getCart() {
    this.getData().subscribe(data => {
      console.log(data);
      this.data = data
    })
  }

  removeProductFromCart(product_id){
    this.tokenService.delete(`/order_items/${product_id}`)
    .subscribe(res => {
      console.log(res.json())
      this.getCart();
    })
  }

  ngOnInit() {
    this.getCart();
  }

}
