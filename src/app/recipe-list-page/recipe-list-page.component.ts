import { Component } from '@angular/core';
import { FSRecipe } from '../model/recipe';
import { Observable } from 'rxjs';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe-list-page',
  templateUrl: './recipe-list-page.component.html',
  styleUrls: ['./recipe-list-page.component.scss'],
})
export class RecipeListPageComponent {
  public recipes$!: Observable<FSRecipe[]>;

  constructor(private RecipeService: RecipeService) {}

  ngOnInit() {
    // Get a reference to the user-profile collection
    this.recipes$ = this.RecipeService.listRecipes();
  }
}
