import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { ProductComponent } from './components/product/product.component';

const routes: Routes = [
  { 
    path: '',
    redirectTo: 'dashboard', 
    pathMatch: 'full' 
  },
  { 
    path: 'login',
    component: LoginComponent
  },
  {
     path: 'dashboard', 
     component: DashboardComponent, 
     canActivate: [AuthGuard]
  },
  {
    path: 'products/:categoryId',
    component: ProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
