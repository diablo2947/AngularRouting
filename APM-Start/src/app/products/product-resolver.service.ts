import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ProductResolved } from './product';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root',
})
export class ProductResolver implements Resolve<ProductResolved> {
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ProductResolved> {
    const id = route.paramMap.get('id');
    if (isNaN(+id)) {
      const message = `Invalid product id: ${id}`;
      console.error(message);
      return of({ product: null, error: message });
    }
    return this.productService.getProduct(+id).pipe(
      map((x) => ({ product: x })),
      catchError((e) => {
        const message = `Retreival error: ${e}`;
        console.error(message);
        return of({ product: null, error: message });
      })
    );
  }

  /**
   *
   */
  constructor(private productService: ProductService) {}
}
