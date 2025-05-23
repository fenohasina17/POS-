import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  standalone: false,
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories: any[] = [];

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  @Output() categorySelected = new EventEmitter<any>();


  loadCategories(): void {
    const user = localStorage.getItem('user');
    const pointOfSaleId = JSON.parse(user!).point_of_sale_id;
    const token = localStorage.getItem('token');

    if (!pointOfSaleId || !token) {
      console.error('point_of_sale_id ou token manquant.');
      return;
    }

    // Now we know pointOfSaleId and token are not null
    this.categoryService.getCategories(pointOfSaleId, token).subscribe({
      next: data => {
        this.categories = data;
      },
      error: err => {
        console.error('Erreur lors du chargement des catégories :', err);
      }
    });
  }
  selectCategory(cat: any) {
    this.categorySelected.emit(cat);
  }
}
