import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product',
  standalone: false,
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  keyword = '';
  allProducts: Product[] = [];
  filtered: Product[] = [];

  constructor(private productService: ProductService) {}
  
  ngOnInit(): void {
    this.productService.getAllCategories().subscribe((categories) => {
      console.log('Categories:', categories);
      this.allProducts = categories.flatMap((cat) => cat.products);
      this.filtered = [...this.allProducts];
    });
  }
  filterProducts(): void {
    const term = this.keyword.trim().toLowerCase();
    this.filtered = this.allProducts.filter(product =>
      product.name.toLowerCase().includes(term)
    );
  }

  priceFormat(price: number): string {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'MGA'
    }).format(price);
  }

  addToCart(product: Product): void {
    console.log('Ajouter au panier', product);
  }
}


