// cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/cart.model';

const CART_KEY = 'cart_items';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>(this.loadCartFromStorage());
  cart$ = this.cartItems.asObservable();

  constructor() {}

  private loadCartFromStorage(): CartItem[] {
    const data = localStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : [];
  }

  private saveCartToStorage(items: CartItem[]) {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }

  addToCart(item: CartItem) {
    const items = this.cartItems.value;
    const index = items.findIndex(p => p.productId === item.productId);

    if (index > -1) {
      items[index].qty += item.qty; // augmente la quantité
    } else {
      items.push(item);
    }

    this.cartItems.next([...items]);
    this.saveCartToStorage(items);
  }

  getCart(): CartItem[] {
    return this.cartItems.value;
  }

  removeFromCart(index: number) {
    const items = this.cartItems.value;
    items.splice(index, 1);
    this.cartItems.next([...items]);
    this.saveCartToStorage(items);
  }

  clearCart() {
    this.cartItems.next([]);
    this.saveCartToStorage([]);
  }
}
