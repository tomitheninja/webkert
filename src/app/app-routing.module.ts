import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { AuthGuard } from './auth/auth.guard';
import { RecipeListPageComponent } from './recipe-list-page/recipe-list-page.component';
import { RecipeViewPageComponent } from './recipe-view-page/recipe-view-page.component';
import { RecipeEditPageComponent } from './recipe-edit-page/recipe-edit-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'recipes',
    component: RecipeListPageComponent,
  },
  {
    path: 'recipes/:id',
    component: RecipeViewPageComponent,
  },
  {
    path: 'recipes/:id/edit',
    component: RecipeEditPageComponent,
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    component: ProfilePageComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
