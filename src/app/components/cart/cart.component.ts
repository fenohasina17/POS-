import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart.model';
@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cart: CartItem[] = [];
  cash: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cart$.subscribe(items => {
      this.cart = items;
    });
  }

  getTotalPrice(): number {
    return this.cart.reduce((sum, item) => sum + item.qty * item.price, 0);
  }

  addQty(item: CartItem, amount: number) {
    item.qty += amount;
    if (item.qty <= 0) {
      this.removeItem(item);
    } else {
      this.cartService.addToCart(item);
    }
  }

  removeItem(item: CartItem) {
    const index = this.cart.findIndex(p => p.productId === item.productId);
    if (index !== -1) {
      this.cartService.removeFromCart(index);
    }
  }

  clear() {
    this.cartService.clearCart();
  }

  get change() {
    return this.cash - this.getTotalPrice();
  }

  updateCash(event: Event) {
    const input = event.target as HTMLInputElement;
    this.cash = parseFloat(input.value.replace(/[^0-9.]/g, '')) || 0;
  }

  submitable(): boolean {
    return this.cart.length > 0 && this.change >= 0;
  }

  submit() {
    // Logique d’envoi ou de validation de commande ici
    console.log('Commande soumise');
    this.clear();
    this.cash = 0;
  }
}
