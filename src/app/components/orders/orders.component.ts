import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../core/services/orders.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {

  private readonly _ActivatedRoute = inject(ActivatedRoute)
  private readonly _OrdersService = inject(OrdersService)

  orders: FormGroup = new FormGroup({
    details: new FormControl(null),
    phone: new FormControl(null),
    city: new FormControl(null)
  })

  cartId: string | null = "";

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(p)=>{
        this.cartId = p.get('id');
        console.log(this.cartId);
      },
      // error:(err)=>{
      //   console.log(err);
      // }
    })

  }

  orderSubmit():void{
    console.log(this.orders.value);
    this._OrdersService.checkOut(this.cartId, this.orders.value).subscribe({
      next:(res)=>{
        console.log(res);
        if (res.status === 'success') {
          window.open(res.session.url, '_self')
        }
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

}
