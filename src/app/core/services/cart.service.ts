import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private readonly _HttpClient : HttpClient) { }

  cartNumber : BehaviorSubject<number> = new BehaviorSubject(0);

  myHeaders:any = {Token : localStorage.getItem('userToken')};

  addProductToCart(id:string):Observable<any>{
    return this._HttpClient.post(`${environment.baseURL}/api/v1/cart`,
      {
        "productId":id
      }
    )
  }

  getProductsCart():Observable<any>{
    return this._HttpClient.get(`${environment.baseURL}/api/v1/cart`,
    )
  }

  deleteSpecificCartItem(id:string):Observable<any>{
    return this._HttpClient.delete(`${environment.baseURL}/api/v1/cart/${id}`,
    )
  }

  updateProductQuantity(id:string, newCount:number):Observable<any>{
    return this._HttpClient.put(`${environment.baseURL}/api/v1/cart/${id}`,
      {
        "count": newCount
      }
    )
  }

  clearCart():Observable<any>{
    return this._HttpClient.delete(`${environment.baseURL}/api/v1/cart/`,
    )
  }

}
