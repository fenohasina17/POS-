import { Component, OnInit, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product',
  standalone: false,
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnChanges, OnInit {
  @Input() category: any;
  @Output() back = new EventEmitter<void>();

  keyword = '';
  products: any[] = [];
  filtered: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['category'] && this.category?.id) {
      this.loadProductsByCategory(this.category.id);
    }
  }

  goBack() {
    this.back.emit();
  }

  loadProductsByCategory(categoryId: string): void {
    this.productService.getProductsByCategory(categoryId).subscribe({
      next: category => {
        this.products = category.products || [];
        this.filtered = [...this.products];
        console.log('Produits chargés depuis l’API :', this.products);
      },
      error: err => {
        console.error('Erreur lors du chargement des produits', err);
      }
    });
  }
  loadProducts() {
    const user = localStorage.getItem('user');
    const pointOfSaleId = JSON.parse(user!).point_of_sale_id;
    this.productService.getProductsWithPricingByCategory(pointOfSaleId, pointOfSaleId).subscribe({
      next: (products) => {
        this.products = products;
        this.filtered = [...products];
        console.log(this.products);
        
      },
      error: err => console.error('Erreur lors du chargement', err)
    });
  }

  filterProducts(): void {
    const lower = this.keyword.toLowerCase();
    this.filtered = this.products.filter(p =>
      p.name.toLowerCase().includes(lower)
    );
  }

    priceFormat(price: number): string {
    return price.toFixed(0) + ' Ar';
  }   
  addToCart(product: any): void {
    console.log('Produit ajouté au panier :', product);
    // à compléter avec un service de panier si nécessaire
  }
}