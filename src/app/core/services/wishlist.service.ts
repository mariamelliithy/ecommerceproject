import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iproduct } from '../interfaces/iproduct';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private _HttpClient:HttpClient) { }

  baseUrl:string='https://ecommerce.routemisr.com';


  addProductToWishlist(id:string):Observable <any>
  {
    return this._HttpClient.post(`${this.baseUrl}/api/v1/wishlist`,
    {
      "productId":id
    }
  )
  }

  getProductsWishlist():Observable<any>
  {
    return this._HttpClient.get<Iproduct[]>(`${this.baseUrl}/api/v1/wishlist`)
  }

  deleteSpecificWishlistItem(id:string):Observable<any>
  {
    return this._HttpClient.delete(`${this.baseUrl}/api/v1/wishlist/${id}`)
  }
}
