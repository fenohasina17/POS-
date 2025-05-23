import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  currentView: 'category' | 'product' = 'category';
  selectedCategory: any;

  showProducts(category: any) {
    this.selectedCategory = category;
    this.currentView = 'product';
  }

  showCategories() {
    this.currentView = 'category';
    this.selectedCategory = null;
  }
}
