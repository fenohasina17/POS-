import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }
  getAllProducts(pointOfSaleId: string, token: string): Observable<any[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    const params = new HttpParams().set('point_of_sale_id', pointOfSaleId);

    return this.http.get<any[]>(this.apiUrl + '/product_of_category_with_price', { headers, params });
  }
  getProductsByCategory(categoryId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any>(`${this.apiUrl}/categories/${categoryId}`, { headers });
  }

  getProductsWithPricingByCategory(categoryId: number, pointOfSaleId: number): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  
    const categoryUrl = `${this.apiUrl}/categories/${categoryId}`;
    const pricingUrl = `${this.apiUrl}/pricings`;
  
    return forkJoin({
      category: this.http.get<any>(categoryUrl, { headers }),
      pricing: this.http.get<any[]>(pricingUrl, { headers })
    }).pipe(
      map(({ category, pricing }) => {
        const products = category.products || [];
  
        return products.map((product: any) => {
          const matchedPricing = pricing.find(p =>
            p.product_id === product.id && p.point_of_sale_id === pointOfSaleId
          );
          product.pricing = matchedPricing ? [ { price: matchedPricing.price } ] : [];
          return product;
        });
      })
    );
  }

   
}

