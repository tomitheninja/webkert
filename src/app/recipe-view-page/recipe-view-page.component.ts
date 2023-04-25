import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FSRecipe } from '../model/recipe';
import { RecipeService } from '../services/recipe.service';
import { AuthService } from '../services/auth.service';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-recipe-view-page',
  templateUrl: './recipe-view-page.component.html',
  styleUrls: ['./recipe-view-page.component.scss'],
})
export class RecipeViewPageComponent implements OnInit {
  recipe$!: Observable<FSRecipe>;
  user$!: Observable<User | null> | null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  private getId() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) throw new Error('No recipe id provided');
    return id;
  }

  ngOnInit(): void {
    this.user$ = this.authService.getStream();

    this.recipe$ = this.recipeService.getRecipe(
      this.getId()
    ) as Observable<FSRecipe>;
  }

  async deleteRecipe() {
    await this.recipeService.deleteRecipe(this.getId());
    this.router.navigate(['/']);
  }
}
