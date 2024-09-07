import { HttpInterceptorFn } from '@angular/common/http';
import { Token } from '@angular/compiler';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {

  if (localStorage.getItem('userToken') !== null ) {

    if (req.url.includes('cart') || req.url.includes('wishlist') || req.url.includes('orders') ) {

      req = req.clone({
        setHeaders: {Token: localStorage.getItem('userToken') !}
      })

    }

  }

  return next(req);
};
