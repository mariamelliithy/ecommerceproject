import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private _HttpClient:HttpClient) { }

  myHeaders:any = {Token:localStorage.getItem('userToken')}

  checkOut(idCart:string | null, shippingDetails:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseURL}/api/v1/orders/checkout-session/${idCart}?url=${window.location.origin}`,
      {
          "shippingAddress":shippingDetails
      }
    )
  }
}
