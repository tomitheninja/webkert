import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FSRecipe } from '../model/recipe';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(private firestore: Firestore) {}

  async addRecipe(recipe: Partial<FSRecipe>): Promise<string> {
    const recipeCollection = collection(this.firestore, 'recipes');
    const docRef = await addDoc(recipeCollection, recipe);
    recipe.id = docRef.id;
    await updateDoc(docRef, recipe);

    return docRef.id;
  }

  updateRecipe(recipe: FSRecipe): Promise<void> {
    if (!recipe.id) {
      throw new Error('Recipe must have an id');
    }
    const recipeDoc = doc(this.firestore, 'recipes', recipe.id);
    const data = recipe.json();
    return updateDoc(recipeDoc, data as any);
  }

  deleteRecipe(recipeId: string): Promise<void> {
    const recipeDoc = doc(this.firestore, 'recipes', recipeId);
    return deleteDoc(recipeDoc);
  }

  getRecipe(recipeId: string): Observable<FSRecipe | null> {
    const recipeDoc = doc(this.firestore, 'recipes', recipeId);
    return new Observable<FSRecipe | null>((observer) => {
      getDoc(recipeDoc).then((doc) => {
        if (doc.exists()) {
          const recipeData = doc.data() as FSRecipe;
          observer.next(new FSRecipe({ ...recipeData, id: doc.id }));
        } else {
          observer.next(null);
        }
      });
    });
  }
}
