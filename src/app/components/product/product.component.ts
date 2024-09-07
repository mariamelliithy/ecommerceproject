import { Component, inject, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { FormsModule, NgModel } from '@angular/forms';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TermTextPipe } from '../../core/pipes/term-text.pipe';
import { ProductsService } from '../../core/services/products.service';
import { CartService } from '../../core/services/cart.service';
import { Iproduct } from '../../core/interfaces/iproduct';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [FormsModule,TermTextPipe,SearchPipe,CurrencyPipe,RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit{
  private readonly _ProductService=inject(ProductsService);
  private readonly _ToastrService=inject(ToastrService);
  private readonly _CartService=inject(CartService);
  private readonly _WishlistService=inject(WishlistService)

  productList: Iproduct[] = [];
  wishlist: Set<string> = new Set<string>();
  allProductSub!: Subscription;
  wishlistSub!: Subscription;
  text: string = '';

  ngOnInit(): void {
    // Fetch products
    this.allProductSub = this._ProductService.getAllProducts().subscribe({
          next: (res) => {
            console.log(res);
            this.productList = res.data;
          }
    })


    this.allProductSub = this._ProductService.getAllProducts().subscribe({
      next: (res) => {
        console.log(res);
        this.productList = res.data;
      }
    });

    // Fetch wishlist items

    this.wishlistSub = this._WishlistService.getProductsWishlist().subscribe({
      next: (res) => {
        console.log(res);
        this.wishlist = new Set(res.data.map((item: Iproduct) => item.id));
      }
    });
  }

  ngOnDestroy(): void {
    this.allProductSub?.unsubscribe();
    this.wishlistSub?.unsubscribe();
  }

  addCart(id: string): void {
    this._CartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this._ToastrService.success(res.message, 'FreshCart');
        this._CartService.cartNumber.next(res.numOfCartItems)
      }
    });
  }

  toggleWishlist(event: Event, product: Iproduct): void {
    event.stopPropagation(); // Prevent navigation

    if (this.wishlist.has(product.id)) {
      this._WishlistService.deleteSpecificWishlistItem(product.id).subscribe({
        next: () => {
          this.wishlist.delete(product.id);
          this._ToastrService.success('Removed from wishlist');
        }
      });
    } else {
      this._WishlistService.addProductToWishlist(product.id).subscribe({
        next: () => {
          this.wishlist.add(product.id);
          this._ToastrService.success('Added to wishlist');
        }
      });
    }
  }

}
