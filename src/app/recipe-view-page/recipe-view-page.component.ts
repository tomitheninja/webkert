import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import {
  DocumentData,
  DocumentSnapshot,
  Firestore,
  doc,
  getDoc,
} from '@angular/fire/firestore';
import { FSRecipe } from '../model/recipe';

@Component({
  selector: 'app-recipe-view-page',
  templateUrl: './recipe-view-page.component.html',
  styleUrls: ['./recipe-view-page.component.scss'],
})
export class RecipeViewPageComponent implements OnInit {
  recipe$!: Observable<FSRecipe>;

  constructor(private route: ActivatedRoute, private firestore: Firestore) {}

  isAuthor(recipe: FSRecipe): boolean {
    return true;
  }

  ngOnInit(): void {
    const recipeId = this.route.snapshot.paramMap.get('id');

    if (recipeId) {
      const recipeRef = doc(this.firestore, 'recipes', recipeId);
      this.recipe$ = new Observable<FSRecipe>((observer) => {
        getDoc(recipeRef).then((doc) => {
          if (doc.exists()) {
            const recipeData = doc.data() as FSRecipe;
            observer.next(recipeData);
          }
        });
      });
    }
  }
}
