import { Component } from '@angular/core';
import { FSRecipe } from '../model/recipe';
import { Observable } from 'rxjs';
import {
  CollectionReference,
  DocumentData,
  Firestore,
  collection,
  collectionData,
} from '@angular/fire/firestore';

@Component({
  selector: 'app-recipe-list-page',
  templateUrl: './recipe-list-page.component.html',
  styleUrls: ['./recipe-list-page.component.scss'],
})
export class RecipeListPageComponent {
  recipes$!: Observable<FSRecipe[]>;
  private recipeCollection!: CollectionReference<DocumentData>;

  constructor(private firestore: Firestore) {}

  ngOnInit() {
    // Get a reference to the user-profile collection
    this.recipeCollection = collection(this.firestore, 'recipes');
    this.recipes$ = collectionData(this.recipeCollection) as Observable<
      FSRecipe[]
    >;
  }
}
