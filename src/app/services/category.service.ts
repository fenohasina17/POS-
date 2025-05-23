import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://127.0.0.1:8000/api/product_of_category_with_price';

  constructor(private http: HttpClient) {}
  getCategories(pointOfSaleId: string, token: string): Observable<any[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    const params = new HttpParams().set('point_of_sale_id', pointOfSaleId);

    return this.http.get<any[]>(this.apiUrl, { headers, params });
  }
}
