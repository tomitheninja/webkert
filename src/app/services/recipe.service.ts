import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  query,
  orderBy,
  collectionData,
  CollectionReference,
  where,
  writeBatch,
  getDocs,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FSRecipe } from '../model/recipe';
import {
  Storage,
  getDownloadURL,
  ref,
  uploadBytes,
} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(private fbStore: Firestore, private fbStorage: Storage) {}

  async createRecipe(recipe: Partial<FSRecipe>): Promise<string> {
    const recipeCollection = collection(this.fbStore, 'recipes');
    const docRef = await addDoc(recipeCollection, recipe);
    recipe.id = docRef.id;
    await updateDoc(docRef, recipe);

    return docRef.id;
  }

  updateRecipe(recipe: FSRecipe): Promise<void> {
    if (!recipe.id) {
      throw new Error('Recipe must have an id');
    }
    const recipeDoc = doc(this.fbStore, 'recipes', recipe.id);
    return updateDoc(recipeDoc, { ...recipe } as any);
  }

  deleteRecipe(recipeId: string): Promise<void> {
    const recipeDoc = doc(this.fbStore, 'recipes', recipeId);
    return deleteDoc(recipeDoc);
  }

  getRecipe(recipeId: string): Observable<FSRecipe | null> {
    const recipeDoc = doc(this.fbStore, 'recipes', recipeId);
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

  listRecipes(): Observable<FSRecipe[]> {
    const recipesRef = collection(
      this.fbStore,
      'recipes'
    ) as CollectionReference<FSRecipe>;
    return collectionData(query(recipesRef, orderBy('title', 'asc')));
  }

  async uploadImage(event: Event, recipeId: string): Promise<string | null> {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];
    console.log(file);

    if (!file) return null;
    // const recipeId = this.route.snapshot.paramMap.get('id');
    const filePath = `recipes/${Date.now()}${file.name}`;
    const fileRef = ref(this.fbStorage, filePath);
    const uploadTask = await uploadBytes(fileRef, file);

    // get http url
    const downloadURL = await getDownloadURL(uploadTask.ref);
    console.log(downloadURL);

    if (recipeId && recipeId !== 'new') {
      const recipeRef = doc(this.fbStore, 'recipes', recipeId);
      await updateDoc(recipeRef, { imageUrl: downloadURL });
    }

    return downloadURL;
  }

  async updateAuthorName(userId: string, newUsername: string): Promise<void> {
    // Get all recipes authored by the user
    const recipesRef = collection(this.fbStore, 'recipes');
    const queryRef = query(recipesRef, where('authorId', '==', userId));
    const recipeDocs = await getDocs(queryRef);

    // Update the authorName field in each recipe document
    const batch = writeBatch(this.fbStore);
    recipeDocs.forEach((doc) => {
      batch.update(doc.ref, { authorName: newUsername });
    });
    await batch.commit();
  }
}
